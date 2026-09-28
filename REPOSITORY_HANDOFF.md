# Handoff do repositório

## Como aplicar esta base no GitHub

1. Faça um clone limpo do repositório.
2. Copie o conteúdo desta pasta sobre o clone, mantendo a pasta `.git` do clone.
3. Não copie `node_modules`, `.expo`, `android` ou `ios` de instalações anteriores.
4. Confira se `package.json`, `app.json`, `eas.json`, `README.md`, `QUICKSTART.md`, `ARCHITECTURE.md` e `DESIGN_SYSTEM.md` foram sobrescritos.
5. No clone, instale as dependências:

```bash
npm install
```

6. Depois da instalação, teste:

```bash
npx expo start
```

7. Se o teste abrir corretamente, faça o primeiro commit do `package-lock.json` gerado pelo npm.
8. Para criar o APK:

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build -p android --profile preview
```

O perfil `preview` já está configurado para gerar `.apk`.

## Estado da base

- Expo SDK 57
- React Native 0.86.3
- React 19.2.3
- Expo Router 57.0.23
- Sem `@react-navigation/drawer` no código da aplicação
- Sem `react-native-reanimated` / `react-native-worklets` como dependências diretas
- Sem `android/` ou `node_modules/` versionados
- Menu lateral implementado com `Modal` e `expo-router`
