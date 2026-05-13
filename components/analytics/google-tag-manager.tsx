"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager as GTM } from "@next/third-parties/google";

import {
  COOKIE_CONSENT_EVENT,
  cookieConsentStorage,
  type CookieConsentValue,
} from "@/components/cookie-consent";

const isDev = process.env.NODE_ENV !== "production";

export function GoogleTagManager() {
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
  if (!process.env.NEXT_PUBLIC_GTM_ID) {
    if (typeof console !== "undefined") {
      console.warn("Google Tag Manager ID not found");
    }
    return null;
  }
  if (!hasConsent) return null;

  return <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID} />;
}
