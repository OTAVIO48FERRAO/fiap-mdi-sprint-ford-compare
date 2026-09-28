# Arquitetura — Ford Raptor Compare

## Visão geral

Aplicação Expo/React Native com roteamento baseado em arquivos (`expo-router`) e dados locais.

```text
app/                    rotas e telas
components/             UI reutilizável
context/                estado global
mock/                   catálogo técnico + telemetria simulada
constants/              tokens visuais
types/                  contratos TypeScript
utils/                  formatação/alinhamento
```

## Fluxo principal

```text
Login
  ↓
Dashboard
  ├── Telemetria ao vivo
  ├── Busca de concorrente
  └── Menu lateral
        ├── Monitoramento
        ├── Comparação
        ├── Ranger Raptor
        ├── Relatório
        └── Sobre
```

## Dados

`mock/fordData.ts` mantém os dados da Ranger Raptor e a função de atualização da telemetria.

`mock/aiResponseData.ts` é um nome legado: hoje ele é apenas o catálogo local de concorrentes e suas funções de lookup.

## Estado

`ComparisonContext` guarda a comparação corrente, estado de carregamento, erro e persiste a última comparação em AsyncStorage.

## Navegação

As telas usam `expo-router` diretamente. O menu lateral é implementado com `Modal` + `Pressable`, sem `@react-navigation/drawer`.

## Android / build

O projeto não versiona `android/` nem `node_modules/`. Esses artefatos são gerados localmente pelo Expo e pelo EAS. O perfil `preview` do `eas.json` produz um APK instalável.
