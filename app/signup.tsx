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

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter ao menos 6 caracteres.');
      return;
    }

    if (password !== confirm) {
      setErrorMessage('As senhas não conferem.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : DEFAULT_USERS.slice();
      const normalizedEmail = email.trim().toLowerCase();

      if (
        users.some(
          (user: { email: string }) =>
            user.email.toLowerCase() === normalizedEmail
        )
      ) {
        setErrorMessage('Este e-mail já está cadastrado.');
        return;
      }

      const newUser = {
        email: normalizedEmail,
        password,
        role: 'user',
      };

      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify({
          email: normalizedEmail,
          role: 'user',
        })
      );

      router.replace('/');
    } catch (error) {
      setErrorMessage('Não foi possível criar a conta.');
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

        <View>
          <Text style={styles.brandKicker}>FORD INTELLIGENCE</Text>
          <Text style={styles.brandTitle}>Ranger Raptor</Text>
        </View>
      </View>

      {/* SIGNUP CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>NOVO ACESSO</Text>
        </View>

        <Text style={styles.eyebrow}>ACESSO AO SISTEMA</Text>

        <Text style={styles.title}>Criar conta</Text>

        <Text style={styles.subtitle}>
          Cadastre um usuário local para acessar o painel de telemetria e comparação.
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

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirmar senha</Text>

        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={(value) => {
            setConfirm(value);
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
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Criar conta</Text>
          )}
        </Pressable>

        {/* LOGIN */}
        <Pressable
          onPress={() => router.replace('/login')}
          style={styles.linkWrap}
        >
          <Text style={styles.linkText}>Já tenho uma conta</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        MVP acadêmico · autenticação local
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
    marginBottom: 18,
  },

  logoFrame: {
    width: 104,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  fordLogo: {
    width: '100%',
    height: '100%',
  },

  brandKicker: {
    color: COLORS.blueAlt,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },

  brandTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
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
    backgroundColor: COLORS.blueAlt,
    marginRight: 7,
  },

  statusText: {
    color: COLORS.blue,
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
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 16,
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
    backgroundColor: COLORS.blueDeep,
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
    color: COLORS.blue,
    fontSize: 11,
    fontWeight: '800',
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    color: '#AFC4D7',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 16,
  },
});
