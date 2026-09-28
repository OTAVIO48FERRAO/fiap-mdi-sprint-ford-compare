// app/about.tsx
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SideMenu, MenuButton } from '../components/SideMenu';
import { COLORS, SHADOW, SPACING } from '../constants/theme';

const STACK = [
  ['Expo', 'Aplicação mobile'],
  ['React Native', 'Interface multiplataforma'],
  ['TypeScript', 'Tipagem e organização'],
  ['Expo Router', 'Navegação'],
  ['AsyncStorage', 'Sessão e dados locais'],
];

export default function AboutScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitles}>
              <Text style={styles.kicker}>FORD INTELLIGENCE</Text>
              <Text style={styles.title}>Sobre o projeto</Text>
              <Text style={styles.subtitle}>Vehicle Intelligence · MVP acadêmico</Text>
            </View>
            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.logoFrame}>
            <Image source={require('../assets/ford-logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.heroKicker}>FORD RANGER RAPTOR</Text>
          <Text style={styles.heroTitle}>Competitor Intelligence</Text>
          <Text style={styles.heroText}>
            Aplicação acadêmica orientada a telemetria simulada, análise técnica e comparação de picapes.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>OBJETIVO</Text>
          <Text style={styles.sectionTitle}>Transformar dados técnicos em uma experiência de análise veicular.</Text>
          <Text style={styles.sectionText}>
            O aplicativo organiza um catálogo técnico local, apresenta a telemetria simulada da Ranger Raptor e permite comparar especificações com veículos concorrentes.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>TECNOLOGIA</Text>
          <Text style={styles.sectionTitle}>Stack do MVP</Text>

          {STACK.map(([technology, description]) => (
            <View key={technology} style={styles.stackRow}>
              <View style={styles.stackDot} />
              <View style={styles.stackBody}>
                <Text style={styles.stackTitle}>{technology}</Text>
                <Text style={styles.stackDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>DADOS</Text>
          <Text style={styles.sectionTitle}>Catálogo local e telemetria simulada</Text>
          <Text style={styles.sectionText}>
            O aplicativo não depende de API da Ford durante a execução por motivos de limitação no fornecimento de dados e tecnologia da Ford. Os dados técnicos são armazenados localmente e a telemetria é gerada por uma simulação para demonstrar o comportamento do painel.
          </Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>100%</Text>
              <Text style={styles.infoLabel}>LOCAL</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>LIVE</Text>
              <Text style={styles.infoLabel}>SIMULATED</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>TS</Text>
              <Text style={styles.infoLabel}>TYPE-SAFE</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Ford Ranger Raptor · Competitor Intelligence</Text>
          <Text style={styles.footerText}>MVP acadêmico · dados locais · telemetria simulada</Text>
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
  hero: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, backgroundColor: COLORS.navy, borderRadius: 18, padding: SPACING.xl, alignItems: 'center', ...SHADOW.card },
  logoFrame: { width: 118, height: 60, borderRadius: 12, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, marginBottom: SPACING.md },
  logo: { width: '100%', height: '100%' },
  heroKicker: { color: COLORS.blueAlt, fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  heroTitle: { color: COLORS.white, fontSize: 25, fontWeight: '800', textAlign: 'center', marginTop: 5 },
  heroText: { color: '#C8D6E2', fontSize: 11, lineHeight: 17, textAlign: 'center', maxWidth: 620, marginTop: 7 },
  sectionCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, backgroundColor: COLORS.surface, borderRadius: 15, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.xl, ...SHADOW.card },
  sectionEyebrow: { color: COLORS.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: '800', lineHeight: 23, marginTop: 4 },
  sectionText: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 8 },
  stackRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 12 },
  stackDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.blue },
  stackBody: { flex: 1 },
  stackTitle: { color: COLORS.text, fontSize: 11, fontWeight: '800' },
  stackDescription: { color: COLORS.textMuted, fontSize: 9, marginTop: 2 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  infoBox: { flex: 1, minWidth: 100, backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.border, borderRadius: 11, padding: 12 },
  infoValue: { color: COLORS.blueDeep, fontSize: 16, fontWeight: '800' },
  infoLabel: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.5, marginTop: 3 },
  footerCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, padding: SPACING.lg, borderRadius: 14, backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.border },
  footerTitle: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '800' },
  footerText: { color: COLORS.textMuted, fontSize: 9, marginTop: 4 },
});
