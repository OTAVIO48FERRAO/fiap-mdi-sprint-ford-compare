# Ford Ranger Raptor — Competitor Intelligence

Aplicativo acadêmico em React Native + Expo para monitoramento de telemetria simulada da Ford Ranger Raptor e comparação técnica com um catálogo local de picapes concorrentes.

## O que o projeto entrega

- Dashboard operacional com telemetria simulada da Ranger Raptor.
- Monitoramento detalhado de velocidade, RPM, acelerador, carga do motor, marcha, temperaturas, turbo e consumo.
- Comparação técnica entre a Ranger Raptor e veículos do catálogo local.
- Busca por marca, modelo e versão, com validação e mensagens para catálogo sem resultado.
- Menu lateral com acesso ao Dashboard, Monitoramento, Comparação, ficha técnica, Relatório e Sobre.
- Ficha técnica consolidada da Ranger Raptor.
- Relatório técnico com leitura da telemetria atual.
- Persistência local da última comparação usando AsyncStorage.
- Interface corporativa limpa, responsiva e sem dependência de backend/API em runtime.

## Stack e versões

O projeto foi reorganizado em uma base consistente para **Expo SDK 57**, com **React Native 0.86** e **React 19.2**. O SDK 57 é a versão estável considerada neste projeto; o SDK 58 está em beta, por isso não é usado aqui. [Expo SDK 57 changelog](https://expo.dev/changelog/sdk-57)

| Tecnologia | Versão |
|---|---|
| Expo | `~57.0.23` |
| React Native | `0.86.3` |
| React | `19.2.3` |
| Expo Router | `~57.0.23` |
| TypeScript | `~6.0.3` |
| AsyncStorage | `2.2.0` |
| Node.js mínimo | `22.13.0` |

O SDK 57 usa React Native 0.86 e React 19.2; a documentação atual também recomenda Node.js 22.13 ou superior. [referência oficial de versões do Expo](https://docs.expo.dev/versions/latest/)

## Pré-requisitos

- Node.js `22.13+`
- npm
- Conta Expo/EAS
- Expo Go para testes rápidos no celular
- Android Studio somente para desenvolvimento nativo/emulador

## Instalação do zero

Após clonar o repositório:

```bash
cd fiap-mdi-sprint-ford-compare
npm install
```

Depois que a instalação terminar, o `package-lock.json` será criado. **Comite esse arquivo** junto com o restante do projeto para que as instalações futuras fiquem reproduzíveis.

Não copie `node_modules`, `.expo`, `android` ou `ios` de outra máquina. O repositório é preparado para gerar esses artefatos localmente quando necessário.

## Rodar no Expo Go

```bash
npx expo start
```

Abra o Expo Go no Android e leia o QR Code. Para o primeiro uso da conta, faça login no Expo Go. O computador e o celular normalmente devem estar na mesma rede Wi-Fi.

Para limpar o cache do Metro:

```bash
npx expo start --clear
```

## Rodar no Android Studio / emulador

Depois de instalar as dependências:

```bash
npx expo prebuild
npx expo run:android
```

O diretório `android/` é gerado pelo Expo e não precisa ser versionado para este projeto.

## Gerar APK

O perfil `preview` do `eas.json` está configurado para gerar **`.apk`** em distribuição interna. O EAS usa `android.buildType: "apk"` para gerar um arquivo instalável diretamente em dispositivos e emuladores. [documentação oficial de APK com EAS](https://docs.expo.dev/build-reference/apk/)

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

Se o projeto ainda não estiver vinculado ao EAS:

```bash
npx eas-cli@latest init
npx eas-cli@latest build -p android --profile preview
```

Quando o build terminar, o EAS mostrará o link do APK.

## Estrutura

```text
app/
├── _layout.tsx       # Layout raiz, autenticação local e providers
├── index.tsx         # Dashboard
├── monitoring.tsx    # Telemetria detalhada
├── comparison.tsx   # Comparação técnica
├── details.tsx       # Ficha técnica da Raptor
├── report.tsx        # Relatório técnico
├── about.tsx         # Sobre o projeto
├── login.tsx         # Login local
└── signup.tsx        # Cadastro local

components/
├── ComparisonTable.tsx
├── SideMenu.tsx
└── TelemetryCard.tsx

context/
└── ComparisonContext.tsx

mock/
├── fordData.ts
├── aiResponseData.ts  # nome legado; catálogo local, sem IA externa
└── users.ts

constants/
└── theme.ts

types/
└── index.ts

utils/
└── dataFormatter.ts
```

## Dados e arquitetura

A aplicação é **local-first**. Os dados técnicos da Ranger Raptor e dos concorrentes ficam em `mock/`, e a telemetria é gerada por uma simulação a cada 1,5 segundo.

O arquivo `mock/aiResponseData.ts` mantém o nome legado do MVP antigo, mas hoje não faz chamada de IA, API da Ford ou serviço externo. Ele funciona como catálogo técnico local e fornece as funções de busca usadas pela tela de comparação.

A última comparação é salva em `AsyncStorage` pela `ComparisonContext`.

## Catálogo atual

O catálogo contém veículos médios e algumas referências full-size usadas como parâmetro de comparação. Os dados documentados no código incluem, entre outros:

- Ford Ranger Raptor
- Toyota Hilux SRX Plus
- Chevrolet S10 Trail Boss
- Volkswagen Amarok V6
- Nissan Frontier PRO-4X
- Mitsubishi Triton Katana
- RAM 1500 / RAM 2500 como referências full-size

Os campos técnicos que não existem oficialmente para a Ranger Raptor não são inventados na tabela de comparação.

## Telemetria simulada

A dashboard e a tela de Monitoramento usam uma função determinística em termos de limites, mas com pequenas variações aleatórias para simular atividade do veículo. A simulação mantém coerência entre velocidade, marcha, RPM, carga, turbo, temperatura e consumo.

## Design

A interface segue um sistema corporativo baseado em:

- navy/preto para cabeçalhos e navegação;
- branco e cinzas claros para superfícies;
- azul Ford-inspired para ações;
- verde, âmbar e vermelho somente para estados;
- cards com bordas discretas, sombras leves e cantos arredondados.

O projeto também desabilita seleção de texto e cursor de seleção no Expo Web, preservando o comportamento normal dos `TextInput`.

## Checklist de validação

- [ ] `npm install` termina sem `ERESOLVE`.
- [ ] `npm ls expo react-native react expo-router` mostra a família do SDK 57.
- [ ] `npx expo start` abre no Expo Go.
- [ ] Login e cadastro funcionam com dados locais.
- [ ] Dashboard mostra telemetria e atualiza automaticamente.
- [ ] Menu lateral abre e navega entre as telas.
- [ ] Comparação carrega a tabela sem depender de API externa.
- [ ] `npx expo prebuild` gera o projeto Android.
- [ ] `eas build -p android --profile preview` gera um `.apk`.

## Solução de problemas

### `npm install` retorna `ERESOLVE`

Apague `node_modules` e o `package-lock.json` da máquina e rode novamente:

```bash
npm install
```

Não misture arquivos de `node_modules` de versões diferentes e não use `npm audit fix --force` como etapa de instalação.

### Expo Go mostra versão incompatível

O Expo Go precisa ser compatível com o SDK usado pelo projeto. O projeto alvo é Expo SDK 57.

### Android reclama de page size de 16 KB

O projeto foi atualizado para React Native 0.86 / Expo SDK 57 justamente para sair da família antiga do RN 0.74. Se ainda aparecer um APK antigo, remova o build instalado do dispositivo e gere um novo a partir desta base.

## Equipe

- Gustavo Viega Martins Lopes — RM555885
- Gustavo Yuji Osugi — RM555034
- Kaio Drago Lima Souza — RM556095
- Otávio Santos de Lima Ferrão
- Vitor Rivas Cardoso — RM556404

## Licença / uso acadêmico

Projeto desenvolvido para entrega acadêmica. Dados de veículos são usados para fins demonstrativos e não substituem fichas técnicas oficiais das fabricantes.
