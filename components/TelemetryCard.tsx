// components/TelemetryCard.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TelemetryData } from '../types/index';
import { COLORS, SHADOW, SPACING } from '../constants/theme';

interface TelemetryCardProps {
  data: TelemetryData;
  isLive?: boolean;
}

const parseMetric = (value?: string): number | null => {
  if (!value) return null;
  const normalized = value.replace(',', '.');
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
};

const progressFrom = (value: string | undefined, min: number, max: number) => {
  const parsed = parseMetric(value);
  if (parsed == null || max <= min) return 0;
  return Math.max(0, Math.min(100, ((parsed - min) / (max - min)) * 100));
};

const MetricCard = ({
  label,
  value,
  helper,
  progress,
  featured = false,
}: {
  label: string;
  value: string;
  helper: string;
  progress?: number;
  featured?: boolean;
}) => (
  <View style={[styles.metricCard, featured && styles.metricCardFeatured]}>
    <Text style={[styles.metricLabel, featured && styles.metricLabelFeatured]}>{label}</Text>
    <Text
      style={[styles.metricValue, featured && styles.metricValueFeatured]}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {value}
    </Text>
    <Text style={[styles.metricHelper, featured && styles.metricHelperFeatured]}>{helper}</Text>

    {typeof progress === 'number' && (
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    )}
  </View>
);

const TemperatureCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const temp = parseMetric(value) ?? 0;
  const status = temp >= 105 ? 'ATENÇÃO' : temp >= 98 ? 'ELEVADA' : 'NORMAL';
  const statusStyle =
    temp >= 105
      ? styles.statusDanger
      : temp >= 98
        ? styles.statusWarning
        : styles.statusSuccess;

  const progress = Math.max(0, Math.min(100, ((temp - 70) / 40) * 100));

  return (
    <View style={styles.temperatureCard}>
      <View style={styles.temperatureTop}>
        <Text style={styles.temperatureLabel}>{label}</Text>
        <Text style={[styles.temperatureStatus, statusStyle]}>{status}</Text>
      </View>

      <Text style={styles.temperatureValue}>{value}</Text>

      <View style={styles.temperatureTrack}>
        <View style={[styles.temperatureFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  data,
  isLive = true,
}) => {
  const [pulse, setPulse] = useState(false);
  const [rpmHistory, setRpmHistory] = useState<number[]>([]);

  useEffect(() => {
    const rpm = parseMetric(data.rpm);

    if (rpm != null) {
      setRpmHistory((history) => [...history.slice(-15), rpm]);
    }
  }, [data.rpm]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setPulse((current) => !current);
    }, 750);

    return () => clearInterval(interval);
  }, [isLive]);

  const latestRpm = parseMetric(data.rpm) ?? 0;
  const rpmMax = Math.max(6500, ...rpmHistory, latestRpm);
  const currentLoad = parseMetric(data.engineLoad) ?? 0;
  const currentThrottle = parseMetric(data.throttlePosition) ?? 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <View style={styles.liveRow}>
            <View style={[styles.liveDot, pulse && styles.liveDotActive]} />
            <Text style={styles.liveLabel}>
              {isLive ? 'SIMULAÇÃO AO VIVO' : 'PAINEL DE TELEMETRIA'}
            </Text>
          </View>

          <Text style={styles.headerTitle}>Ranger Raptor</Text>
          <Text style={styles.headerSubtitle}>
            Telemetria operacional · atualização a cada 1,5 s
          </Text>
        </View>

        <View style={styles.speedPanel}>
          <Text style={styles.speedLabel}>VELOCIDADE</Text>
          <Text style={styles.speedValue}>{data.vehicleSpeed ?? '0 km/h'}</Text>
          <Text style={styles.speedHint}>LIMITADOR 180 KM/H</Text>
        </View>
      </View>

      {/* Main metrics */}
      <View style={styles.metricsSection}>
        <View style={styles.metricsGrid}>
          <MetricCard
            label="ROTAÇÃO"
            value={data.rpm ?? '—'}
            helper="RPM atual"
            progress={progressFrom(data.rpm, 800, 6500)}
            featured
          />

          <MetricCard
            label="MARCHA"
            value={data.currentGear ?? '—'}
            helper="Automático 10AT"
          />

          <MetricCard
            label="ACELERADOR"
            value={data.throttlePosition ?? '—'}
            helper="Posição do pedal"
            progress={progressFrom(data.throttlePosition, 0, 100)}
          />

          <MetricCard
            label="CARGA DO MOTOR"
            value={data.engineLoad ?? '—'}
            helper={currentLoad >= 75 ? 'Alta solicitação' : 'Solicitação normal'}
            progress={progressFrom(data.engineLoad, 0, 100)}
          />

          <MetricCard
            label="PRESSÃO TURBO"
            value={data.turboBoostPressure ?? '—'}
            helper="Boost estimado"
            progress={progressFrom(data.turboBoostPressure, 0, 1.8)}
          />

          <MetricCard
            label="CONSUMO"
            value={data.fuelConsumption ?? '—'}
            helper={currentThrottle > 70 ? 'Aceleração forte' : 'Estimativa instantânea'}
          />
        </View>
      </View>

      {/* Thermal monitoring */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>MONITORAMENTO TÉRMICO</Text>
          <Text style={styles.sectionHint}>Temperaturas respondem à carga simulada</Text>
        </View>

        <View style={styles.statusPill}>
          <View style={styles.statusPillDot} />
          <Text style={styles.statusPillText}>NORMAL</Text>
        </View>
      </View>

      <View style={styles.temperatureGrid}>
        <TemperatureCard label="MOTOR" value={data.engineTemperature ?? '—'} />
        <TemperatureCard label="ÓLEO" value={data.oilTemperature ?? '—'} />
        <TemperatureCard label="ARREFECIMENTO" value={data.coolantTemperature ?? '—'} />
      </View>

      {/* RPM chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.sectionTitle}>HISTÓRICO DE RPM</Text>
            <Text style={styles.sectionHintLeft}>Últimas leituras da simulação</Text>
          </View>

          <View style={styles.chartCurrentBox}>
            <Text style={styles.chartCurrentValue}>{data.rpm ?? '—'}</Text>
            <Text style={styles.chartCurrentLabel}>ATUAL</Text>
          </View>
        </View>

        <View style={styles.chartArea}>
          <View style={styles.chartBaseline} />

          {(rpmHistory.length ? rpmHistory : [850]).map((rpm, index) => (
            <View
              key={`${rpm}-${index}`}
              style={[
                styles.chartBar,
                {
                  height: Math.max(8, Math.round((rpm / rpmMax) * 88)),
                  opacity: 0.35 + (index / Math.max(1, rpmHistory.length)) * 0.65,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.chartScale}>
          <Text style={styles.chartScaleText}>800</Text>
          <Text style={styles.chartScaleText}>3.500</Text>
          <Text style={styles.chartScaleText}>6.500 RPM</Text>
        </View>
      </View>

      {/* Static vehicle reference */}
      <View style={styles.referenceStrip}>
        <View style={styles.referenceItem}>
          <Text style={styles.referenceLabel}>POTÊNCIA</Text>
          <Text style={styles.referenceValue}>{data.enginePower}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.referenceItem}>
          <Text style={styles.referenceLabel}>TORQUE</Text>
          <Text style={styles.referenceValue}>{data.engineTorque}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.referenceItem}>
          <Text style={styles.referenceLabel}>TRAÇÃO</Text>
          <Text style={styles.referenceValue}>{data.driveType}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.referenceItem}>
          <Text style={styles.referenceLabel}>0–100 KM/H</Text>
          <Text style={styles.referenceValue}>{data.acceleration0to100}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Atualizado às {new Date(data.timestamp).toLocaleTimeString('pt-BR')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOW.card,
  },

  header: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: SPACING.md,
  },

  headerMain: {
    flex: 1,
    justifyContent: 'center',
  },

  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6E91AF',
    marginRight: 8,
  },

  liveDotActive: {
    backgroundColor: COLORS.blueAlt,
  },

  liveLabel: {
    color: '#B9CADB',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#AFC2D5',
    fontSize: 11,
    marginTop: 4,
  },

  speedPanel: {
    minWidth: 136,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: COLORS.navySoft,
    borderWidth: 1,
    borderColor: '#294861',
    justifyContent: 'center',
    alignItems: 'center',
  },

  speedLabel: {
    color: '#AFC2D5',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },

  speedValue: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: '800',
    marginTop: 3,
  },

  speedHint: {
    color: '#7FA4C2',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 3,
  },

  metricsSection: {
    padding: SPACING.md,
    paddingBottom: 6,
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  metricCard: {
    width: '33.3333%',
    minWidth: 150,
    flexGrow: 1,
    padding: 15,
    margin: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 12,
  },

  metricCardFeatured: {
    backgroundColor: COLORS.blueSoft,
    borderColor: '#CCE0F5',
  },

  metricLabel: {
    color: COLORS.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  metricLabelFeatured: {
    color: COLORS.blueDeep,
  },

  metricValue: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 7,
  },

  metricValueFeatured: {
    color: COLORS.navy,
  },

  metricHelper: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 4,
  },

  metricHelperFeatured: {
    color: COLORS.textSecondary,
  },

  progressTrack: {
    height: 5,
    marginTop: 12,
    borderRadius: 3,
    backgroundColor: '#DEE7EF',
    overflow: 'hidden',
  },

  progressFill: {
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.blueAlt,
  },

  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  sectionHint: {
    color: COLORS.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successSoft,
    borderWidth: 1,
    borderColor: '#CBE9D9',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },

  statusPillText: {
    color: COLORS.success,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  temperatureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    gap: 10,
  },

  temperatureCard: {
    flex: 1,
    minWidth: 170,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 13,
  },

  temperatureTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  temperatureLabel: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '800',
  },

  temperatureStatus: {
    fontSize: 8,
    fontWeight: '800',
  },

  statusSuccess: { color: COLORS.success },
  statusWarning: { color: COLORS.warning },
  statusDanger: { color: COLORS.danger },

  temperatureValue: {
    color: COLORS.navy,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 9,
  },

  temperatureTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E8F0',
    overflow: 'hidden',
    marginTop: 10,
  },

  temperatureFill: {
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.blueAlt,
  },

  chartCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: 14,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  sectionHintLeft: {
    color: COLORS.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  chartCurrentBox: {
    alignItems: 'flex-end',
  },

  chartCurrentValue: {
    color: COLORS.blueDeep,
    fontSize: 13,
    fontWeight: '800',
  },

  chartCurrentLabel: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 1,
  },

  chartArea: {
    height: 102,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    paddingHorizontal: 3,
    position: 'relative',
  },

  chartBaseline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: COLORS.borderStrong,
  },

  chartBar: {
    flex: 1,
    minWidth: 4,
    maxWidth: 20,
    borderRadius: 4,
    backgroundColor: COLORS.blueAlt,
  },

  chartScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  chartScaleText: {
    color: COLORS.textMuted,
    fontSize: 8,
  },

  referenceStrip: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: COLORS.blueSoft,
    borderWidth: 1,
    borderColor: '#D6E7FB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  referenceItem: {
    flex: 1,
    paddingHorizontal: 7,
    justifyContent: 'center',
  },

  referenceLabel: {
    color: COLORS.textSecondary,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  referenceValue: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },

  separator: {
    width: 1,
    backgroundColor: '#C6D8EB',
  },

  footer: {
    color: COLORS.textMuted,
    fontSize: 9,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
