// components/TelemetryCard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { TelemetryData } from '../types/index';

interface TelemetryCardProps {
  data: TelemetryData;
  isLive?: boolean;
}

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  data,
  isLive = true
}) => {
  const [isAnimating, setIsAnimating] = useState(isLive);

  useEffect(() => {
    if (!isLive) {
      setIsAnimating(false);
    }
  }, [isLive]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          TELEMETRIA EM TEMPO REAL - FORD RANGER RAPTOR
        </Text>
        {isAnimating && (
          <ActivityIndicator
            size="small"
            color="#007BFF"
            style={styles.indicator}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>POTÊNCIA:</Text>
          <Text style={styles.specValue}>{data.enginePower}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>TORQUE:</Text>
          <Text style={styles.specValue}>{data.engineTorque}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>COMBUSTÍVEL:</Text>
          <Text style={styles.specValue}>{data.fuelType}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>TRAÇÃO:</Text>
          <Text style={styles.specValue}>{data.driveType}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>SUSPENSÃO:</Text>
          <Text style={styles.specValue}>{data.suspensionType}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>VEL. MÁXIMA:</Text>
          <Text style={styles.specValue}>{data.maxSpeed}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>ACELERAÇÃO 0-100:</Text>
          <Text style={styles.specValue}>{data.acceleration0to100}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Atualizado: {new Date(data.timestamp).toLocaleTimeString('pt-BR')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000000',
    marginHorizontal: 15,
    marginVertical: 15,
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    flex: 1
  },
  indicator: {
    marginLeft: 10
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 12
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  specLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.8,
    flex: 1
  },
  specValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#007BFF',
    letterSpacing: 0.5
  },
  divider: {
    height: 2,
    backgroundColor: '#000000',
    marginVertical: 8,
    marginHorizontal: 8
  },
  footer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 3,
    borderTopColor: '#000000'
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 0.3
  }
});
