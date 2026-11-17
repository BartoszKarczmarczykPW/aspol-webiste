"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent, stored in localStorage.
 * - "all": the visitor accepted optional cookies (embedded Google Maps, analytics if added later)
 * - "necessary": only what the site needs to work (e.g. the saved language)
 * - "unset": no choice yet, so the banner shows
 * - null: server render / hydration pass, where the choice is unknown (banner stays hidden)
 */
export type Consent = "all" | "necessary" | "unset";

const STORAGE_KEY = "aspolCookieConsent";
const OPEN_EVENT = "aspol:cookie-settings";
const listeners = new Set<() => void>();
let memoryConsent: Consent | null = null; // used when storage is blocked

function read(): Consent {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "all" || saved === "necessary") return saved;
  } catch {
    // Storage blocked: fall back to this page view's choice.
  }
  return memoryConsent ?? "unset";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setConsent(value: Exclude<Consent, "unset">) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  listeners.forEach((notify) => notify());
}

/** Current choice; `null` until the page has hydrated. */
export function useConsent(): Consent | null {
  return useSyncExternalStore<Consent | null>(subscribe, read, () => null);
}

/** Non-React check, e.g. before sending an analytics event. */
export function hasOptionalConsent(): boolean {
  return typeof window !== "undefined" && read() === "all";
}

/** Re-opens the banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
