// app/details.tsx
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FORD_RANGER_RAPTOR_SPECS } from '../mock/fordData';
import { formatSpecValue } from '../utils/dataFormatter';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { MenuButton, SideMenu } from '../components/SideMenu';

const SPEC_GROUPS = [
  {
    title: 'Motor',
    items: [
      'Motor (Descrição)',
      'Cilindrada (cm³)',
      'Número de Cilindros',
      'Configuração do Motor',
      'Tipo de Combustível',
      'Potência Máxima (cv)',
      'Torque Máximo (Nm)',
    ],
  },
  {
    title: 'Transmissão e tração',
    items: [
      'Transmissão',
      'Número de Marchas',
      'Tração',
      'Diferencial Dianteiro',
      'Diferencial Traseiro',
    ],
  },
  {
    title: 'Dimensões e peso',
    items: [
      'Comprimento (mm)',
      'Largura com Espelhos (mm)',
      'Altura (mm)',
      'Distância entre Eixos (mm)',
      'Altura Livre do Solo (mm)',
      'Peso em Ordem de Marcha (kg)',
    ],
  },
  {
    title: 'Capacidade',
    items: [
      'Capacidade de Carga (kg)',
      'Capacidade do Tanque (L)',
    ],
  },
  {
    title: 'Off-road',
    items: [
      'Ângulo de Ataque (°)',
      'Ângulo de Saída (°)',
      'Capacidade de Imersão (mm)',
      'Modos de Condução',
    ],
  },
  {
    title: 'Suspensão',
    items: [
      'Suspensão Dianteira',
      'Suspensão Traseira',
    ],
  },
  {
    title: 'Freios, rodas e segurança',
    items: [
      'Freios',
      'Rodas',
      'Pneus',
      'Airbags',
      'ACC',
    ],
  },
  {
    title: 'Tecnologia',
    items: [
      'Central Multimídia',
      'Painel de Instrumentos',
      'Câmera 360°',
    ],
  },
];

const getSpec = (label: string): string => {
  const item = FORD_RANGER_RAPTOR_SPECS.specs.find((spec) => spec.atributo === label);
  return formatSpecValue(item?.valor);
};

export default function DetailsScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitles}>
              <Text style={styles.kicker}>VEÍCULO</Text>
              <Text style={styles.title}>Ranger Raptor</Text>
              <Text style={styles.subtitle}>3.0 V6 Bi-Turbo · 4WD · 2026</Text>
            </View>
            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroEyebrow}>FORD RANGER RAPTOR</Text>
              <Text style={styles.heroTitle}>Ficha técnica</Text>
              <Text style={styles.heroText}>
                Visão consolidada das principais especificações técnicas disponíveis no catálogo local.
              </Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>2026</Text>
            </View>
          </View>

          <View style={styles.heroMetrics}>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricValue}>{getSpec('Potência Máxima (cv)')}</Text>
              <Text style={styles.heroMetricLabel}>POTÊNCIA</Text>
            </View>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricValue}>{getSpec('Torque Máximo (Nm)')}</Text>
              <Text style={styles.heroMetricLabel}>TORQUE</Text>
            </View>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricValue}>{getSpec('Distância entre Eixos (mm)')}</Text>
              <Text style={styles.heroMetricLabel}>ENTRE-EIXOS</Text>
            </View>
          </View>
        </View>

        {SPEC_GROUPS.map((group) => {
          const rows = group.items
            .map((label) => ({ label, value: getSpec(label) }))
            .filter((item) => item.value);

          if (!rows.length) return null;

          return (
            <View key={group.title} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
                <Text style={styles.sectionCount}>{rows.length} itens</Text>
              </View>

              {rows.map((row, index) => (
                <View key={row.label} style={[styles.specRow, index === rows.length - 1 && styles.specRowLast]}>
                  <Text style={styles.specLabel}>{row.label}</Text>
                  <Text style={styles.specValue}>{row.value}</Text>
                </View>
              ))}
            </View>
          );
        })}

        <View style={styles.sourceCard}>
          <Text style={styles.sourceEyebrow}>FONTE DO CATÁLOGO</Text>
          <Text style={styles.sourceTitle}>{FORD_RANGER_RAPTOR_SPECS.source}</Text>
          <Text style={styles.sourceText}>Última verificação registrada: {FORD_RANGER_RAPTOR_SPECS.lastVerified}</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.replace('/')}>
          <Text style={styles.primaryButtonText}>Voltar ao dashboard</Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
      </ScrollView>

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 40 },
  header: { backgroundColor: COLORS.black, paddingHorizontal: SPACING.lg, paddingTop: 18, paddingBottom: 24 },
  headerTop: { maxWidth: 1180, width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitles: { flex: 1 },
  kicker: { color: '#91B2CC', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: COLORS.white, fontSize: 28, fontWeight: '800', marginTop: 4 },
  subtitle: { color: '#C5D2DE', fontSize: 11, marginTop: 4 },
  heroCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, backgroundColor: COLORS.navy, borderRadius: 18, padding: SPACING.xl, ...SHADOW.card },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 },
  heroEyebrow: { color: COLORS.blueAlt, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: COLORS.white, fontSize: 25, fontWeight: '800', marginTop: 4 },
  heroText: { color: '#C8D6E2', fontSize: 11, lineHeight: 17, marginTop: 6, maxWidth: 650 },
  heroBadge: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: '#35506A', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 7 },
  heroBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  heroMetrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: SPACING.xl },
  heroMetric: { flex: 1, minWidth: 115, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, borderWidth: 1, borderColor: '#27435B', padding: 12 },
  heroMetricValue: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  heroMetricLabel: { color: '#9FB5C8', fontSize: 8, fontWeight: '800', letterSpacing: 0.7, marginTop: 4 },
  sectionCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.surface, borderRadius: 15, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', ...SHADOW.card },
  sectionHeader: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  sectionCount: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800' },
  specRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: SPACING.lg, paddingVertical: 11, borderTopWidth: 1, borderTopColor: COLORS.border },
  specRowLast: { borderBottomWidth: 0 },
  specLabel: { width: '38%', color: COLORS.textSecondary, fontSize: 9, fontWeight: '700', lineHeight: 14 },
  specValue: { flex: 1, color: COLORS.text, fontSize: 11, fontWeight: '700', lineHeight: 16, textAlign: 'right' },
  sourceCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.surfaceSoft, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.lg },
  sourceEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  sourceTitle: { color: COLORS.text, fontSize: 11, fontWeight: '800', marginTop: 4 },
  sourceText: { color: COLORS.textMuted, fontSize: 9, marginTop: 5 },
  primaryButton: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, minHeight: 50, borderRadius: 10, backgroundColor: COLORS.blueDeep, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, ...SHADOW.card },
  primaryButtonText: { color: COLORS.white, fontSize: 13, fontWeight: '800' },
  primaryButtonArrow: { color: COLORS.white, fontSize: 20, fontWeight: '300' },
});
