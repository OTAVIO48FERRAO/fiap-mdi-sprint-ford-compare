// app/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TelemetryCard } from '../components/TelemetryCard';
import { useComparison } from '../context/ComparisonContext';
import {
  FORD_RANGER_RAPTOR_SPECS,
  FORD_TELEMETRY,
  generateLiveTelemetryUpdate,
  TELEMETRY_UPDATE_INTERVAL,
} from '../mock/fordData';
import {
  COMPETITOR_SPECS_CACHE,
  findCompetitor,
  normalizeLookup,
  validateCompetitorSearch,
} from '../mock/aiResponseData';
import { ComparisonResult } from '../types/index';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { MenuButton, SideMenu } from '../components/SideMenu';

export default function HomeScreen() {
  const router = useRouter();
  const { setComparison, setIsLoading, setError, isLoading } = useComparison();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [telemetry, setTelemetry] = useState(FORD_TELEMETRY);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((previous) => generateLiveTelemetryUpdate(previous));
    }, TELEMETRY_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const availableCompetitors = useMemo(
    () => Object.values(COMPETITOR_SPECS_CACHE),
    []
  );

  const searchValidation = useMemo(
    () => validateCompetitorSearch(brand, model, version),
    [brand, model, version]
  );

  const visibleCompetitors = useMemo(() => {
    const normalizedBrand = normalizeLookup(brand);
    const normalizedModel = normalizeLookup(model);

    if (!normalizedBrand && !normalizedModel) {
      return availableCompetitors;
    }

    return availableCompetitors.filter((competitor) => {
      const matchesBrand = !normalizedBrand || normalizeLookup(competitor.brand).includes(normalizedBrand);
      const matchesModel = !normalizedModel || normalizeLookup(competitor.model).includes(normalizedModel);
      return matchesBrand && matchesModel;
    });
  }, [availableCompetitors, brand, model]);

  const handleCompare = async () => {
    setSearchAttempted(true);

    if (!searchValidation.valid) {
      setError(
        searchValidation.brandError ||
        searchValidation.modelError ||
        searchValidation.versionError
      );
      return;
    }

    const trimmedBrand = brand.trim();
    const trimmedModel = model.trim();
    const trimmedVersion = version.trim();

    setIsLoading(true);
    setError(null);

    try {
      const competitorData = findCompetitor(trimmedBrand, trimmedModel, trimmedVersion);

      if (!competitorData) {
        const message = 'Veículo não encontrado no catálogo local.';
        setError(message);
        return;
      }

      const result: ComparisonResult = {
        ford: FORD_RANGER_RAPTOR_SPECS,
        competitor: competitorData,
        timestamp: Date.now(),
      };

      setComparison(result);
      router.push('/comparison');
    } catch (error) {
      setError('Não foi possível preparar a comparação.');
      Alert.alert('Erro na comparação', 'Confira os dados informados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelect = (
    competitor: (typeof availableCompetitors)[number]
  ) => {
    setBrand(competitor.brand);
    setModel(competitor.model);
    setVersion(competitor.version);
    setSearchAttempted(false);
    setError(null);
  };

  const hasSearchErrors = searchAttempted && Boolean(
    searchValidation.brandError ||
    searchValidation.modelError ||
    searchValidation.versionError
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View style={styles.brandWrap}>
              <View style={styles.logoFrame}>
                <Image
                  source={require('../assets/ford-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.brandText}>
                <Text style={styles.kicker}>FORD INTELLIGENCE</Text>
                <Text style={styles.mainTitle}>RANGER RAPTOR</Text>
                <Text style={styles.headerSubtitle}>Competitor intelligence · Telemetria</Text>
              </View>
            </View>

            <MenuButton onPress={() => setMenuOpen(true)} />
          </View>
        </View>

        {/* INTRO */}
        <View style={styles.pageIntro}>
          <View style={styles.pageIntroText}>
            <Text style={styles.pageTitle}>Painel operacional</Text>
            <Text style={styles.pageDescription}>
              Monitore a simulação de telemetria e compare a Ranger Raptor com o catálogo local de concorrentes.
            </Text>
          </View>

          <View style={styles.localBadge}>
            <View style={styles.localBadgeDot} />
            <Text style={styles.localBadgeText}>DADOS LOCAIS</Text>
          </View>
        </View>

        {/* TELEMETRY */}
        <TelemetryCard data={telemetry} isLive />

        {/* COMPARISON */}
        <View style={styles.searchCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardEyebrow}>COMPARAÇÃO</Text>
              <Text style={styles.cardTitle}>Buscar concorrente</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.cardCount}>{availableCompetitors.length} modelos</Text>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Marca</Text>
              <TextInput
                style={[styles.input, searchAttempted && searchValidation.brandError && styles.inputError]}
                placeholder="Ex.: Toyota"
                placeholderTextColor={COLORS.textMuted}
                value={brand}
                onChangeText={(value) => {
                  setBrand(value);
                  setSearchAttempted(false);
                  setError(null);
                }}
                editable={!isLoading}
                autoCapitalize="words"
              />
              {searchAttempted && searchValidation.brandError ? (
                <Text style={styles.fieldError}>{searchValidation.brandError}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Modelo</Text>
              <TextInput
                style={[styles.input, searchAttempted && searchValidation.modelError && styles.inputError]}
                placeholder="Ex.: Hilux"
                placeholderTextColor={COLORS.textMuted}
                value={model}
                onChangeText={(value) => {
                  setModel(value);
                  setSearchAttempted(false);
                  setError(null);
                }}
                editable={!isLoading}
                autoCapitalize="words"
              />
              {searchAttempted && searchValidation.modelError ? (
                <Text style={styles.fieldError}>{searchValidation.modelError}</Text>
              ) : null}
            </View>
          </View>

          <View style={[styles.inputGroup, styles.versionGroup]}>
            <Text style={styles.inputLabel}>
              Versão <Text style={styles.optional}>(opcional)</Text>
            </Text>
            <TextInput
              style={[styles.input, searchAttempted && searchValidation.versionError && styles.inputError]}
              placeholder="Ex.: SRX Plus AT 2026"
              placeholderTextColor={COLORS.textMuted}
              value={version}
              onChangeText={(value) => {
                setVersion(value);
                setError(null);
              }}
              editable={!isLoading}
              autoCapitalize="words"
            />
            {searchAttempted && searchValidation.versionError ? (
              <Text style={styles.fieldError}>{searchValidation.versionError}</Text>
            ) : null}
          </View>

          {/* QUICK SELECT */}
          <View style={styles.quickSelectSection}>
            <View style={styles.quickSelectHeader}>
              <View>
                <Text style={styles.suggestionsTitle}>Seleção rápida</Text>
                <Text style={styles.suggestionsSubtitle}>Escolha um modelo do catálogo local</Text>
              </View>
              <Text style={styles.catalogStatus}>ATUALIZADO</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
              {visibleCompetitors.map((competitor) => {
                const active =
                  brand.toLowerCase() === competitor.brand.toLowerCase() &&
                  model.toLowerCase() === competitor.model.toLowerCase();

                return (
                  <Pressable
                    key={`${competitor.brand}-${competitor.model}`}
                    style={[styles.suggestionChip, active && styles.suggestionChipActive]}
                    onPress={() => handleQuickSelect(competitor)}
                    disabled={isLoading}
                  >
                    <Text style={[styles.suggestionBrand, active && styles.suggestionTextActive]}>
                      {competitor.brand}
                    </Text>
                    <Text style={[styles.suggestionModel, active && styles.suggestionTextActive]} numberOfLines={1}>
                      {competitor.model}
                    </Text>
                    <Text style={[styles.suggestionVersion, active && styles.suggestionVersionActive]} numberOfLines={1}>
                      {competitor.version}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {(brand.trim() || model.trim()) && visibleCompetitors.length === 0 ? (
              <View style={styles.noResultsBox}>
                <Text style={styles.noResultsTitle}>Nenhum resultado no catálogo</Text>
                <Text style={styles.noResultsText}>A marca ou o modelo informado não corresponde aos veículos cadastrados. Revise o termo ou escolha uma sugestão.</Text>
              </View>
            ) : null}

            {hasSearchErrors ? (
              <Text style={styles.searchHint}>Corrija os campos acima para habilitar a comparação.</Text>
            ) : null}
          </View>

          <Pressable
            style={[styles.compareButton, isLoading && styles.compareButtonDisabled]}
            onPress={handleCompare}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContent}>
                <ActivityIndicator size="small" color={COLORS.white} />
                <Text style={styles.compareButtonText}>Preparando comparação...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.compareButtonText}>Comparar veículos</Text>
                <Text style={styles.compareButtonArrow}>→</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* INFO */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardEyebrow}>TELEMETRIA</Text>
            <Text style={styles.infoCardTitle}>Monitoramento visual</Text>
            <Text style={styles.infoCardText}>
              RPM, carga, acelerador, turbo, marcha, velocidade e temperaturas respondem de forma correlacionada na simulação.
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardEyebrow}>CATÁLOGO</Text>
            <Text style={styles.infoCardTitle}>Base técnica local</Text>
            <Text style={styles.infoCardText}>
              Dados técnicos permanecem no aplicativo; a demonstração não depende de API da Ford em tempo de execução.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Ford Ranger Raptor · Competitor Intelligence</Text>
          <Text style={styles.footerText}>MVP acadêmico · telemetria simulada · catálogo local</Text>
        </View>
      </ScrollView>

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  contentContainer: { paddingBottom: 40 },
  headerSection: { backgroundColor: COLORS.navy, paddingHorizontal: SPACING.lg, paddingTop: 22, paddingBottom: 24 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 2,
  },
  brandWrap: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  logoFrame: { width: 48, height: 48, borderRadius: 12, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden' },
  logo: { width: 42, height: 42 },
  brandText: { flexShrink: 1 },
  kicker: { color: '#B8C8D8', fontSize: 9, fontWeight: '800', letterSpacing: 1.3, marginBottom: 2 },
  mainTitle: { color: COLORS.white, fontSize: 24, fontWeight: '800', letterSpacing: 0.4 },
  headerSubtitle: { color: '#B8C8D8', fontSize: 11, marginTop: 3 },
  signOutButton: { backgroundColor: 'rgba(255,255,255,0.10)', borderWidth: 1, borderColor: '#37516A', borderRadius: 9, paddingVertical: 8, paddingHorizontal: 14 },
  signOutText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  pageIntro: { maxWidth: 1180, width: '100%', alignSelf: 'center', paddingHorizontal: SPACING.lg, paddingTop: 24, paddingBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 },
  pageIntroText: { flex: 1 },
  pageTitle: { color: COLORS.text, fontSize: 28, fontWeight: '800' },
  pageDescription: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 6, maxWidth: 720 },
  localBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successSoft, borderWidth: 1, borderColor: '#CBE9D9', borderRadius: 999, paddingHorizontal: 11, paddingVertical: 7 },
  localBadgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 7 },
  localBadgeText: { color: COLORS.success, fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  searchCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.xl, backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.xl, ...SHADOW.card },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.lg },
  cardEyebrow: { color: COLORS.blue, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  cardTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginTop: 4 },
  countBadge: { backgroundColor: COLORS.blueSoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  cardCount: { color: COLORS.blueDeep, fontSize: 9, fontWeight: '800' },
  inputRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  inputGroup: { flex: 1, minWidth: 220, marginBottom: SPACING.md },
  versionGroup: { marginTop: 2 },
  inputLabel: { color: COLORS.text, fontSize: 11, fontWeight: '700', marginBottom: 7 },
  optional: { color: COLORS.textMuted, fontWeight: '500' },
  input: { minHeight: 48, backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.borderStrong, borderRadius: 10, paddingHorizontal: 13, color: COLORS.text, fontSize: 13 },
  inputError: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerSoft },
  fieldError: { color: COLORS.danger, fontSize: 10, fontWeight: '700', marginTop: 5 },
  quickSelectSection: { marginTop: 14, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
  quickSelectHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  suggestionsTitle: { color: COLORS.text, fontSize: 12, fontWeight: '800', letterSpacing: 0.3 },
  suggestionsSubtitle: { color: COLORS.textMuted, fontSize: 9, marginTop: 3 },
  catalogStatus: { color: COLORS.success, fontSize: 8, fontWeight: '800', letterSpacing: 0.7, marginTop: 2 },
  suggestionsRow: { paddingTop: 12, paddingBottom: 5, paddingRight: 8 },
  suggestionChip: { backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, marginRight: 9, minWidth: 145, maxWidth: 185 },
  suggestionChipActive: { backgroundColor: COLORS.blueSoft, borderColor: '#BFD7F5' },
  suggestionBrand: { color: COLORS.textMuted, fontSize: 8, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  suggestionModel: { color: COLORS.text, fontSize: 12, fontWeight: '800', marginTop: 3 },
  suggestionVersion: { color: COLORS.textSecondary, fontSize: 8, marginTop: 5 },
  suggestionTextActive: { color: COLORS.blue },
  suggestionVersionActive: { color: COLORS.blueDeep },
  noResultsBox: { backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, marginTop: 6 },
  noResultsTitle: { color: COLORS.text, fontSize: 10, fontWeight: '800' },
  noResultsText: { color: COLORS.textSecondary, fontSize: 9, marginTop: 3 },
  searchHint: { color: COLORS.textMuted, fontSize: 9, marginTop: 4 },
  compareButton: { minHeight: 52, backgroundColor: COLORS.blue, borderRadius: 10, marginTop: SPACING.md, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...SHADOW.card },
  compareButtonDisabled: { opacity: 0.55 },
  compareButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '800', letterSpacing: 0.1 },
  compareButtonArrow: { color: COLORS.white, fontSize: 23, fontWeight: '300', marginLeft: 10, marginTop: -1 },
  loadingContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoGrid: { marginHorizontal: SPACING.lg, marginBottom: SPACING.xl, flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  infoCard: { flex: 1, minWidth: 260, backgroundColor: COLORS.surface, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.lg },
  infoCardEyebrow: { color: COLORS.blue, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  infoCardTitle: { color: COLORS.text, fontSize: 15, fontWeight: '800', marginTop: 5 },
  infoCardText: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 7 },
  footer: { marginHorizontal: SPACING.lg, paddingTop: 18, borderTopWidth: 1, borderTopColor: COLORS.border },
  footerTitle: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700' },
  footerText: { color: COLORS.textMuted, fontSize: 10, marginTop: 3 },
});
