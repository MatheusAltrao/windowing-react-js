import useVirtualListSource from '../hooks/useVirtualList.ts?raw'
import CodeBlock from './CodeBlock'

const hookUsageCode = `
const { scrollRef, virtualItems, totalHeight, offsetY, handleScroll } =
  useVirtualList(filteredItems, {
    itemHeight: 40,      // altura fixa de cada linha (px)
    viewportHeight: 220, // altura visível do container (px)
    overscan: 4,         // itens extras acima/abaixo da janela
  })
`.trim()

const jsxPatternCode = `
<div ref={scrollRef} className="list" onScroll={handleScroll}>
  <div style={{ height: totalHeight }}>
    <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
      {virtualItems.map((item) => (
        <div key={item.id} className="list-item">
          {item.label}
        </div>
      ))}
    </div>
  </div>
</div>
`.trim()

const returnValues = [
  {
    name: 'scrollRef',
    description: 'Ref do container scrollável. Conecte ao elemento que recebe overflow.',
  },
  {
    name: 'virtualItems',
    description: 'Slice dos itens visíveis no momento — só eles vão para o DOM.',
  },
  {
    name: 'totalHeight',
    description: 'Altura total simulada (items.length × itemHeight) para manter o scroll.',
  },
  {
    name: 'offsetY',
    description: 'Deslocamento vertical do bloco renderizado via transform.',
  },
  {
    name: 'handleScroll',
    description: 'Handler estável para onScroll — atualiza scrollTop e recalcula a janela.',
  },
  {
    name: 'startIndex',
    description: 'Índice do primeiro item visível. Útil para aria-posinset ou numeração.',
  },
]

export default function HookSection() {
  return (
    <div className="hero__hook">
      <h2 className="hero__hook-title">Como funciona o useVirtualList</h2>
      <p className="hero__hook-lead">
        O hook calcula quais itens cabem na viewport com base no scrollTop. Em vez
        de renderizar o array inteiro, ele devolve um slice, a altura total fictícia
        e o offset para posicionar esse slice corretamente.
      </p>

      <ol className="hero__hook-steps">
        <li>O usuário rola → <code>handleScroll</code> atualiza <code>scrollTop</code></li>
        <li>O hook calcula <code>start</code> e <code>end</code> com overscan</li>
        <li>Só <code>items.slice(start, end)</code> é retornado como <code>virtualItems</code></li>
        <li>A altura total mantém a barra de scroll proporcional ao dataset</li>
      </ol>

      <CodeBlock title="src/hooks/useVirtualList.ts" code={useVirtualListSource} />
      <CodeBlock title="Uso no componente" code={hookUsageCode} />
      <CodeBlock title="Padrão JSX" code={jsxPatternCode} />

      <h3 className="hero__hook-subtitle">O que o hook retorna</h3>
      <dl className="hero__hook-api">
        {returnValues.map((item) => (
          <div key={item.name} className="hero__hook-api-item">
            <dt className="hero__hook-api-name">{item.name}</dt>
            <dd className="hero__hook-api-desc">{item.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
