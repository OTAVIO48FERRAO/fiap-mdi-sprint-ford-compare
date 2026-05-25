Gustavo Viega MArtins Lopes RM555885
Gustavo Yuji Osugi RM555034
Kaio Drago Lima Souza RM556095
Otávio Santos de Lima Ferrão
Vitor Rivas Cardoso RM556404

 
 
 
 
 # Ford Ranger Raptor Competitor Intelligence MVP

## 📋 Visão Geral do Projeto

Aplicativo móvel cross-platform (iOS/Android) feito com React Native + Expo para comparar as especificações da Ford Ranger Raptor 3.0 V6 contra veículos concorrentes usando dados gerados por IA (simulados).

**Principais funcionalidades:**
- Dashboard de telemetria em tempo real para a Ford Ranger Raptor
- Busca por veículo concorrente e comparação de especificações
- Simulação de processamento de dados por IA (mock)
- UI Brutalista com alto contraste e tipografia marcante
- Armazenamento local do histórico de comparações
- TypeScript para segurança de tipos

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ e npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Simulador iOS (Mac) ou Emulador Android
- Ou app Expo Go em dispositivo físico

### Instalação

```bash
# 1. Clone ou navegue até o diretório do projeto
cd ford-raptor-compare

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Inicie o servidor de desenvolvimento
npm start
# ou
yarn start

# 4. Pressione:
# - 'i' para simulador iOS
# - 'a' para emulador Android
# - 'w' para web (suporte limitado ao estilo Brutalist)
# - Ou escaneie o QR code com o app Expo Go
```

---

## 📁 Estrutura do Projeto

```
ford-raptor-compare/
├── app/                          # Páginas do Expo Router
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── index.tsx                # Tela Home/Dashboard
│   └── comparison.tsx           # Tela de resultados da comparação
├── components/                   # Componentes reutilizáveis
│   ├── TelemetryCard.tsx        # Exibição de telemetria em tempo real
│   └── ComparisonTable.tsx      # Tabela de comparação lado a lado
├── context/                      # Gerenciamento de estado com React Context
│   └── ComparisonContext.tsx    # Estado global de comparação
├── mock/                         # Dados mock e simulação de API
│   ├── fordData.ts              # Especificações & telemetria da Ford
│   └── aiResponseData.ts        # Especificações dos concorrentes (Toyota, Chevrolet, RAM)
├── types/                        # Interfaces TypeScript
│   └── index.ts                 # Definições de tipos
├── utils/                        # Funções utilitárias
│   └── dataFormatter.ts         # Formatação & lógica de comparação
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
```

---

## 🎨 Design System: Brutalismo

### Paleta de cores
- **Preto Primário**: `#000000` - Fundos, bordas
- **Branco Primário**: `#FFFFFF` - Texto, contêineres
- **Azul Forte**: `#007BFF` - Ações primárias, acentos
- **Roxo Vibrante**: `#8B5CF6` - Ações secundárias, avisos

### Tipografia
- **Cabeçalhos**: 24-36px, peso 900, letter-spacing 1-2px
- **Labels**: 12-14px, peso 700, letter-spacing 0.5-1px
- **Corpo**: 11-14px, peso 500-600

### Características
- **Bordas**: 2-3px sólidas pretas
- **Border Radius**: 0 (cantos retos)
- **Alto Contraste**: preto em branco, branco em preto
- **Espaçamento**: uso marcante de espaço negativo, padding mínimo
- **Estética crua**: sem gradientes, sombras suaves ou blur

---

## 🔄 Fluxo da Aplicação

### 1. Tela Home (`app/index.tsx`)
- **Card de Telemetria**: mostra specs da Ford Ranger Raptor (atualiza a cada 2s)
- **Formulário de Busca**: campos para marca, modelo e versão do concorrente
- **Seleção Rápida**: botões para concorrentes disponíveis (Toyota Hilux, Chevrolet S10, RAM 2500)
- **Botão Comparar**: dispara a simulação de IA e navega para resultados

### 2. Tela de Comparação (`app/comparison.tsx`)
- **Tabela de Comparação**: Ford vs Concorrente lado a lado
- **Tratamento de Dados Ausentes**: campos null/undefined mostram "Não disponível" em roxo
- **Legenda**: guia visual para dados disponíveis/indisponíveis
- **Nova Comparação**: botão para retornar à tela inicial

---

## 📊 Estrutura dos Dados Mock

### Ford Ranger Raptor (Fonte: Especificações Oficiais)
```typescript
{
  brand: 'Ford',
  model: 'Ranger Raptor',
  version: '3.0 V6 EcoBoost',
  specs: [
    { atributo: 'Potência Máxima (hp)', valor: 290 },
    { atributo: 'Torque Máximo (Nm)', valor: 500 },
    // ... mais 18 atributos
  ]
}
```

### Dados do Concorrente (Simulação de IA)
```typescript
{
  brand: 'Toyota',
  model: 'Hilux',
  version: '2.8 Diesel',
  specs: [
    { atributo: 'Potência Máxima (hp)', valor: 204 },
    { atributo: 'Velocidade Máxima (km/h)', valor: null }, // Dados faltantes
    // ... mais atributos
  ]
}
```

### Concorrentes Disponíveis
- **Toyota Hilux** (2.8 Diesel) - 3 campos ausentes
- **Chevrolet S10** (2.5 Diesel) - 2 campos ausentes
- **RAM 2500** (6.7 Cummins Diesel) - 2 campos ausentes

---

## 🧪 Testando o MVP

### Cenário 1: Comparação básica
1. Abra o app
2. Observe as atualizações de telemetria a cada 2 segundos
3. Clique em "TOYOTA HILUX" para auto-preencher
4. Clique em "COMPARAR"
5. Aguarde a simulação de IA (1.5-3.5s)
6. Veja os resultados com dados ausentes destacados

### Cenário 2: Busca customizada
1. Digite marca: "chevrolet"
2. Digite modelo: "s10"
3. Clique em "COMPARAR"
4. Verifique se a tabela exibe ambos os veículos

### Cenário 3: Tratamento de dados ausentes
1. Procure células roxas com "Não disponível"
2. Verifique se a legenda explica o significado
3. Confirme que os dados foram salvos no AsyncStorage (ver DevTools do navegador)

---

## 💾 Gerenciamento de Estado (Context API)

### ComparisonContext
Gerencia o estado global das operações de comparação:

```typescript
interface ComparisonContextType {
  comparison: ComparisonResult | null;        // Dados de comparação atuais
  setComparison: (comparison: ComparisonResult) => void; // Atualiza comparação
  isLoading: boolean;                         // Estado de carregamento
  setIsLoading: (loading: boolean) => void;  // Atualiza estado de carregamento
  error: string | null;                       // Mensagens de erro
  setError: (error: string | null) => void;  // Atualiza erro
  clearComparison: () => void;                // Limpa todo o estado
}
```

### Integração com AsyncStorage
- Chave: `lastComparison`
- Armazena o objeto completo de comparação como JSON
- Carregado na inicialização do app (para recurso de "carregar última comparação")

---

## 🔌 Simulação de API (Mock)

### Ford Connect API (Mock)
Retorna as especificações oficiais da Ford Ranger Raptor instantaneamente.

```typescript
// mock/fordData.ts
export const FORD_RANGER_RAPTOR_SPECS: VehicleComparison = { ... }
```

### Modelo Híbrido de IA (Mock)
Simula uma chamada de API com atraso de 1.5-3.5 segundos:

```typescript
// mock/aiResponseData.ts
export const simulateAIResponse = async (brand: string, model: string) => {
  // Retorna especificações do concorrente após atraso
}
```

---

## 📱 Notas por Plataforma

### iOS
- Suporte completo ao estilo Brutalist
- Respeita Safe Area com SafeAreaView
- Atualizações de telemetria suaves via ActivityIndicator

### Android
- Compatível com React Native 0.74+
- Estilização de bordas renderiza corretamente
- Tipografia compatível com iOS

### Web (Suporte limitado)
- Design brutalista visível, mas com variações de estilo
- Melhor experiência em simuladores móveis

---

## 🛠️ Melhorias Futuras (Além do MVP)

1. **Integração com API real**
   - Substituir dados mock pela API Ford Connect
   - Integrar modelo real de IA para dados de concorrentes
   - Adicionar autenticação e chaves de API

2. **Funcionalidades Avançadas**
   - Exportar comparação em PDF
   - Comparação multi-concorrente (3+ veículos)
   - Histórico e tendências de specs
   - Favoritos/Bookmarks
   - Exportar para CSV

3. **Melhorias de UI/UX**
   - Modo escuro (dark mode)
   - Variantes customizáveis do tema brutalista
   - Interações gestuais
   - Refinamentos de animação

4. **Integração de Backend**
   - Armazenamento em nuvem do histórico
   - Contas de usuário e perfis
   - Sincronização de dados em tempo real
   - Analytics e tracking

5. **Notificações**
   - Push para conclusão do processamento de IA
   - Alertas de preço para concorrentes
   - Avisos de novos modelos

---

## 📦 Dependências

```json
{
  "expo": "~51.0.0",
  "expo-router": "~3.5.0",
  "expo-notifications": "~0.27.0",
  "expo-constants": "~15.4.0",
  "expo-async-storage": "~1.1.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "react-native-screens": "~3.31.0",
  "react-native-safe-area-context": "4.10.1",
  "react-native-gesture-handler": "~2.14.0"
}
```

---

## 🐛 Solução de Problemas

### Problema: Estilos não aplicando
**Solução**: Limpar cache e rebuild
```bash
npm start -- --clear
```

### Problema: AsyncStorage não persistindo
**Solução**: Não limpar o app entre execuções de desenvolvimento
- Evite desinstalar o app durante o desenvolvimento

### Problema: Atualizações de telemetria não visíveis
**Solução**: Verifique se a hora do dispositivo não está congelada
- O tempo do sistema do dispositivo deve estar correto para timestamps

### Problema: Comparação não carrega
**Solução**: Verifique o console por erros
```bash
# Ver logs
npm start -- --clear
```

---

## 📝 Licença

Construído para Ford Challenge - Fase MVP 1

---

## 👨‍💻 Notas Técnicas para Desenvolvedores

### Modo TypeScript Strict
Todos os componentes e utilitários usam TypeScript em modo `strict` para segurança de tipos.

### Filosofia de Gerenciamento de Estado
- Context API para estado global (resultados de comparação)
- State de componente para preocupações apenas de UI (inputs)
- AsyncStorage como camada de persistência

### Considerações de Performance
- Atualizações de telemetria limitadas a 2s
- Tabela de comparação usa scroll similar ao FlatList
- Atrasos mock simulam latência real de API (1.5-3.5s)

### Estilo de Código
- camelCase para funções e variáveis
- PascalCase para componentes React
- SCREAMING_SNAKE_CASE para constantes
- Comentários JSDoc para APIs públicas

---

## 🚢 Deploy

### Build para produção (requer EAS)
```bash
# Configurar EAS
eas init

# Build para iOS
eas build --platform ios

# Build para Android
eas build --platform android

# Submeter para App Store (iOS)
eas submit --platform ios

# Submeter para Google Play (Android)
eas submit --platform android
```

---

**Perguntas?** Revise os comentários no código ou abra uma issue no repositório.
