import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from 'react'

type UseVirtualListOptions = {
  itemHeight: number
  viewportHeight: number
  overscan?: number
}

export default function useVirtualList<T>(
  items: T[],
  { itemHeight, viewportHeight, overscan = 4 }: UseVirtualListOptions,
) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [prevItems, setPrevItems] = useState(items)

  if (items !== prevItems) {
    setPrevItems(items)
    setScrollTop(0)
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [items])

  const { virtualItems, startIndex, totalHeight, offsetY } = useMemo(() => {
    const visibleCount = Math.ceil(viewportHeight / itemHeight) + overscan * 2
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const end = Math.min(items.length, start + visibleCount)

    return {
      virtualItems: items.slice(start, end),
      startIndex: start,
      totalHeight: items.length * itemHeight,
      offsetY: start * itemHeight,
    }
  }, [items, scrollTop, itemHeight, viewportHeight, overscan])

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }, [])

  return {
    scrollRef,
    virtualItems,
    startIndex,
    totalHeight,
    offsetY,
    handleScroll,
  }
}
