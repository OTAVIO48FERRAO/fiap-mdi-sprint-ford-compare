import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_USERS } from '../mock/users';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      setErrorMessage('Email inválido.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Senha deve ter ao menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : DEFAULT_USERS;

      const found = users.find((u: any) => u.email === email && u.password === password);
      if (!found) {
        setErrorMessage('Email ou senha incorretos.');
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('currentUser', JSON.stringify({ email: found.email, role: found.role || 'user' }));
      setTimeout(() => {
        setLoading(false);
        router.replace('/');
      }, 400);
    } catch (err) {
      setLoading(false);
      setErrorMessage('Falha ao realizar login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(t) => { setEmail(t); setErrorMessage(''); }}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="seu@exemplo.com"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(t) => { setPassword(t); setErrorMessage(''); }}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#999"
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'ENTRAR'}</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/signup')} style={styles.linkWrap}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 24,
    letterSpacing: 2
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
    marginTop: 12,
    marginBottom: 6
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    color: '#000000'
  },
  button: {
    backgroundColor: '#007BFF',
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1.2
  },
  disabled: {
    opacity: 0.6
  },
  linkWrap: {
    marginTop: 16,
    alignItems: 'center'
  },
  linkText: {
    color: '#8B5CF6',
    fontWeight: '700'
  }
  ,
  errorText: {
    color: '#8B5CF6',
    marginTop: 12,
    fontWeight: '700'
  }
});
