// components/ComparisonTable.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { alignSpecifications, formatTimestamp } from '../utils/dataFormatter';
import { VehicleComparison } from '../types/index';
import { COLORS, SHADOW, SPACING } from '../constants/theme';

interface ComparisonTableProps {
  ford: VehicleComparison;
  competitor: VehicleComparison;
  timestamp: number;
}

const VehicleHeader = ({ vehicle, accent }: { vehicle: VehicleComparison; accent: 'ford' | 'competitor' }) => (
  <View style={styles.vehicleHeader}>
    <View style={[styles.vehicleMarker, accent === 'ford' ? styles.vehicleMarkerFord : styles.vehicleMarkerCompetitor]} />
    <View style={styles.vehicleHeaderText}>
      <Text style={styles.vehicleBrand}>{vehicle.brand}</Text>
      <Text style={styles.vehicleModel}>{vehicle.model}</Text>
      <Text style={styles.vehicleVersion}>{vehicle.version}</Text>
      {vehicle.source ? (
        <Text style={styles.vehicleSource} numberOfLines={2}>
          Fonte: {vehicle.source}
        </Text>
      ) : null}
    </View>
  </View>
);

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ ford, competitor, timestamp }) => {
  const aligned = alignSpecifications(ford.specs, competitor.specs);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>ANÁLISE TÉCNICA</Text>
          <Text style={styles.title}>Comparativo de especificações</Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
      </View>

      <View style={styles.vehicleRow}>
        <VehicleHeader vehicle={ford} accent="ford" />
        <VehicleHeader vehicle={competitor} accent="competitor" />
      </View>

      <ScrollView style={styles.rowsContainer} showsVerticalScrollIndicator={false}>
        {aligned.map((row, index) => (
          <View key={`${row.atributo}-${index}`} style={styles.row}>
            <Text style={styles.attribute}>{row.atributo}</Text>
            <View style={styles.valuesRow}>
              <View style={styles.valueBox}>
                <Text style={styles.value}>{row.ford}</Text>
                <Text style={styles.valueCaption}>Ford</Text>
              </View>
              <View style={styles.valueBox}>
                <Text style={styles.value}>{row.competitor}</Text>
                <Text style={styles.valueCaption}>Concorrente</Text>
              </View>
            </View>
          </View>
        ))}

        {aligned.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Sem atributos comparáveis</Text>
            <Text style={styles.emptyText}>
              Não há campos preenchidos em comum entre os dois veículos no catálogo local.
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerStrong}>{aligned.length} atributos comparáveis</Text>
          <Text style={styles.footerText}>A tabela exibe apenas campos com informação nos dois veículos.</Text>
        </View>
        <View style={styles.legendPill}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Catálogo local</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  header: {
    padding: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  eyebrow: { color: COLORS.blue, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginTop: 4 },
  timestamp: { color: COLORS.textMuted, fontSize: 10, textAlign: 'right' },
  vehicleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceSoft,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  vehicleHeader: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  vehicleMarker: { width: 4, height: 40, borderRadius: 2, marginRight: 10 },
  vehicleMarkerFord: { backgroundColor: COLORS.blue },
  vehicleMarkerCompetitor: { backgroundColor: COLORS.navySoft },
  vehicleHeaderText: { flex: 1 },
  vehicleBrand: { color: COLORS.textMuted, fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
  vehicleModel: { color: COLORS.text, fontSize: 15, fontWeight: '800', marginTop: 3 },
  vehicleVersion: { color: COLORS.textSecondary, fontSize: 10, marginTop: 3 },
  vehicleSource: { color: COLORS.textMuted, fontSize: 8, lineHeight: 12, marginTop: 5 },
  rowsContainer: { maxHeight: 640 },
  row: { paddingHorizontal: SPACING.lg, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  attribute: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700', marginBottom: 8 },
  valuesRow: { flexDirection: 'row', gap: 10 },
  valueBox: {
    flex: 1,
    minHeight: 54,
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 11,
    paddingVertical: 9,
    justifyContent: 'center',
  },
  value: { color: COLORS.text, fontSize: 12, fontWeight: '800' },
  valueCaption: { color: COLORS.textMuted, fontSize: 8, fontWeight: '700', marginTop: 3 },
  emptyBox: { padding: SPACING.xl, alignItems: 'center' },
  emptyTitle: { color: COLORS.text, fontSize: 13, fontWeight: '800' },
  emptyText: { color: COLORS.textSecondary, fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: 6 },
  footer: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.surfaceSoft,
  },
  footerStrong: { color: COLORS.text, fontSize: 10, fontWeight: '800' },
  footerText: { color: COLORS.textMuted, fontSize: 9, marginTop: 3 },
  legendPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, backgroundColor: COLORS.blueSoft },
  legendDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.blue, marginRight: 6 },
  legendText: { color: COLORS.blue, fontSize: 8, fontWeight: '800' },
});
