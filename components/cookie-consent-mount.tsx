"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentType } from "react";

import { CookieConsent } from "@/components/cookie-consent";

const LinkComponent: ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
> = ({ href, children, ...props }) => (
  <Link href={href} {...props}>
    {children}
  </Link>
);

export function CookieConsentMount() {
  return (
    <CookieConsent
      variant="popup"
      position="bottom-left"
      LinkComponent={LinkComponent}
      privacyPolicyHref="/company"
      termsHref="/company"
    />
  );
}
