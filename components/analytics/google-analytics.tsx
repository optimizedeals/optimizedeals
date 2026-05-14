"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics as GA } from "@next/third-parties/google";
import { env } from "@/lib/env";

import {
  COOKIE_CONSENT_EVENT,
  cookieConsentStorage,
  type CookieConsentValue,
} from "@/components/cookie-consent";

const isDev = process.env.NODE_ENV !== "production";

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setHasConsent(cookieConsentStorage.get() === "accepted");
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue | null>).detail;
      setHasConsent(detail === "accepted");
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, handler);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
  }, []);

  if (isDev) return null;
  if (!env.NEXT_PUBLIC_GA_ID) {
    if (typeof console !== "undefined") {
      console.warn("Google Analytics ID not found");
    }
    return null;
  }
  if (!hasConsent) return null;

  return <GA gaId={env.NEXT_PUBLIC_GA_ID} />;
}
