import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_USERS } from '../mock/users';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Insira um email válido.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'Senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Erro', 'Senhas não conferem.');
      return;
    }
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : DEFAULT_USERS.slice();

      const exists = users.find((u: any) => u.email === email);
      if (exists) {
        Alert.alert('Erro', 'Email já cadastrado. Faça login.');
        setLoading(false);
        return;
      }

      const newUser = { email, password, role: 'user' };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('currentUser', JSON.stringify({ email, role: 'user' }));

      Alert.alert('Sucesso', 'Conta criada com sucesso. Autenticado.');
      setLoading(false);
      router.replace('/');
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao criar conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="seu@exemplo.com"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#999"
      />

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Criando...' : 'CRIAR CONTA'}</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/login')} style={styles.linkWrap}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
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
});
