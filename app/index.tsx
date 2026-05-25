// app/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TelemetryCard } from '../components/TelemetryCard';
import { useComparison } from '../context/ComparisonContext';
import { FORD_RANGER_RAPTOR_SPECS, FORD_TELEMETRY } from '../mock/fordData';
import { simulateAIResponse, COMPETITOR_SPECS_CACHE } from '../mock/aiResponseData';
import { ComparisonResult } from '../types/index';

export default function HomeScreen() {
  const router = useRouter();
  const { setComparison, setIsLoading, setError, isLoading } = useComparison();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
    } catch (err) {
      console.error('Failed to sign out', err);
    }
    router.replace('/login');
  };

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [telemetry, setTelemetry] = useState(FORD_TELEMETRY);

  // Simula atualização de telemetria em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        timestamp: Date.now()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCompare = async () => {
    if (!brand.trim() || !model.trim()) {
      Alert.alert('Erro', 'Por favor, preencha Marca e Modelo');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simula atraso de chamada de API
      const competitorData = await simulateAIResponse(brand, model);

      const result: ComparisonResult = {
        ford: FORD_RANGER_RAPTOR_SPECS,
        competitor: competitorData,
        timestamp: Date.now()
      };

      setComparison(result);

      // Simula notificação
      console.log('✅ Comparação realizada com sucesso!');

      // Navega para a tela de comparação
      router.push('/comparison');
    } catch (err) {
      setError('Erro ao processar a comparação. Tente novamente.');
      Alert.alert('Erro', 'Falha ao processar a comparação');
    } finally {
      setIsLoading(false);
    }
  };

  const availableCompetitors = Object.keys(COMPETITOR_SPECS_CACHE).map(key => {
    const [b, m] = key.split('-');
    return { brand: b.charAt(0).toUpperCase() + b.slice(1), model: m.charAt(0).toUpperCase() + m.slice(1) };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
        {/* Cabeçalho */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View style={styles.brandWrap}>
              <Image source={require('../assets/favicon.png')} style={styles.logo} />
              <Text style={styles.mainTitle}>FORD RANGER RAPTOR</Text>
            </View>
            <Pressable style={styles.signOutButton} onPress={handleSignOut}>
              <Text style={styles.signOutText}>SAIR</Text>
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Competitor Intelligence & Telemetria</Text>
        </View>

        {/* Cartão de Telemetria */}
        <TelemetryCard data={telemetry} isLive={true} />

        {/* Seção de Busca */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>BUSCAR COMPETIDOR</Text>

          {/* Campo Marca */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>MARCA</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Toyota"
              placeholderTextColor="#999999"
              value={brand}
              onChangeText={setBrand}
              editable={!isLoading}
            />
          </View>

          {/* Campo Modelo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>MODELO</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Hilux"
              placeholderTextColor="#999999"
              value={model}
              onChangeText={setModel}
              editable={!isLoading}
            />
          </View>

          {/* Campo Versão (opcional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>VERSÃO (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2.8 Diesel"
              placeholderTextColor="#999999"
              value={version}
              onChangeText={setVersion}
              editable={!isLoading}
            />
          </View>

          {/* Botões de seleção rápida */}
          <View style={styles.quickSelectContainer}>
            <Text style={styles.quickSelectLabel}>SUGESTÕES DISPONÍVEIS:</Text>
            <View style={styles.buttonGrid}>
              {availableCompetitors.map((comp, idx) => (
                <Pressable
                  key={idx}
                  style={[
                    styles.quickButton,
                    brand.toLowerCase() === comp.brand.toLowerCase() &&
                    model.toLowerCase() === comp.model.toLowerCase() &&
                      styles.quickButtonActive
                  ]}
                  onPress={() => {
                    setBrand(comp.brand);
                    setModel(comp.model);
                  }}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.quickButtonText,
                      brand.toLowerCase() === comp.brand.toLowerCase() &&
                      model.toLowerCase() === comp.model.toLowerCase() &&
                        styles.quickButtonActiveText
                    ]}
                  >
                    {comp.brand} {comp.model}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Botão Comparar */}
          <Pressable
            style={[styles.compareButton, isLoading && styles.compareButtonDisabled]}
            onPress={handleCompare}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>PROCESSANDO IA...</Text>
              </View>
            ) : (
              <Text style={styles.compareButtonText}>COMPARAR</Text>
            )}
          </Pressable>
        </View>

        {/* Seção de Informações */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ SOBRE ESTA FERRAMENTA</Text>
          <Text style={styles.infoText}>
            Esta ferramenta utiliza inteligência artificial híbrida para comparar especificações técnicas da Ford Ranger Raptor 3.0 V6 contra competidores selecionados.
          </Text>
          <Text style={styles.infoText}>
            Dados marcados como "Não disponível" indicam informações não processadas pela IA ou não disponibilizadas pelo fabricante.
          </Text>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.0.0 - MVP</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  headerSection: {
    backgroundColor: '#000000',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#007BFF'
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brandWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    letterSpacing: 1
  },
  searchSection: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#000000'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1.5,
    marginBottom: 20
  },
  inputGroup: {
    marginBottom: 18
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.8,
    marginBottom: 8
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#F9F9F9'
  },
  quickSelectContainer: {
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: '#F9F3FF'
  },
  quickSelectLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B5CF6',
    letterSpacing: 0.5,
    marginBottom: 12
  },
  buttonGrid: {
    flexDirection: 'column',
    gap: 8
  },
  quickButton: {
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  quickButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6'
  },
  quickButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5
  },
  quickButtonActiveText: {
    color: '#FFFFFF'
  },
  compareButton: {
    backgroundColor: '#007BFF',
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  compareButtonDisabled: {
    opacity: 0.7
  },
  compareButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginTop: 12
  },
  infoSection: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: '#F9F3FF'
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#8B5CF6',
    letterSpacing: 0.5,
    marginBottom: 10
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    lineHeight: 18,
    marginBottom: 8
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#CCCCCC'
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    letterSpacing: 0.5
  }
  ,
  signOutButton: {
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  signOutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000'
  }
});
