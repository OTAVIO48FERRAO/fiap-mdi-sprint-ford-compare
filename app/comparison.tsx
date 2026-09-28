// app/comparison.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useComparison } from '../context/ComparisonContext';
import { ComparisonTable } from '../components/ComparisonTable';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { MenuButton, SideMenu } from '../components/SideMenu';

export default function ComparisonScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { comparison, clearComparison } = useComparison();

  if (!comparison) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.eyebrow}>FORD INTELLIGENCE</Text>
          <Text style={styles.emptyTitle}>Nenhuma comparação disponível</Text>
          <Text style={styles.emptyText}>Volte ao painel e selecione um concorrente do catálogo local.</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.replace('/')}>
            <Text style={styles.primaryButtonText}>Voltar ao painel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleNewComparison = () => {
    clearComparison();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerControls}>
            <Pressable style={styles.cornerBackButton} onPress={handleNewComparison}>
              <Text style={styles.backButtonText}>‹</Text>
              <Text style={styles.backButtonLabel}>Painel</Text>
            </Pressable>

            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>FORD INTELLIGENCE · RESULTADO</Text>
            <Text style={styles.title}>Comparação técnica</Text>
            <Text style={styles.subtitle}>
              {comparison.ford.model} vs {comparison.competitor.model}
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryVehicle}>
            <Text style={styles.summaryLabel}>REFERÊNCIA</Text>
            <Text style={styles.summaryBrand}>{comparison.ford.brand}</Text>
            <Text style={styles.summaryModel}>{comparison.ford.model}</Text>
            <Text style={styles.summaryVersion}>{comparison.ford.version}</Text>
          </View>
          <View style={styles.vsBadge}><Text style={styles.vsText}>VS</Text></View>
          <View style={styles.summaryVehicle}>
            <Text style={styles.summaryLabel}>CONCORRENTE</Text>
            <Text style={styles.summaryBrand}>{comparison.competitor.brand}</Text>
            <Text style={styles.summaryModel}>{comparison.competitor.model}</Text>
            <Text style={styles.summaryVersion}>{comparison.competitor.version}</Text>
          </View>
        </View>

        <ComparisonTable
          ford={comparison.ford}
          competitor={comparison.competitor}
          timestamp={comparison.timestamp}
        />

        <View style={styles.noteCard}>
          <View style={styles.noteIcon}><Text style={styles.noteIconText}>i</Text></View>
          <View style={styles.noteBody}>
            <Text style={styles.noteTitle}>Sobre os dados</Text>
            <Text style={styles.noteText}>
              Os dados técnicos são snapshots locais verificados em fontes públicas das fabricantes. A tabela mostra somente atributos que possuem informação nos dois veículos; campos sem fonte oficial para a Raptor não são exibidos. A aplicação continua sem chamadas externas em tempo de execução.
            </Text>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleNewComparison}>
          <Text style={styles.primaryButtonText}>Nova comparação</Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>

        <Text style={styles.footer}>MVP acadêmico · telemetria e catálogo simulados</Text>
      </ScrollView>

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 40 },
  header: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 26,
  },
  headerControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cornerBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: '#35506A',
  },
  headerContent: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 6,
  },
  backButtonText: { color: COLORS.white, fontSize: 25, fontWeight: '300', marginRight: 5 },
  backButtonLabel: { color: COLORS.white, fontSize: 11, fontWeight: '800' },
  eyebrow: { color: '#8EB2D3', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: COLORS.white, fontSize: 29, fontWeight: '800', marginTop: 4 },
  subtitle: { color: '#B8C8D8', fontSize: 12, marginTop: 5 },
  summaryCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOW.card,
  },
  summaryVehicle: { flex: 1 },
  summaryLabel: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  summaryBrand: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700', marginTop: 6, textTransform: 'uppercase' },
  summaryModel: { color: COLORS.text, fontSize: 17, fontWeight: '800', marginTop: 2 },
  summaryVersion: { color: COLORS.textSecondary, fontSize: 10, marginTop: 3 },
  vsBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.blueSoft, alignItems: 'center', justifyContent: 'center' },
  vsText: { color: COLORS.blue, fontSize: 10, fontWeight: '900' },
  noteCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    gap: 12,
  },
  noteIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.blueSoft, alignItems: 'center', justifyContent: 'center' },
  noteIconText: { color: COLORS.blue, fontSize: 13, fontWeight: '800' },
  noteBody: { flex: 1 },
  noteTitle: { color: COLORS.text, fontSize: 12, fontWeight: '800' },
  noteText: { color: COLORS.textSecondary, fontSize: 10, lineHeight: 16, marginTop: 4 },
  primaryButton: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.blueDeep,
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9,
    ...SHADOW.card,
  },
  primaryButtonText: { color: COLORS.white, fontSize: 13, fontWeight: '800' },
  primaryButtonArrow: { color: COLORS.white, fontSize: 20, fontWeight: '300' },
  emptyContainer: { flex: 1, justifyContent: 'center', padding: 28, backgroundColor: COLORS.background },
  emptyTitle: { color: COLORS.text, fontSize: 24, fontWeight: '800', marginTop: 8 },
  emptyText: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 22 },
  footer: { color: COLORS.textMuted, fontSize: 9, textAlign: 'center', marginTop: 18 },
});
