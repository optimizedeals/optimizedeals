"use client";

import type { AnchorHTMLAttributes, ComponentType } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

import { CookieConsent } from "@/components/cookie-consent";

const LinkComponent: ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
> = ({ href, children, ...props }) => (
  <Link href={href} {...props}>
    {children}
  </Link>
);

export function CookieConsentMount() {
  const t = useTranslations("cookie");
  return (
    <CookieConsent
      variant="popup"
      position="bottom-left"
      LinkComponent={LinkComponent}
      messages={{
        title: t("title"),
        acceptLabel: t("accept"),
        declineLabel: t("decline"),
        description: (
          <>
            {t("description")}{" "}
            <Link
              href="/privacy-policy"
              className="text-accent hover:underline"
            >
              {t("privacyLink")}
            </Link>{" "}
            {t("and")}{" "}
            <Link
              href="/terms-and-conditions"
              className="text-accent hover:underline"
            >
              {t("termsLink")}
            </Link>
            .
          </>
        ),
      }}
    />
  );
}
