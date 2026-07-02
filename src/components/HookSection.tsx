import useVirtualListSource from '../hooks/useVirtualList.ts?raw'
import CodeBlock from './CodeBlock'

const hookUsageCode = `
const { scrollRef, virtualItems, totalHeight, offsetY, handleScroll } =
  useVirtualList(filteredItems, {
    itemHeight: 40,      // fixed height per row (px)
    viewportHeight: 220, // visible container height (px)
    overscan: 4,         // extra items above/below the window
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
    description: 'Ref for the scrollable container. Attach it to the element with overflow.',
  },
  {
    name: 'virtualItems',
    description: 'Slice of currently visible items — only these go into the DOM.',
  },
  {
    name: 'totalHeight',
    description: 'Simulated total height (items.length × itemHeight) to preserve scroll behavior.',
  },
  {
    name: 'offsetY',
    description: 'Vertical offset of the rendered block via transform.',
  },
  {
    name: 'handleScroll',
    description: 'Stable onScroll handler — updates scrollTop and recalculates the window.',
  },
  {
    name: 'startIndex',
    description: 'Index of the first visible item. Useful for aria-posinset or numbering.',
  },
]

export default function HookSection() {
  return (
    <div className="hero__hook">
      <h2 className="hero__hook-title">How useVirtualList works</h2>
      <p className="hero__hook-lead">
        The hook calculates which items fit in the viewport based on scrollTop. Instead
        of rendering the full array, it returns a slice, the simulated total height,
        and the offset to position that slice correctly.
      </p>

      <ol className="hero__hook-steps">
        <li>The user scrolls → <code>handleScroll</code> updates <code>scrollTop</code></li>
        <li>The hook calculates <code>start</code> and <code>end</code> with overscan</li>
        <li>Only <code>items.slice(start, end)</code> is returned as <code>virtualItems</code></li>
        <li>Total height keeps the scrollbar proportional to the full dataset</li>
      </ol>

      <CodeBlock title="src/hooks/useVirtualList.ts" code={useVirtualListSource} />
      <CodeBlock title="Usage in a component" code={hookUsageCode} />
      <CodeBlock title="JSX pattern" code={jsxPatternCode} />

      <h3 className="hero__hook-subtitle">What the hook returns</h3>
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
