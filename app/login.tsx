import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_USERS } from '../mock/users';
import { COLORS, SHADOW, SPACING } from '../constants/theme';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter ao menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : DEFAULT_USERS;

      const found = users.find(
        (user: { email: string; password: string }) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (!found) {
        setErrorMessage('E-mail ou senha incorretos.');
        return;
      }

      await AsyncStorage.setItem('isLoggedIn', 'true');

      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify({
          email: found.email,
          role: found.role || 'user',
        })
      );

      router.replace('/');
    } catch (error) {
      setErrorMessage('Não foi possível realizar o login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      {/* BRAND */}
      <View style={styles.brandBlock}>
        <View style={styles.logoFrame}>
          <Image
            source={require('../assets/ford-logo.png')}
            style={styles.fordLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.brandTextBlock}>
          <Text style={styles.brandKicker}>FORD INTELLIGENCE</Text>
          <Text style={styles.brandTitle}>Ranger Raptor</Text>
        </View>
      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>SISTEMA ONLINE</Text>
        </View>

        <Text style={styles.eyebrow}>ACESSO AO SISTEMA</Text>

        <Text style={styles.title}>Entrar</Text>

        <Text style={styles.subtitle}>
          Acesse o painel de telemetria e comparação.
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrorMessage('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="seu@exemplo.com"
          placeholderTextColor={COLORS.textMuted}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Senha</Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrorMessage('');
          }}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={COLORS.textMuted}
        />

        {/* ERROR */}
        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* BUTTON */}
        <Pressable
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={COLORS.white}
            />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </Pressable>

        {/* SIGN UP */}
        <Pressable
          onPress={() => router.push('/signup')}
          style={styles.linkWrap}
        >
          <Text style={styles.linkText}>
            Criar uma conta
          </Text>
        </Pressable>
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>
        MVP acadêmico · dados locais
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    padding: SPACING.lg,
  },

  /* =========================
     BRAND
  ========================= */

  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },

  logoFrame: {
    width: 112,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginRight: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  fordLogo: {
    width: '100%',
    height: '100%',
  },

  brandTextBlock: {
    justifyContent: 'center',
  },

  brandKicker: {
    color: COLORS.blueAlt,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 3,
  },

  brandTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },

  /* =========================
     CARD
  ========================= */

  card: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 18,

    padding: 24,

    ...SHADOW.card,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: COLORS.success,
    marginRight: 7,
  },

  statusText: {
    color: COLORS.success,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  eyebrow: {
    color: COLORS.blue,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 18,
  },

  /* =========================
     FORM
  ========================= */

  label: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    backgroundColor: COLORS.surfaceSoft,

    borderWidth: 1,
    borderColor: COLORS.borderStrong,

    borderRadius: 10,

    minHeight: 48,

    paddingHorizontal: 13,

    color: COLORS.text,

    fontSize: 13,
  },

  /* =========================
     ERROR
  ========================= */

  errorBox: {
    marginTop: 10,

    backgroundColor: COLORS.dangerSoft,

    borderWidth: 1,
    borderColor: '#F2CACA',

    borderRadius: 8,

    paddingHorizontal: 11,
    paddingVertical: 9,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: '700',
  },

  /* =========================
     BUTTON
  ========================= */

  button: {
    minHeight: 50,

    backgroundColor: COLORS.blue,

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 20,

    ...SHADOW.card,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },

  /* =========================
     LINK
  ========================= */

  linkWrap: {
    alignItems: 'center',
    paddingTop: 16,
  },

  linkText: {
    color: COLORS.blueDeep,
    fontSize: 11,
    fontWeight: '800',
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 16,
  },
});