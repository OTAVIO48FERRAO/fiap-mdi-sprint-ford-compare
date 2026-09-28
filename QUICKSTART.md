# Guia rápido

## 1. Instalar

Requisitos: Node.js 22.13+ e npm.

```bash
npm install
```

## 2. Abrir no Expo Go

```bash
npx expo start
```

Abra o Expo Go, faça login e leia o QR Code.

## 3. Android Studio

```bash
npx expo prebuild
npx expo run:android
```

## 4. APK

```bash
eas build -p android --profile preview
```

O perfil `preview` gera um `.apk` para distribuição interna.

## 5. Limpar cache

```bash
npx expo start --clear
```

## Regras para evitar o problema anterior

- não copie `node_modules` entre projetos;
- não copie `android/` de um clone antigo;
- não rode `npm audit fix --force` durante a instalação;
- mantenha o `package.json` deste projeto como fonte das versões;
- após clonar, use apenas `npm install`.
