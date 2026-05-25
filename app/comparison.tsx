// app/comparison.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useComparison } from '../context/ComparisonContext';
import { ComparisonTable } from '../components/ComparisonTable';

export default function ComparisonScreen() {
  const router = useRouter();
  const { comparison, clearComparison } = useComparison();

  if (!comparison) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhuma comparação disponível</Text>
          <Pressable
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.backButtonText}>VOLTAR</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleBackAndClear = () => {
    clearComparison();
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
        {/* Cabeçalho */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>RESULTADOS DA COMPARAÇÃO</Text>
          <Text style={styles.subtitle}>
            {comparison.ford.brand} {comparison.ford.model} vs{' '}
            {comparison.competitor.brand} {comparison.competitor.model}
          </Text>
        </View>

        {/* Tabela de Comparação */}
        <ComparisonTable
          ford={comparison.ford}
          competitor={comparison.competitor}
          timestamp={comparison.timestamp}
        />

        {/* Legenda/Informações */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>LEGENDA</Text>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#FFE5E5' }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.legendLabel}>Dados Não Disponíveis</Text>
              <Text style={styles.legendDesc}>
                Campo vazio no banco de dados da IA ou do fabricante
              </Text>
            </View>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#E5F3FF' }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.legendLabel}>Dados Disponíveis</Text>
              <Text style={styles.legendDesc}>
                Especificação validada e processada
              </Text>
            </View>
          </View>
        </View>

        {/* Notas Técnicas */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>📌 NOTAS TÉCNICAS</Text>
          <Text style={styles.notesText}>
            • A Ford Ranger Raptor 3.0 V6 é o veículo de referência para esta comparação.
          </Text>
          <Text style={styles.notesText}>
            • Os dados do competidor foram processados por um modelo de IA híbrido.
          </Text>
          <Text style={styles.notesText}>
            • Campos "Não disponível" indicam limitações no acesso aos dados.
          </Text>
          <Text style={styles.notesText}>
            • Recomenda-se validação manual para decisões críticas.
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsSection}>
          <Pressable
            style={styles.newComparisonButton}
            onPress={handleBackAndClear}
          >
            <Text style={styles.newComparisonButtonText}>NOVA COMPARAÇÃO</Text>
          </Pressable>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Ford Intelligence Tool - v1.0.0 MVP
          </Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 200,
    alignItems: 'center'
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1
  },
  headerSection: {
    backgroundColor: '#000000',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#007BFF'
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    letterSpacing: 0.5
  },
  legendSection: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: '#F9F3FF'
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#8B5CF6',
    letterSpacing: 1,
    marginBottom: 15
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6'
  },
  legendBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 12,
    marginTop: 2
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3
  },
  legendDesc: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
    marginTop: 2,
    lineHeight: 16
  },
  notesSection: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
    backgroundColor: '#E5F3FF'
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#007BFF',
    letterSpacing: 0.5,
    marginBottom: 12
  },
  notesText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 6,
    lineHeight: 18,
    letterSpacing: 0.3
  },
  actionsSection: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  newComparisonButton: {
    backgroundColor: '#8B5CF6',
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newComparisonButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#CCCCCC',
    marginBottom: 10
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    letterSpacing: 0.5
  }
});
