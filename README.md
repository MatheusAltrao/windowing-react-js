# Virtualization List

Demo interativa de **virtualização de listas** em React. O projeto mostra como renderizar apenas os itens visíveis de uma lista longa — mantendo scroll fluido e DOM enxuto — com um hook customizado (`useVirtualList`) e um combobox de países como exemplo prático.

## O que é virtualização de listas?

Em vez de montar todos os itens no DOM, a virtualização calcula quais cabem na viewport e renderiza só essa janela. O restante existe como **altura calculada**, não como nós HTML.

```
Lista com 1.000 itens
├── Sem virtualização → ~1.000 nós no DOM
└── Com virtualização → ~15 nós no DOM (visíveis + overscan)
```

## Demo

A aplicação inclui:

- **Combobox de países** com busca e bandeiras (~125 países, ~15 itens renderizados por vez)
- **Hero section** explicando benefícios e casos de uso
- **Seção "Quando usar"** com sinais de que a virtualização é necessária
- **Seção do hook** com código-fonte de referência e padrão JSX

## Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [react-international-phone](https://www.npmjs.com/package/react-international-phone) — bandeiras no combobox
- CSS puro (sem framework de UI)

## Começando

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Estrutura do projeto

```
src/
├── App.tsx                      # Layout principal
├── components/
│   ├── CountryCombobox.tsx      # Combobox virtualizado
│   ├── Demo.tsx                 # Wrapper da demo
│   ├── HeroSection.tsx          # Conteúdo introdutório
│   ├── HookSection.tsx          # Documentação do hook
│   ├── WhenToUseSection.tsx     # Quando usar virtualização
│   └── CodeBlock.tsx            # Bloco de código formatado
├── hooks/
│   └── useVirtualList.ts        # Hook de virtualização
├── consts/
│   └── countries.tsx            # Lista mockada de países
└── index.css                    # Estilos globais
```

## Hook `useVirtualList`

Hook genérico que recebe um array e retorna apenas os itens visíveis com base no scroll.

### Parâmetros

| Opção            | Tipo     | Descrição                                      |
| ---------------- | -------- | ---------------------------------------------- |
| `items`          | `T[]`    | Array completo de dados                        |
| `itemHeight`     | `number` | Altura fixa de cada item em pixels             |
| `viewportHeight` | `number` | Altura visível do container scrollável         |
| `overscan`       | `number` | Itens extras renderizados acima/abaixo (padrão: 4) |

### Retorno

| Propriedade     | Descrição                                              |
| --------------- | ------------------------------------------------------ |
| `scrollRef`     | Ref para o container com `overflow-y: auto`            |
| `virtualItems`  | Slice dos itens visíveis no momento                    |
| `totalHeight`   | Altura total simulada (`items.length × itemHeight`)    |
| `offsetY`       | Deslocamento vertical via `transform: translateY()`    |
| `handleScroll`  | Handler estável para `onScroll`                        |
| `startIndex`    | Índice do primeiro item visível                        |

### Uso

```tsx
const { scrollRef, virtualItems, totalHeight, offsetY, handleScroll } =
  useVirtualList(filteredItems, {
    itemHeight: 40,
    viewportHeight: 220,
    overscan: 4,
  })
```

```tsx
<div ref={scrollRef} className="list" onScroll={handleScroll}>
  <div style={{ height: totalHeight }}>
    <div style={{ transform: `translateY(${offsetY}px)` }}>
      {virtualItems.map((item) => (
        <div key={item.id} className="list-item">
          {item.label}
        </div>
      ))}
    </div>
  </div>
</div>
```

## Quando usar

**Use virtualização quando:**

- A lista tem centenas ou milhares de itens
- Cada item é um componente React com conteúdo rico (ícones, imagens, ações)
- O scroll ou a abertura do dropdown ficam lentos
- A altura de cada item é fixa ou previsível

**Evite quando:**

- A lista tem poucos itens (< 50) e conteúdo simples
- Os itens têm altura variável sem suporte a medição dinâmica
- Todo o conteúdo precisa estar no DOM (ex.: impressão, SEO do conteúdo oculto)

## Como funciona por baixo

1. O usuário rola a lista → `handleScroll` atualiza `scrollTop`
2. O hook calcula `start` e `end` com base na viewport + overscan
3. Apenas `items.slice(start, end)` é retornado como `virtualItems`
4. `totalHeight` mantém a barra de scroll proporcional ao dataset completo
5. `offsetY` posiciona o bloco renderizado no ponto correto da lista

## Limitações atuais

- Suporta apenas **altura fixa** por item
- Não implementa navegação por teclado no combobox
- Lista de países é mockada localmente (sem API)

## Licença

Projeto privado — uso pessoal/educacional.
