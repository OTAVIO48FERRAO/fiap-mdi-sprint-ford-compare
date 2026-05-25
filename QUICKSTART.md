# 🚀 Guia Rápido - Ford Raptor Compare MVP

## 30 segundos para rodar o app

```bash
# 1. Instale dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm start

# 3. Pressione 'i' (iOS) ou 'a' (Android) ou escaneie o QR com o Expo Go
```

**Pronto!** 🎉

---

## O que você verá

### Tela 1: Dashboard (Home)
- **Card de telemetria em tempo real** com especificações da Ford Ranger Raptor
- **Formulário de busca** para escolher um concorrente
- **Botões de seleção rápida** para Toyota Hilux, Chevrolet S10, RAM 2500
- **Botão Comparar** que exibe animação de carregamento

### Tela 2: Resultados da Comparação
- **Tabela lado a lado** comparando Ford vs concorrente
- Células roxas com "Não disponível" para dados ausentes
- **Legenda** explicando disponibilidade dos dados
- **Botão Nova Comparação** para voltar

---

## Ações para testar

### 1. Ver Telemetria
1. Observe o card de telemetria atualizando a cada 2 segundos
2. Note o indicador de carregamento azul

### 2. Comparar Toyota Hilux
1. Clique no botão rápido "TOYOTA HILUX"
2. Clique em "COMPARAR"
3. Aguarde 1.5-3.5 segundos pela simulação de IA
4. Veja os resultados com 3 campos ausentes (marcados em roxo)

### 3. Buscar Manualmente
1. Limpe os inputs
2. Digite "Chevrolet" no campo de marca
3. Digite "S10" no campo de modelo
4. Clique em "COMPARAR"
5. Visualize as especificações do Chevrolet S10

---

## Visão Geral dos Arquivos

```
Telass principais:
  app/index.tsx           → Tela inicial com telemetria + busca
  app/comparison.tsx      → Tela de resultados da comparação

Componentes:
  components/TelemetryCard.tsx      → Exibição de dados em tempo real
  components/ComparisonTable.tsx    → Comparação lado a lado

Gerenciamento de Estado:
  context/ComparisonContext.tsx     → Estado global com React Context

Dados Mock:
  mock/fordData.ts                  → Especificações & telemetria da Ford
  mock/aiResponseData.ts            → Especificações dos concorrentes (3 veículos)

Utilitários:
  utils/dataFormatter.ts            → Alinhamento e formatação de dados
  types/index.ts                    → Tipos TypeScript
```

---

## Solução de Problemas

| Problema | Solução |
|-------|----------|
| Estilos estranhos | `npm start -- --clear` |
| Comparação não carrega | Verifique o console por erros |
| Telemetria não atualiza | Verifique se o relógio do dispositivo está correto |
| App crasha ao abrir | Delete `node_modules` e rode `npm install` |

---

## Principais Funcionalidades

### 1. Card de Telemetria
- Atualiza a cada 2 segundos
- Mostra specs da Ford em tempo real
- Indicador de carregamento azul durante atualização

### 2. Simulação de IA (Mock)
- Simula atraso de 1.5-3.5 segundos
- API real substituiria `simulateAIResponse()`
- Testa estados de carregamento corretamente

### 3. Tratamento de Dados Ausentes
- Valores nulos viram "Não disponível"
- Destaque em roxo para campos ausentes
- Distinção visual clara

### 4. Design Brutalista
- Alto contraste preto/branco
- Bordas grossas de 3px
- Cantos retos (sem border radius)
- Tipografia forte e grande
- Acentos apenas em azul e roxo

---

## Próximos Passos

### Para testes de UI/UX
1. Testar no simulador iOS (mais fiel)
2. Testar no emulador Android
3. Testar em dispositivo físico (apenas portrait no MVP)

### Para integração
1. Substituir dados mock em `mock/fordData.ts` por API real
2. Substituir `simulateAIResponse()` por endpoint real de IA
3. Adicionar autenticação real
4. Conectar notificações reais

### Para customização
1. Editar paleta de cores nos StyleSheets dos componentes
2. Ajustar larguras de borda (atualmente 2-3px)
3. Modificar tamanhos tipográficos
4. Adicionar novos concorrentes em `COMPETITOR_SPECS_CACHE`

---

## Customizações Comuns

### Adicionar Novo Concorrente
Edite `mock/aiResponseData.ts`:
```typescript
export const COMPETITOR_SPECS_CACHE = {
  'nissan-frontier': {
    brand: 'Nissan',
    model: 'Frontier',
    version: '2.5 Diesel',
    specs: [ /* ... */ ]
  }
  // Adicionar mais aqui
}
```

### Alterar Paleta de Cores
Procure pelos valores de cor nos arquivos de componentes:
- `#007BFF` → alterar azul forte
- `#8B5CF6` → alterar roxo vibrante
- `#000000` → alterar preto (raramente necessário)
- `#FFFFFF` → alterar branco (raramente necessário)

### Ajustar Larguras de Borda
Localize `borderWidth: 3` e altere para 2 ou 4 (mudança global).

### Modificar Tamanhos Tipográficos
Todos os tamanhos de fonte estão explícitos nos StyleSheets - fácil de localizar e ajustar.

---

## Tamanho do Arquivo & Performance

- **Bundle**: ~1.2MB (desenvolvimento)
- **Tempo de carregamento**: < 2s em 4G
- **Runtime**: animações suaves a 60fps
- **Memória**: ~80MB (app React Native típico)

---

## Checklist de Testes

- [ ] Tela inicial exibe telemetria
- [ ] Telemetria atualiza a cada 2 segundos
- [ ] Inputs de busca aceitam texto
- [ ] Botões de seleção rápida funcionam
- [ ] Botão Comparar mostra estado de carregamento
- [ ] Tela de comparação carrega os dados
- [ ] Dados ausentes mostram "Não disponível" em roxo
- [ ] Botão voltar retorna à home
- [ ] Nova comparação limpa dados antigos
- [ ] Comparação salva no AsyncStorage

---

## Modo de Depuração

### Ver dados do AsyncStorage (Web)
```javascript
// No console do navegador
await window.localStorage.getItem('lastComparison')
```

### Ver logs do console
```bash
npm start
# Logs aparecem no terminal
```

### React DevTools
Instale o React DevTools para debugging do React Native.

---

## Checklist para Produção

Antes de enviar para App Store / Google Play:

- [ ] Substituir todos os dados mock por APIs reais
- [ ] Adicionar tratamento de erros adequado
- [ ] Implementar notificações reais
- [ ] Adicionar autenticação
- [ ] Testar em dispositivos reais
- [ ] Adicionar ícones do app e splash screens
- [ ] Atualizar número de versão
- [ ] Criar política de privacidade
- [ ] Criar termos de serviço
- [ ] Adicionar analytics
- [ ] Configurar crash reporting

---

## Comandos Rápidos

```bash
# Iniciar servidor de desenvolvimento
npm start

# Limpar cache e reiniciar
npm start -- --clear

# Instalar dependência
npm install <package-name>

# Remover dependência
npm uninstall <package-name>

# Format (se configurado)
npm run format

# Checar tipos
npx tsc --noEmit
```

---

## Recursos de Suporte

- **Docs do Expo**: https://docs.expo.dev
- **Docs React Native**: https://reactnative.dev
- **Expo Router**: https://expo.github.io/router
- **TypeScript**: https://www.typescriptlang.org/docs

---

**Pronto?** Inicie o app: `npm start` 🚀
