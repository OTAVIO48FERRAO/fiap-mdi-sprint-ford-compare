# Sistema de Design Brutalista - Ford Raptor Compare

## Visão Geral

Esta aplicação implementa a filosofia de design **Brutalista**, enfatizando estética crua, alto contraste, tipografia bold e formas geométricas nítidas.

---

## Princípios Centrais

### 1. **Alto Contraste**
- Contraste máximo entre primeiro plano e plano de fundo
- Preto (`#000000`) sobre Branco (`#FFFFFF`)
- Texto branco sobre fundos pretos
- Evitar tons de cinza suaves ou transições sutis de cor

### 2. **Bordas Pesadas**
- Largura mínima de borda: **2px**
- Largura padrão: **3px** para elementos primários
- Linhas sempre sólidas, nunca tracejadas
- Cantos sempre retos (borderRadius: 0)

### 3. **Tipografia Forte**
- Cabeçalhos: 24-36px, peso 900, letter-spacing 1-2px
- Títulos de seção: 20px, peso 900, letter-spacing 1.5px
- Labels: 12-14px, peso 700, letter-spacing 0.5-1px
- Texto do corpo: 12px, peso 500-600

### 4. **Estética Enxuta**
- Sem gradientes
- Sem efeitos de blur
- Sem sombras (drop shadows)
- Sem cantos arredondados
- Elementos decorativos mínimos
- Design cru e funcional

### 5. **Cores de Acento Estratégicas**
- **Azul Forte** (`#007BFF`): CTAs primários, ênfase
- **Roxo Vibrante** (`#8B5CF6`): Ações secundárias, avisos, dados ausentes

---

## Paleta de Cores

```
PRINCIPAL
├── Preto (#000000)      → Fundos, bordas, texto
└── Branco (#FFFFFF)     → Texto, fundos de contêiner

ACENTOS
├── Azul Forte (#007BFF)  → Botões primários, links, destaques
└── Roxo Vibrante (#8B5CF6) → Ações secundárias, avisos

CINZAS (para hierarquia sutil)
├── Cinza Claro (#F5F5F5)  → Fundos sutis
├── Cinza Médio (#999999)  → Texto secundário
└── Cinza Escuro (#333333) → Texto do corpo
```

### Exemplos de Uso

```typescript
// Botão de ação primário
backgroundColor: '#007BFF'
color: '#FFFFFF'
borderColor: '#000000'
borderWidth: 3

// Célula de aviso/dados ausentes
backgroundColor: '#FFE5E5'
borderColor: '#8B5CF6'

// Divisores de seção
backgroundColor: '#000000'
height: 3
```

---

## Escala Tipográfica

### Heading 1 (H1)
- Tamanho: 36px
- Peso: 900
- Letter-spacing: 2px
- Uso: título principal do app, cabeçalhos de página

### Heading 2 (H2)
- Tamanho: 28px
- Peso: 900
- Letter-spacing: 1.5px
- Uso: títulos de seção, cabeçalhos de tela

### Heading 3 (H3)
- Tamanho: 20px
- Peso: 900
- Letter-spacing: 1.5px
- Uso: subtítulos

### Label
- Tamanho: 12-14px
- Peso: 700
- Letter-spacing: 0.5-1px
- Uso: labels de formulário, cabeçalhos de tabela

### Body
- Tamanho: 12-13px
- Peso: 500-600
- Letter-spacing: 0.3-0.5px
- Uso: texto de corpo, descrições

### Caption
- Tamanho: 11px
- Peso: 600
- Letter-spacing: 0.3px
- Uso: rodapés, timestamps

---

## Sistema de Espaçamento

Todo espaçamento usa múltiplos de 4px (inspirado no Tailwind):

```
Padding/Margin vertical:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px

Padding/Margin horizontal:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 15px (ajuste especial para layout de colunas)
- xl: 20px
- 2xl: 24px
```

---

## Sistema de Bordas

### Larguras de Borda
```typescript
// Divisores finos
borderWidth: 2

// Contêineres e cards padrão
borderWidth: 3

// Estados de ênfase/hover
borderWidth: 3 (com mudança de cor)
```

### Cores de Borda
```typescript
// Padrão
borderColor: '#000000'

// Acento (elementos secundários)
borderColor: '#8B5CF6'

// Sutil (divisores de fundo)
borderColor: '#CCCCCC'
```

---

## Padrões de Estilização de Componentes

### Cards/Contêineres
```typescript
{
  backgroundColor: '#FFFFFF',
  borderWidth: 3,
  borderColor: '#000000',
  paddingVertical: 16,
  paddingHorizontal: 15,
  overflow: 'hidden'
}
```

### Botão Primário
```typescript
{
  backgroundColor: '#007BFF',
  borderWidth: 3,
  borderColor: '#000000',
  paddingVertical: 14,
  paddingHorizontal: 24,
  alignItems: 'center',
  justifyContent: 'center'
}
```

### Botão Secundário
```typescript
{
  backgroundColor: '#8B5CF6',
  borderWidth: 3,
  borderColor: '#000000',
  paddingVertical: 12,
  paddingHorizontal: 20
}
```

### Campo de Input
```typescript
{
  borderWidth: 2,
  borderColor: '#000000',
  paddingVertical: 12,
  paddingHorizontal: 12,
  backgroundColor: '#F9F9F9',
  color: '#000000'
}
```

### Célula de Aviso (Dados Ausentes)
```typescript
{
  backgroundColor: '#FFE5E5',
  borderColor: '#8B5CF6',
  borderLeftWidth: 3
}
```

### Cabeçalho de Seção
```typescript
{
  backgroundColor: '#000000',
  paddingVertical: 20,
  paddingHorizontal: 15,
  borderBottomWidth: 3,
  borderBottomColor: '#000000'
}
```

---

## Padrões de Layout

### Contêiner Full-Width
```typescript
{
  marginHorizontal: 15,
  marginVertical: 15,
  borderWidth: 3,
  borderColor: '#000000'
}
```

### Caixa de Informação
```typescript
{
  paddingVertical: 20,
  paddingHorizontal: 15,
  marginHorizontal: 15,
  marginVertical: 15,
  borderWidth: 2,
  borderColor: '#8B5CF6',
  backgroundColor: '#F9F3FF' // Roxo claro
}
```

### Tabela de Comparação
```
┌─────────────────────────────────────┐
│         COMPARAÇÃO TÉCNICA          │ ← Cabeçalho preto (borda 3px)
├─────────────┬───────────┬───────────┤
│    Ford     │  Concorrente│          │ ← Títulos dos veículos
├─────────────┼───────────┼───────────┤
│ Atributo    │  Valor    │  Valor    │ ← Linhas de dados (bordas 2px)
├─────────────┼───────────┼───────────┤
│             │           │           │
└─────────────┴───────────┴───────────┘
```

---

## Combinações de Cores

### Pares de Cores Aprovados
```
✅ Texto preto em fundo branco
✅ Texto branco em fundo preto
✅ Texto azul em fundo branco
✅ Texto roxo em fundo roxo claro (#F9F3FF)
✅ Texto roxo em fundo rosa (#FFE5E5)
✅ Texto branco em fundo azul
✅ Texto branco em fundo roxo

❌ Evitar cinzas suaves sobre branco
❌ Evitar combinações com opacidade
❌ Evitar múltiplas cores de destaque no mesmo componente
```

---

## Notas de Design Responsivo

### Abordagem Mobile-First
- Base: 375px de largura (iPhone SE)
- Ajustar margens: 15px horizontal em phones, 20px em tablets
- Layouts em colunas empilham verticalmente em phones
- Layouts de duas colunas funcionam em tablets (600px+)

### Escalonamento de Fonte
- Cabeçalhos: reduzir 2-4px em telas menores
- Corpo: manter mínimo de 12px para legibilidade
- Usar `Dimensions.get('window')` para cálculos responsivos

### Ajustes de Borda
- Manter bordas mínimas de 2px mesmo em telas pequenas
- Manter 3px em elementos primários
- Não reduzir abaixo de 2px para visibilidade

---

## Considerações para Dark Mode

Este design Brutalista é focado em modo claro. Para dark mode futuro:
- Inverter cores: fundos brancos → fundos pretos
- Manter mesmas larguras de borda e princípios de contraste
- Usar `#1A1A1A` em vez de preto absoluto para fundos escuros
- Manter altas razões de contraste (mínimo WCAG AA: 4.5:1)

---

## Diretrizes de Animação

### Animações Permitidas
- Indicadores de carregamento (ActivityIndicator com acento azul)
- Transições de tela (fade, slide)
- Feedback de pressão de botão (mudança de opacidade)

### Animações Proibidas
- Animações em gradiente
- Transições com blur
- Animações de sombras suaves
- Animações de cantos arredondados

### Timing
- Mais curto: 200ms (feedback de botão)
- Padrão: 300ms (transições de tela)
- Mais longo: 500ms (estados de carregamento)

---

## Acessibilidade

### Contraste de Cores (WCAG AA)
- Texto sobre fundo: mínimo 4.5:1
- Preto sobre branco: 21:1 ✅
- Azul sobre branco: 5.5:1 ✅
- Roxo sobre branco: 4.8:1 ✅

### Alvos de Toque
- Mínimo 44x44 pt para botões
- Botões neste design: altura 50+ px ✅

### Tipografia
- Tamanho mínimo 12px
- Espaçamento entre letras claro para legibilidade
- Peso alto (600+) para texto do corpo

---

## Checklist de Implementação

Ao criar novos componentes:

- [ ] Bordas pretas em fundo branco ou bordas brancas em fundo preto
- [ ] Bordas mínimas 2px, padrão 3px
- [ ] Sem border-radius (usar 0)
- [ ] Tipografia bold (peso 600+)
- [ ] Cores de alto contraste apenas
- [ ] Sem gradientes, sombras ou blur
- [ ] Espaçamento consistente (múltiplos de 4px)
- [ ] Hierarquia visual clara
- [ ] Razões de cor acessíveis
- [ ] Alvos de toque mínimos 44x44

---

## Exemplo de Componente: Botão Completo

```typescript
import { StyleSheet, Pressable, Text } from 'react-native';

interface BrutalButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: '#007BFF'
  },
  secondary: {
    backgroundColor: '#8B5CF6'
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2
  }
});
```

---

## Recursos & Inspiração

- **Brutalismo na Arquitetura**: concreto cru, estrutura exposta
- **Swiss Style Design**: grid, alto contraste, tipografia marcante
- **Construtivismo**: formas geométricas fortes, paleta limitada
- **Design editorial**: tipografia forte, hierarquia clara, espaçamento dramático

---

**Última atualização**: 2024
**Versão do Design System**: 1.0.0
