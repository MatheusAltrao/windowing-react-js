import { countries } from "../consts/countries";
import CountryCombobox from "./CountryCombobox";

export default function Demo() {
    return (
        <section className="demo" aria-labelledby="demo-title">
            <header className="demo__header">
                <h2 id="demo-title" className="demo__title">
                    Demo ao vivo
                </h2>
                <p className="demo__description">
                    Este combobox lista {countries.length} países, mas monta apenas ~15 itens por
                    vez. Abra, busque e role para sentir a diferença.
                </p>
            </header>
            <CountryCombobox />
        </section>
    )
}