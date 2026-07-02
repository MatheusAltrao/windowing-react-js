# Virtualization List

An interactive **list virtualization** demo in React. This project shows how to render only the visible items of a long list — keeping scroll smooth and the DOM lean — using a custom hook (`useVirtualList`) and a country combobox as a practical example.

## What is list virtualization?

Instead of mounting every item in the DOM, virtualization calculates which items fit in the viewport and renders only that window. The rest exists as **calculated height**, not as HTML nodes.

```
List with 1,000 items
├── Without virtualization → ~1,000 DOM nodes
└── With virtualization    → ~15 DOM nodes (visible + overscan)
```

## Demo

The app includes:

- **Country combobox** with search and flags (~125 countries, ~15 items rendered at a time)
- **Hero section** explaining benefits and use cases
- **"When to use" section** with signals that virtualization is needed
- **Hook section** with source code reference and JSX pattern

## Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [react-international-phone](https://www.npmjs.com/package/react-international-phone) — flags in the combobox
- Plain CSS (no UI framework)

## Getting started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview the build
npm run preview

# Lint
npm run lint
```

## Project structure

```
src/
├── App.tsx                      # Main layout
├── components/
│   ├── CountryCombobox.tsx      # Virtualized combobox
│   ├── Demo.tsx                 # Demo wrapper
│   ├── HeroSection.tsx          # Intro content
│   ├── HookSection.tsx          # Hook documentation
│   ├── WhenToUseSection.tsx     # When to use virtualization
│   └── CodeBlock.tsx            # Formatted code block
├── hooks/
│   └── useVirtualList.ts        # Virtualization hook
├── consts/
│   └── countries.tsx            # Mock country list
└── index.css                    # Global styles
```

## `useVirtualList` hook

A generic hook that takes an array and returns only the visible items based on scroll position.

### Parameters

| Option           | Type     | Description                                           |
| ---------------- | -------- | ----------------------------------------------------- |
| `items`          | `T[]`    | Full data array                                       |
| `itemHeight`     | `number` | Fixed height of each item in pixels                   |
| `viewportHeight` | `number` | Visible height of the scrollable container            |
| `overscan`       | `number` | Extra items rendered above/below (default: 4)         |

### Return value

| Property       | Description                                           |
| -------------- | ----------------------------------------------------- |
| `scrollRef`    | Ref for the container with `overflow-y: auto`         |
| `virtualItems` | Slice of currently visible items                      |
| `totalHeight`  | Simulated total height (`items.length × itemHeight`)  |
| `offsetY`      | Vertical offset via `transform: translateY()`       |
| `handleScroll` | Stable handler for `onScroll`                         |
| `startIndex`   | Index of the first visible item                       |

### Usage

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

## When to use

**Use virtualization when:**

- The list has hundreds or thousands of items
- Each item is a React component with rich content (icons, images, actions)
- Scrolling or opening the dropdown feels slow
- Each item has a fixed or predictable height

**Avoid when:**

- The list has few items (< 50) with simple content
- Items have variable height without dynamic measurement support
- All content must be in the DOM (e.g. printing, SEO for hidden content)

## How it works under the hood

1. The user scrolls the list → `handleScroll` updates `scrollTop`
2. The hook calculates `start` and `end` based on viewport + overscan
3. Only `items.slice(start, end)` is returned as `virtualItems`
4. `totalHeight` keeps the scrollbar proportional to the full dataset
5. `offsetY` positions the rendered block at the correct point in the list

## Current limitations

- Supports **fixed height** items only
- No keyboard navigation in the combobox
- Country list is mocked locally (no API)

## License

Private project — personal/educational use.
