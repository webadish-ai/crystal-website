import { useState, useEffect } from 'react'

const isCmsFrame =
  typeof window !== 'undefined' && window.parent !== window

export function useCmsData<T>(slug: string, staticData: T): T {
  const [data, setData] = useState<T>(() => {
    if (isCmsFrame) {
      const live = (window as any).__CMS_LIVE__?.[slug]
      return live !== undefined ? (live as T) : staticData
    }
    return staticData
  })

  useEffect(() => {
    if (!isCmsFrame) return
    const subs: Record<string, Record<string, (d: T) => void>> =
      ((window as any).__CMS_SUBS__ = (window as any).__CMS_SUBS__ || {})
    if (!subs[slug]) subs[slug] = {}
    const id = Math.random().toString(36).slice(2)
    subs[slug][id] = (d: T) => setData(d)
    return () => { if (subs[slug]) delete subs[slug][id] }
  }, [slug])

  return data
}
