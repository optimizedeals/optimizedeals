"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { env } from "@/lib/env";

import {
  COOKIE_CONSENT_EVENT,
  cookieConsentStorage,
  type CookieConsentValue,
} from "@/components/cookie-consent";

const isDev = process.env.NODE_ENV !== "production";

export function MicrosoftClarity() {
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
  if (!env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID) {
    if (typeof console !== "undefined") {
      console.warn("Microsoft Clarity ID not found");
    }
    return null;
  }
  if (!hasConsent) return null;

  return (
    <Script id="clarity-script" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}
