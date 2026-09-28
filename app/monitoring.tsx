// app/monitoring.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FORD_TELEMETRY, generateLiveTelemetryUpdate, TELEMETRY_UPDATE_INTERVAL } from '../mock/fordData';
import { TelemetryCard } from '../components/TelemetryCard';
import { TelemetryData } from '../types/index';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { MenuButton, SideMenu } from '../components/SideMenu';

const parseNumber = (value?: string): number => {
  const parsed = Number.parseFloat((value ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const MiniMetric = ({ label, value, helper }: { label: string; value: string; helper: string }) => (
  <View style={styles.miniMetric}>
    <Text style={styles.miniLabel}>{label}</Text>
    <Text style={styles.miniValue}>{value}</Text>
    <Text style={styles.miniHelper}>{helper}</Text>
  </View>
);

export default function MonitoringScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>(FORD_TELEMETRY);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((previous) => generateLiveTelemetryUpdate(previous));
    }, TELEMETRY_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const status = useMemo(() => {
    const load = parseNumber(telemetry.engineLoad);
    const oil = parseNumber(telemetry.oilTemperature);
    const turbo = parseNumber(telemetry.turboBoostPressure);

    return {
      loadText: load >= 80 ? 'Alta solicitação' : load >= 45 ? 'Carga moderada' : 'Carga baixa',
      thermalText: oil >= 105 ? 'Atenção térmica' : oil >= 98 ? 'Temperatura elevada' : 'Temperaturas normais',
      boostText: turbo >= 1.2 ? 'Boost alto' : turbo >= 0.5 ? 'Boost ativo' : 'Baixo boost',
    };
  }, [telemetry]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitles}>
              <Text style={styles.kicker}>MONITORAMENTO</Text>
              <Text style={styles.title}>Telemetria ao vivo</Text>
              <Text style={styles.subtitle}>Ranger Raptor · simulação operacional local</Text>
            </View>
            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>
        </View>

        <View style={styles.introCard}>
          <View style={styles.introBody}>
            <Text style={styles.introEyebrow}>LIVE TELEMETRY</Text>
            <Text style={styles.introTitle}>Central de monitoramento</Text>
            <Text style={styles.introText}>
              Acompanhe a relação entre velocidade, RPM, acelerador, carga, turbo e temperaturas na simulação.
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ATIVO</Text>
          </View>
        </View>

        <TelemetryCard data={telemetry} isLive />

        <View style={styles.statusCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>STATUS DO SISTEMA</Text>
              <Text style={styles.sectionTitle}>Leitura instantânea</Text>
            </View>
            <Text style={styles.sectionMeta}>1,5 s</Text>
          </View>

          <View style={styles.miniGrid}>
            <MiniMetric label="CARGA" value={telemetry.engineLoad ?? '—'} helper={status.loadText} />
            <MiniMetric label="TURBO" value={telemetry.turboBoostPressure ?? '—'} helper={status.boostText} />
            <MiniMetric label="ÓLEO" value={telemetry.oilTemperature ?? '—'} helper={status.thermalText} />
            <MiniMetric label="MOTOR" value={telemetry.engineTemperature ?? '—'} helper="Temperatura atual" />
          </View>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.sectionEyebrow}>CONTINUIDADE</Text>
          <Text style={styles.actionsTitle}>Explore os dados da Raptor</Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.actionButton} onPress={() => router.replace('/details')}>
              <Text style={styles.actionButtonLabel}>Ficha técnica</Text>
              <Text style={styles.actionButtonArrow}>→</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => router.replace('/report')}>
              <Text style={styles.actionButtonLabel}>Relatório</Text>
              <Text style={styles.actionButtonArrow}>→</Text>
            </Pressable>
          </View>
        </View>
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
  kicker: { color: COLORS.blueAlt, fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: COLORS.white, fontSize: 28, fontWeight: '800', marginTop: 4 },
  subtitle: { color: '#C5D2DE', fontSize: 11, marginTop: 4 },
  introCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.xl, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, ...SHADOW.card },
  introBody: { flex: 1 },
  introEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  introTitle: { color: COLORS.text, fontSize: 21, fontWeight: '800', marginTop: 4 },
  introText: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 6 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successSoft, borderWidth: 1, borderColor: '#C9EBDD', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success, marginRight: 5 },
  liveText: { color: COLORS.success, fontSize: 8, fontWeight: '800', letterSpacing: 0.6 },
  statusCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.surface, borderRadius: 15, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', ...SHADOW.card },
  sectionHeader: { padding: SPACING.lg, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sectionEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginTop: 3 },
  sectionMeta: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800' },
  miniGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: SPACING.lg },
  miniMetric: { flex: 1, minWidth: 125, backgroundColor: COLORS.surfaceSoft, borderRadius: 11, borderWidth: 1, borderColor: COLORS.border, padding: 12 },
  miniLabel: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
  miniValue: { color: COLORS.text, fontSize: 17, fontWeight: '800', marginTop: 5 },
  miniHelper: { color: COLORS.textSecondary, fontSize: 8, marginTop: 4 },
  actionsCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.navy, borderRadius: 15, padding: SPACING.xl, ...SHADOW.card },
  actionsTitle: { color: COLORS.white, fontSize: 17, fontWeight: '800', marginTop: 4 },
  actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  actionButton: { flex: 1, minWidth: 145, minHeight: 48, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: '#35506A', borderRadius: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionButtonLabel: { color: COLORS.white, fontSize: 11, fontWeight: '800' },
  actionButtonArrow: { color: COLORS.blueAlt, fontSize: 19 },
});
