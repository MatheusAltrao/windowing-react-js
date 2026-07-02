import { countries } from '../consts/countries'
import CountryCombobox from './CountryCombobox'

export default function Demo() {
  return (
    <section className="demo" aria-labelledby="demo-title">
      <header className="demo__header">
        <h2 id="demo-title" className="demo__title">
          Live demo
        </h2>
        <p className="demo__description">
          This combobox lists {countries.length} countries but mounts only ~15 items at
          a time. Open it, search, and scroll to feel the difference.
        </p>
      </header>
      <CountryCombobox />
    </section>
  )
}
