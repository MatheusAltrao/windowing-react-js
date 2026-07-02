import { useEffect, useRef, useState } from 'react'
import { FlagImage, type CountryIso2 } from 'react-international-phone'
import { countries, type Country } from '../consts/countries'
import useVirtualList from '../hooks/useVirtualList'

const ITEM_HEIGHT = 40
const LIST_MAX_HEIGHT = 220
const OVERSCAN = 4

export default function CountryCombobox() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Country>(
    countries.find((country) => country.code === 'BR') ?? countries[0],
  )
  const comboboxRef = useRef<HTMLDivElement>(null)

  const filteredCountries = countries.filter((country) => {
    const query = search.toLowerCase()
    return (
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    )
  })

  const { scrollRef, virtualItems, totalHeight, offsetY, handleScroll } =
    useVirtualList(filteredCountries, {
      itemHeight: ITEM_HEIGHT,
      viewportHeight: LIST_MAX_HEIGHT,
      overscan: OVERSCAN,
    })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(country: Country) {
    setSelected(country)
    setSearch('')
    setIsOpen(false)
  }

  return (
    <div className="combobox" ref={comboboxRef}>
      <button
        type="button"
        className="combobox__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span className="combobox__flag">
          <FlagImage
            iso2={selected.code.toLowerCase() as CountryIso2}
            size={18}
            suppressHydrationWarning
          />
        </span>
        <span className="combobox__value">{selected.name}</span>
        <span className="combobox__arrow" aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="combobox__panel" role="listbox" aria-label="Países">
          <div className="combobox__search">
            <span className="combobox__search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              className="combobox__search-input"
              placeholder="Busque por país ou código"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoFocus
            />
          </div>

          {filteredCountries.length === 0 ? (
            <p className="combobox__empty">Nenhum país encontrado</p>
          ) : (
            <div
              ref={scrollRef}
              className="combobox__list"
              onScroll={handleScroll}
            >
              <div className="combobox__list-inner" style={{ height: totalHeight }}>
                <div
                  className="combobox__list-content"
                  style={{ transform: `translateY(${offsetY}px)` }}
                >
                  {virtualItems.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      className={`combobox__item${
                        selected.code === country.code ? ' combobox__item--selected' : ''
                      }`}
                      role="option"
                      aria-selected={selected.code === country.code}
                      onClick={() => handleSelect(country)}
                    >
                      <span className="combobox__flag">
                        <FlagImage
                          iso2={country.code.toLowerCase() as CountryIso2}
                          size={18}
                          suppressHydrationWarning
                        />
                      </span>
                      <span className="combobox__item-name">{country.name}</span>
                      <span className="combobox__item-code">{country.dialCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
