"use client"

import { useState, useCallback } from "react"
import { LoadingScreen } from "./Loader/LoadingScreen"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  )
}
