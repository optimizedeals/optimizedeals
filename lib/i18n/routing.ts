import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";

/**
 * next-intl routing configuration.
 *
 * - localePrefix "always" → every URL carries the locale segment
 *   (/en-us/..., /pt-br/...). The bare `/` is auto-redirected to the
 *   detected locale by the proxy.
 * - localeDetection runs only at the root level. Internal pages never
 *   redirect based on geo or Accept-Language; users can deep-link any
 *   locale and stay there.
 * - The locale cookie persists user choice across visits.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
  },
});
