import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./config";

/**
 * Resolve the visitor's preferred locale at the edge.
 *
 * Order of precedence:
 *  1. Persisted cookie (the user already picked a locale).
 *  2. Vercel geolocation header — visitors from Brazil default to pt-br.
 *  3. Accept-Language header negotiated against supported locales.
 *  4. Hard fallback to {@link DEFAULT_LOCALE}.
 *
 * This is only invoked for the root path. Internal pages never redirect
 * based on geo or browser language, per the SEO requirements.
 */
export function detectLocale(headers: Headers, cookieValue?: string): Locale {
  if (cookieValue && (LOCALES as readonly string[]).includes(cookieValue)) {
    return cookieValue as Locale;
  }

  const country = headers.get("x-vercel-ip-country");
  if (country === "BR") return "pt-br";

  const accept = headers.get("accept-language");
  if (accept) {
    try {
      const languages = new Negotiator({
        headers: { "accept-language": accept },
      }).languages();
      if (languages.length > 0) {
        const matched = match(
          languages,
          LOCALES as unknown as string[],
          DEFAULT_LOCALE,
        );
        if ((LOCALES as readonly string[]).includes(matched)) {
          return matched as Locale;
        }
      }
    } catch {
      // Bad header → fall through to default.
    }
  }

  return DEFAULT_LOCALE;
}
