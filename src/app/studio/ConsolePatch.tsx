"use client"

import { useEffect } from "react"

type WindowWithSanityPatch = Window & {
  __sanityDisableTransitionPatched?: boolean
  __sanityDisableTransitionOriginalError?: typeof console.error
}

function patchConsole() {
  if (typeof window === "undefined") return
  const win = window as WindowWithSanityPatch
  if (win.__sanityDisableTransitionPatched) return

  win.__sanityDisableTransitionOriginalError = console.error
  console.error = (...args) => {
    const message = typeof args[0] === "string" ? args[0] : ""
    if (message.includes("disableTransition")) return
    win.__sanityDisableTransitionOriginalError?.(...args)
  }

  win.__sanityDisableTransitionPatched = true
}

export default function ConsolePatch({ children }: { children: React.ReactNode }) {
  patchConsole()

  useEffect(() => {
    patchConsole()
  }, [])

  return <>{children}</>
}
