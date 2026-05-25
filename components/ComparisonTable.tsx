// components/ComparisonTable.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { alignSpecifications, formatTimestamp } from '../utils/dataFormatter';
import { VehicleComparison } from '../types/index';

interface ComparisonTableProps {
  ford: VehicleComparison;
  competitor: VehicleComparison;
  timestamp: number;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  ford,
  competitor,
  timestamp
}) => {
  const aligned = alignSpecifications(ford.specs, competitor.specs);
  const { width } = Dimensions.get('window');
  const colWidth = (width - 40) / 2;

  return (
    <View style={styles.container}>
      {/* Cabeçalho com timestamp */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>COMPARAÇÃO TÉCNICA</Text>
        <Text style={styles.timestamp}>
          {formatTimestamp(timestamp)}
        </Text>
      </View>

      {/* Títulos dos veículos */}
      <View style={styles.vehicleTitlesContainer}>
        <View style={[styles.vehicleTitle, { width: colWidth }]}>
          <Text style={styles.vehicleBrand}>{ford.brand}</Text>
          <Text style={styles.vehicleModel}>{ford.model}</Text>
          <Text style={styles.vehicleVersion}>{ford.version}</Text>
        </View>
        <View style={[styles.vehicleTitle, { width: colWidth }]}>
          <Text style={styles.vehicleBrand}>{competitor.brand}</Text>
          <Text style={styles.vehicleModel}>{competitor.model}</Text>
          <Text style={styles.vehicleVersion}>{competitor.version}</Text>
        </View>
      </View>

      {/* Linhas de comparação rolável */}
      <ScrollView
        style={styles.scrollView}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        {aligned.map((row, index) => (
          <View
            key={`${row.atributo}-${index}`}
            style={[
              styles.row,
              index % 2 === 0 ? styles.rowEven : styles.rowOdd
            ]}
          >
            {/* Nome do atributo */}
            <View style={styles.attributeCell}>
              <Text style={styles.attributeText}>{row.atributo}</Text>
            </View>

            {/* Valor Ford */}
            <View
              style={[
                styles.valueCell,
                { width: colWidth - 2 },
                row.isFordMissing && styles.missingCell
              ]}
            >
              <Text
                style={[
                  styles.valueText,
                  row.isFordMissing && styles.missingValueText
                ]}
              >
                {row.ford}
              </Text>
            </View>

            {/* Valor do competidor */}
            <View
              style={[
                styles.valueCell,
                { width: colWidth - 2 },
                row.isCompetitorMissing && styles.missingCell
              ]}
            >
              <Text
                style={[
                  styles.valueText,
                  row.isCompetitorMissing && styles.missingValueText
                ]}
              >
                {row.competitor}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {aligned.length} atributos comparados
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000000',
    marginHorizontal: 15,
    marginVertical: 20,
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#000000'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8
  },
  timestamp: {
    fontSize: 12,
    color: '#CCCCCC',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  vehicleTitlesContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 3,
    borderBottomColor: '#000000'
  },
  vehicleTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRightWidth: 3,
    borderRightColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vehicleBrand: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 4
  },
  vehicleVersion: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    marginTop: 2
  },
  scrollView: {
    flex: 1,
    maxHeight: 500
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    minHeight: 80
  },
  rowEven: {
    backgroundColor: '#FFFFFF'
  },
  rowOdd: {
    backgroundColor: '#F9F9F9'
  },
  attributeCell: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRightWidth: 2,
    borderRightColor: '#000000',
    justifyContent: 'center'
  },
  attributeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5
  },
  valueCell: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  valueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    letterSpacing: 0.3
  },
  missingCell: {
    backgroundColor: '#FFE5E5',
    borderLeftColor: '#8B5CF6'
  },
  missingValueText: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5
  },
  footer: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 3,
    borderTopColor: '#000000'
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5
  }
});
