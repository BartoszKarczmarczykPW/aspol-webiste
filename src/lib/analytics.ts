"use client";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
    posthog?: { capture?: (eventName: string, properties?: Record<string, unknown>) => void };
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(eventName: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, properties);
    }

    if (typeof window.plausible === "function") {
      window.plausible(eventName, { props: properties });
    }

    if (typeof window.posthog?.capture === "function") {
      window.posthog.capture(eventName, properties);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...properties });
    }
  } catch (error) {
    console.error("Tracking event error:", error);
  }
}
