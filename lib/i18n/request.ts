import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { loadMessages } from "./messages";

/**
 * Server-side request config consumed by NextIntlClientProvider and
 * the server-side `getTranslations` helpers. Resolves the active locale
 * from the URL segment and loads the merged namespace bundle.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested)
    ? (requested as Locale)
    : DEFAULT_LOCALE;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
