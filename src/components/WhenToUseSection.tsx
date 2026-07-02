const signals = [
  {
    title: 'A lista trava ao abrir ou filtrar',
    description:
      'Se montar todos os itens causa delay perceptível (>100ms), a virtualização reduz o trabalho inicial.',
  },
  {
    title: 'O scroll fica engasgado',
    description:
      'Quedas de FPS ao rolar indicam excesso de nós no DOM ou re-renders pesados por item.',
  },
  {
    title: 'Muitos itens, poucos visíveis',
    description:
      'Listas com scroll onde só uma fração aparece na tela são o cenário ideal — você paga DOM só pelo visível.',
  },
  {
    title: 'Cada item é um componente React',
    description:
      'Texto simples aguenta centenas de nós. Botões, imagens e ícones por linha escalam mal sem virtualização.',
  },
]

const useWhen = [
  'Mais de ~100 itens com componentes ricos (ícones, imagens, ações)',
  'Listas scrolláveis com altura fixa por item',
  'Dropdowns, tabelas e feeds que crescem com o tempo',
  'Dados já carregados no client e renderizados de uma vez',
]

const avoidWhen = [
  'Menos de 50 itens simples — o ganho não compensa a complexidade',
  'Altura variável por item sem biblioteca que suporte measure',
  'Listas que precisam de Ctrl+F nativo do browser no conteúdo oculto',
  'Layouts onde todos os itens precisam estar no DOM (print, SEO do conteúdo)',
]

export default function WhenToUseSection() {
  return (
    <div className="hero__when-to-use">
      <h2 className="hero__when-to-use-title">Quando usar virtualização</h2>
      <p className="hero__when-to-use-lead">
        Nem toda lista precisa ser virtualizada. Use quando o volume de dados e a
        complexidade de cada item começam a impactar a experiência — e evite quando
        a lista é pequena ou a altura dos itens é imprevisível.
      </p>

      <h3 className="hero__when-to-use-subtitle">Como identificar que precisa</h3>
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
            Use quando
          </h3>
          <ul className="hero__guideline-list">
            {useWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero__guideline">
          <h3 className="hero__guideline-title hero__guideline-title--avoid">
            Evite quando
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
