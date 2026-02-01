/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client"

import { Studio } from 'sanity'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

if (typeof window !== 'undefined' && !(window as { __sanityDisableTransitionPatched?: boolean }).__sanityDisableTransitionPatched) {
  const originalError = console.error
  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : ''
    if (message.includes('disableTransition')) return
    originalError(...args)
  }

  ;(window as { __sanityDisableTransitionPatched?: boolean }).__sanityDisableTransitionPatched = true
}

export default function StudioPage() {
  return <Studio config={config} />
}
