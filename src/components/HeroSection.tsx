import Demo from './Demo'
import HookSection from './HookSection'
import WhenToUseSection from './WhenToUseSection'

const benefits = [
  {
    title: 'Fewer DOM nodes',
    description:
      'Only visible items are mounted. With thousands of records, the browser does not need to create everything at once.',
  },
  {
    title: 'Smooth scrolling',
    description:
      'Less layout and repaint on every move. The list stays responsive even with large datasets.',
  },
  {
    title: 'Lower memory usage',
    description:
      'Components outside the viewport are unmounted, freeing resources a full list would keep occupied.',
  },
  {
    title: 'Fast initial render',
    description:
      'Opening a dropdown or loading a table no longer blocks the main thread for seconds.',
  },
]

const useCases = [
  'Country and region selectors',
  'Category and subcategory listings',
  'Tables with thousands of rows',
  'Long feeds and timelines',
  'Autocomplete with extensive results',
  'Logs, history, and audit trails',
]

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow">List virtualization</p>
      <h1 id="hero-title" className="hero__title">
        Render thousands of items without freezing the UI
      </h1>
      <p className="hero__lead">
        Virtualization renders only the visible window of the list. The rest
        exists as calculated height — not as DOM. Ideal for comboboxes,
        tables, and any scrollable UI with lots of data.
      </p>

      <ul className="hero__benefits">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="hero__benefit">
            <h2 className="hero__benefit-title">{benefit.title}</h2>
            <p className="hero__benefit-text">{benefit.description}</p>
          </li>
        ))}
      </ul>

      <Demo />

      <HookSection />

      <div className="hero__use-cases">
        <h2 className="hero__use-cases-title">Common use cases</h2>
        <ul className="hero__use-cases-list">
          {useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </div>

      <WhenToUseSection />
    </section>
  )
}
