const signals = [
  {
    title: 'The list freezes when opening or filtering',
    description:
      'If mounting all items causes a noticeable delay (>100ms), virtualization reduces the initial work.',
  },
  {
    title: 'Scrolling feels janky',
    description:
      'FPS drops while scrolling indicate too many DOM nodes or heavy per-item re-renders.',
  },
  {
    title: 'Many items, few visible',
    description:
      'Scrollable lists where only a fraction appears on screen are the ideal scenario — you pay DOM cost only for what is visible.',
  },
  {
    title: 'Each item is a React component',
    description:
      'Plain text handles hundreds of nodes fine. Buttons, images, and icons per row scale poorly without virtualization.',
  },
]

const useWhen = [
  'More than ~100 items with rich components (icons, images, actions)',
  'Scrollable lists with fixed item height',
  'Dropdowns, tables, and feeds that grow over time',
  'Data already loaded on the client and rendered at once',
]

const avoidWhen = [
  'Fewer than 50 simple items — the gain does not justify the complexity',
  'Variable item height without a library that supports measurement',
  'Lists that need native browser Ctrl+F on hidden content',
  'Layouts where every item must be in the DOM (print, SEO for hidden content)',
]

export default function WhenToUseSection() {
  return (
    <div className="hero__when-to-use">
      <h2 className="hero__when-to-use-title">When to use virtualization</h2>
      <p className="hero__when-to-use-lead">
        Not every list needs virtualization. Use it when data volume and item
        complexity start impacting the experience — and skip it when the list
        is small or item heights are unpredictable.
      </p>

      <h3 className="hero__when-to-use-subtitle">How to tell you need it</h3>
      <ul className="hero__signals">
        {signals.map((signal) => (
          <li key={signal.title} className="hero__signal">
            <p className="hero__signal-title">{signal.title}</p>
            <p className="hero__signal-text">{signal.description}</p>
          </li>
        ))}
      </ul>

      <div className="hero__guidelines">
        <div className="hero__guideline">
          <h3 className="hero__guideline-title hero__guideline-title--use">
            Use when
          </h3>
          <ul className="hero__guideline-list">
            {useWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero__guideline">
          <h3 className="hero__guideline-title hero__guideline-title--avoid">
            Avoid when
          </h3>
          <ul className="hero__guideline-list">
            {avoidWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
