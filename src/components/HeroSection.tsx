import Demo from "./Demo"
import HookSection from "./HookSection"
import WhenToUseSection from "./WhenToUseSection"

const benefits = [
  {
    title: 'Menos nós no DOM',
    description:
      'Só os itens visíveis são montados. Com milhares de registros, o navegador não precisa criar tudo de uma vez.',
  },
  {
    title: 'Scroll fluido',
    description:
      'Menos layout e repaint a cada movimento. A lista responde rápido mesmo com datasets grandes.',
  },
  {
    title: 'Menor uso de memória',
    description:
      'Componentes fora da viewport são desmontados, liberando recursos que uma lista completa manteria ocupados.',
  },
  {
    title: 'Render inicial rápido',
    description:
      'Abrir um dropdown ou carregar uma tabela deixa de bloquear a thread principal por segundos.',
  },
]

const useCases = [
  'Seletores de país e região',
  'Listagens de categorias e subcategorias',
  'Tabelas com milhares de linhas',
  'Feeds e timelines longas',
  'Autocomplete com resultados extensos',
  'Logs, histórico e auditoria',
]

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow">Virtualização de listas</p>
      <h1 id="hero-title" className="hero__title">
        Renderize milhares de itens sem travar a interface
      </h1>
      <p className="hero__lead">
        A virtualização renderiza apenas a janela visível da lista. O restante
        existe como altura calculada — não como DOM. Ideal para comboboxes,
        tabelas e qualquer UI com scroll e muitos dados.
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
        <h2 className="hero__use-cases-title">Casos de uso comuns</h2>
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
