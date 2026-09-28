// app/report.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FORD_TELEMETRY, FORD_RANGER_RAPTOR_SPECS, generateLiveTelemetryUpdate, TELEMETRY_UPDATE_INTERVAL } from '../mock/fordData';
import { TelemetryData } from '../types/index';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { MenuButton, SideMenu } from '../components/SideMenu';

const parseNumber = (value?: string): number => {
  const parsed = Number.parseFloat((value ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getSpec = (label: string): string => {
  const item = FORD_RANGER_RAPTOR_SPECS.specs.find((spec) => spec.atributo === label);
  return item?.valor == null ? '' : String(item.valor);
};

const MetricTile = ({ label, value, helper, featured = false }: { label: string; value: string; helper: string; featured?: boolean }) => (
  <View style={[styles.metricTile, featured && styles.metricTileFeatured]}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={[styles.metricValue, featured && styles.metricValueFeatured]}>{value}</Text>
    <Text style={styles.metricHelper}>{helper}</Text>
  </View>
);

const statusForTemperature = (temp: number): string => {
  if (temp >= 105) return 'ATENÇÃO';
  if (temp >= 98) return 'ELEVADA';
  return 'NORMAL';
};

export default function ReportScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>(FORD_TELEMETRY);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((previous) => generateLiveTelemetryUpdate(previous));
    }, TELEMETRY_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const analysis = useMemo(() => {
    const rpm = parseNumber(telemetry.rpm);
    const load = parseNumber(telemetry.engineLoad);
    const turbo = parseNumber(telemetry.turboBoostPressure);
    const engineTemp = parseNumber(telemetry.engineTemperature);
    const oilTemp = parseNumber(telemetry.oilTemperature);

    return {
      rpm,
      load,
      turbo,
      engineTemp,
      oilTemp,
      tempStatus: statusForTemperature(oilTemp),
      demandStatus: load >= 80 ? 'ALTA SOLICITAÇÃO' : load >= 45 ? 'MODERADA' : 'BAIXA',
      boostStatus: turbo >= 1.2 ? 'BOOST ALTO' : turbo >= 0.5 ? 'BOOST ATIVO' : 'BAIXO BOOST',
    };
  }, [telemetry]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitles}>
              <Text style={styles.kicker}>VEHICLE INTELLIGENCE</Text>
              <Text style={styles.title}>Relatório técnico</Text>
              <Text style={styles.subtitle}>Ranger Raptor · resumo do sistema</Text>
            </View>
            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>
        </View>

        <View style={styles.reportIntro}>
          <View>
            <Text style={styles.reportEyebrow}>REPORT · LIVE SNAPSHOT</Text>
            <Text style={styles.reportTitle}>Resumo executivo</Text>
            <Text style={styles.reportText}>
              Um resumo visual dos principais dados técnicos e da leitura atual da telemetria simulada.
            </Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.livePillText}>ATIVO</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>PERFORMANCE</Text>
              <Text style={styles.sectionTitle}>Conjunto mecânico</Text>
            </View>
            <Text style={styles.sectionMeta}>RAPTOR</Text>
          </View>

          <View style={styles.metricGrid}>
            <MetricTile label="POTÊNCIA" value={`${getSpec('Potência Máxima (cv)')} cv`} helper="Motor V6 Bi-Turbo" featured />
            <MetricTile label="TORQUE" value={`${getSpec('Torque Máximo (Nm)')} Nm`} helper="Entrega máxima" />
            <MetricTile label="CÂMBIO" value="10 AT" helper="Automático" />
            <MetricTile label="TRAÇÃO" value="4WD" helper="4H · 4A · 4L" />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>OFF-ROAD</Text>
              <Text style={styles.sectionTitle}>Capacidade fora de estrada</Text>
            </View>
          </View>

          <View style={styles.offRoadGrid}>
            <MetricTile label="VÃO LIVRE" value={`${getSpec('Altura Livre do Solo (mm)')} mm`} helper="Solo" />
            <MetricTile label="ATAQUE" value={`${getSpec('Ângulo de Ataque (°)')}°`} helper="Entrada" />
            <MetricTile label="SAÍDA" value={`${getSpec('Ângulo de Saída (°)')}°`} helper="Saída" />
            <MetricTile label="IMERSÃO" value={`${getSpec('Capacidade de Imersão (mm)')} mm`} helper="Vau" />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>TELEMETRIA</Text>
              <Text style={styles.sectionTitle}>Leitura atual</Text>
            </View>
            <Text style={styles.sectionMeta}>SIMULAÇÃO</Text>
          </View>

          <View style={styles.liveGrid}>
            <MetricTile label="VELOCIDADE" value={telemetry.vehicleSpeed ?? '—'} helper="Leitura atual" featured />
            <MetricTile label="RPM" value={telemetry.rpm ?? '—'} helper={`${analysis.rpm >= 5000 ? 'Faixa alta' : 'Operação normal'}`} />
            <MetricTile label="MARCHA" value={telemetry.currentGear ?? '—'} helper="Câmbio 10AT" />
            <MetricTile label="CARGA" value={telemetry.engineLoad ?? '—'} helper={analysis.demandStatus} />
            <MetricTile label="TURBO" value={telemetry.turboBoostPressure ?? '—'} helper={analysis.boostStatus} />
            <MetricTile label="ACELERADOR" value={telemetry.throttlePosition ?? '—'} helper="Comando" />
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>MOTOR</Text>
              <Text style={styles.statusValue}>{telemetry.engineTemperature ?? '—'}</Text>
              <Text style={styles.statusHelper}>NORMAL</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>ÓLEO</Text>
              <Text style={styles.statusValue}>{telemetry.oilTemperature ?? '—'}</Text>
              <Text style={[styles.statusHelper, analysis.tempStatus !== 'NORMAL' && styles.statusHelperWarning]}>{analysis.tempStatus}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>ARREFECIMENTO</Text>
              <Text style={styles.statusValue}>{telemetry.coolantTemperature ?? '—'}</Text>
              <Text style={styles.statusHelper}>NORMAL</Text>
            </View>
          </View>
        </View>

        <View style={styles.notesCard}>
          <View style={styles.notesMarker} />
          <View style={styles.notesBody}>
            <Text style={styles.notesEyebrow}>LEITURA DO SISTEMA</Text>
            <Text style={styles.notesTitle}>
              A telemetria exibida neste relatório é simulada e atualizada localmente para fins demonstrativos.
            </Text>
            <Text style={styles.notesText}>
              O catálogo técnico usa snapshots locais e o relatório transforma essas informações em uma visão executiva, sem depender de chamadas externas em tempo de execução.
            </Text>
          </View>
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
  header: { backgroundColor: COLORS.navy, paddingHorizontal: SPACING.lg, paddingTop: 18, paddingBottom: 24 },
  headerTop: { maxWidth: 1180, width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitles: { flex: 1 },
  kicker: { color: COLORS.blueAlt, fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: COLORS.white, fontSize: 28, fontWeight: '800', marginTop: 4 },
  subtitle: { color: '#C6D4E1', fontSize: 11, marginTop: 4 },
  reportIntro: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, ...SHADOW.card },
  reportEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  reportTitle: { color: COLORS.text, fontSize: 22, fontWeight: '800', marginTop: 4 },
  reportText: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 6, maxWidth: 700 },
  livePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successSoft, borderWidth: 1, borderColor: '#C9EBDD', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success, marginRight: 5 },
  livePillText: { color: COLORS.success, fontSize: 8, fontWeight: '800', letterSpacing: 0.6 },
  sectionCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.surface, borderRadius: 15, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', ...SHADOW.card },
  sectionHeader: { padding: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sectionEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginTop: 3 },
  sectionMeta: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: SPACING.lg },
  offRoadGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: SPACING.lg },
  liveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: SPACING.lg },
  metricTile: { flex: 1, minWidth: 120, backgroundColor: COLORS.surfaceSoft, borderRadius: 11, borderWidth: 1, borderColor: COLORS.border, padding: 12 },
  metricTileFeatured: { backgroundColor: COLORS.blueSoft, borderColor: '#B8D7F2' },
  metricLabel: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
  metricValue: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginTop: 5 },
  metricValueFeatured: { color: COLORS.blueDeep },
  metricHelper: { color: COLORS.textSecondary, fontSize: 8, marginTop: 4 },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.surfaceSoft },
  statusItem: { flex: 1, minWidth: 125, padding: SPACING.lg, borderRightWidth: 1, borderRightColor: COLORS.border },
  statusLabel: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
  statusValue: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginTop: 4 },
  statusHelper: { color: COLORS.success, fontSize: 8, fontWeight: '800', marginTop: 3 },
  statusHelperWarning: { color: COLORS.warning },
  notesCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, flexDirection: 'row', gap: 12, padding: SPACING.lg, backgroundColor: COLORS.navy, borderRadius: 15, ...SHADOW.card },
  notesMarker: { width: 4, borderRadius: 2, backgroundColor: COLORS.blueAlt },
  notesBody: { flex: 1 },
  notesEyebrow: { color: COLORS.blueAlt, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  notesTitle: { color: COLORS.white, fontSize: 12, fontWeight: '800', lineHeight: 17, marginTop: 4 },
  notesText: { color: '#C8D6E2', fontSize: 9, lineHeight: 15, marginTop: 6 },
  primaryButton: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, minHeight: 50, borderRadius: 10, backgroundColor: COLORS.blueDeep, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, ...SHADOW.card },
  primaryButtonText: { color: COLORS.white, fontSize: 13, fontWeight: '800' },
  primaryButtonArrow: { color: COLORS.white, fontSize: 20, fontWeight: '300' },
});
