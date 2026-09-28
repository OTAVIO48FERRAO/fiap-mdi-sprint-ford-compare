// context/ComparisonContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ComparisonResult, ComparisonContextType } from '../types/index';

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetComparison = async (newComparison: ComparisonResult) => {
    setComparison(newComparison);
    try {
      await AsyncStorage.setItem(
        'lastComparison',
        JSON.stringify(newComparison)
      );
    } catch (err) {
      console.error('Failed to save comparison to AsyncStorage:', err);
    }
  };

  const clearComparison = () => {
    setComparison(null);
    setError(null);
  };

  // Carrega a última comparação ao montar o contexto (opcional)
  React.useEffect(() => {
    const loadLastComparison = async () => {
      try {
        const stored = await AsyncStorage.getItem('lastComparison');
        if (stored) {
          setComparison(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load last comparison:', err);
      }
    };

    loadLastComparison();
  }, []);

  return (
    <ComparisonContext.Provider
      value={{
        comparison,
        setComparison: handleSetComparison,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
