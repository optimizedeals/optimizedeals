"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Cookie, CookieIcon, CircleCheckBig } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cookieConsent";
export const COOKIE_CONSENT_EVENT = "cookie-consent";

export type CookieConsentValue = "accepted" | "declined";

function broadcast(value: CookieConsentValue | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CookieConsentValue | null>(COOKIE_CONSENT_EVENT, {
      detail: value,
    }),
  );
}

export const cookieConsentStorage = {
  get(): CookieConsentValue | null {
    if (typeof window === "undefined") return null;
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      return v === "accepted" || v === "declined" ? v : null;
    } catch {
      return null;
    }
  },
  set(value: CookieConsentValue) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      broadcast(value);
    } catch {
      /* ignore */
    }
  },
  clear() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      broadcast(null);
    } catch {
      /* ignore */
    }
  },
};

export function useCookieConsentState() {
  const [value, setValue] = React.useState<CookieConsentValue | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setValue(cookieConsentStorage.get());
    setHydrated(true);

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue | null>).detail;
      setValue(detail);
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, handler);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
  }, []);

  const accept = React.useCallback(() => {
    cookieConsentStorage.set("accepted");
    setValue("accepted");
  }, []);

  const decline = React.useCallback(() => {
    cookieConsentStorage.set("declined");
    setValue("declined");
  }, []);

  return {
    value,
    hydrated,
    accept,
    decline,
    isOpen: hydrated && value === null,
  };
}

const cookieConsentVariants = cva("fixed z-[200] transition-all duration-700", {
  variants: {
    variant: {
      popup: "inset-4 w-fit",
      banner: "inset-4 w-fit",
    },
    position: {
      "top-left": "!bottom-auto sm:right-auto",
      "top-right": "!bottom-auto sm:left-auto",
      "bottom-right": "!top-auto sm:left-auto",
      "bottom-left": "!top-auto sm:right-auto",
      top: "bottom-auto left-4 right-4 md:mx-auto",
      bottom: "top-auto left-4 right-4 md:mx-auto",
    },
    wide: {
      true: "left-0 right-0 w-full max-w-screen",
    },
  },
  defaultVariants: {
    variant: "popup",
    position: "bottom-left",
    wide: false,
  },
  compoundVariants: [
    { variant: "popup", wide: false, className: "sm:max-w-md" },
    { variant: "banner", wide: true, position: "top", className: "top-0" },
    {
      variant: "banner",
      wide: true,
      position: "bottom",
      className: "bottom-0",
    },
  ],
});

type LinkLikeComponent = React.ComponentType<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;

export interface CookieConsentMessages {
  title?: string;
  description?: React.ReactNode;
  acceptLabel?: string;
  declineLabel?: string;
  fineprint?: React.ReactNode;
  learnMoreLabel?: string;
}

export interface CookieConsentProps extends VariantProps<
  typeof cookieConsentVariants
> {
  /** Controlled visibility. If omitted, internal localStorage state is used. */
  open?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  /** Delay before banner becomes visible (ms). */
  delay?: number;
  privacyPolicyHref?: string;
  termsHref?: string;
  /** Optional Link component (e.g. next/link). Defaults to <a>. */
  LinkComponent?: LinkLikeComponent;
  messages?: CookieConsentMessages;
  className?: string;
}

const DEFAULT_MESSAGES: Required<
  Pick<CookieConsentMessages, "title" | "acceptLabel" | "declineLabel">
> = {
  title: "We use cookies",
  acceptLabel: "Accept",
  declineLabel: "Decline",
};

export function CookieConsent({
  variant = "popup",
  position = "bottom-left",
  wide = false,
  delay = 500,
  open,
  onAccept,
  onDecline,
  privacyPolicyHref = "/privacy-policy",
  termsHref = "/terms-and-conditions",
  LinkComponent,
  messages,
  className,
}: CookieConsentProps) {
  const internal = useCookieConsentState();
  const isControlled = open !== undefined;
  const isOpen = isControlled ? !!open : internal.isOpen;

  const handleAccept = () => {
    if (!isControlled) internal.accept();
    onAccept?.();
  };

  const handleDecline = () => {
    if (!isControlled) internal.decline();
    onDecline?.();
  };

  const Anchor: LinkLikeComponent =
    LinkComponent ?? (((props) => <a {...props} />) as LinkLikeComponent);

  const m = { ...DEFAULT_MESSAGES, ...messages };
  const description = messages?.description ?? (
    <>
      We use cookies to ensure you get the best experience on our site. For more
      information, see our{" "}
      <Anchor href={privacyPolicyHref} className="text-accent hover:underline">
        privacy policy
      </Anchor>{" "}
      and{" "}
      <Anchor href={termsHref} className="text-accent hover:underline">
        terms and conditions
      </Anchor>
      .
    </>
  );

  return (
    <div
      className={cn(
        cookieConsentVariants({ variant, position, wide }),
        isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label={m.title}
    >
      {variant === "popup" ? (
        <div className="m-3 rounded-md border border-border bg-card shadow-lg">
          <div className="grid gap-2">
            <div className="flex h-14 items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-medium">{m.title}</h2>
              <CookieIcon className="size-6" />
            </div>
            <div className="p-4">
              <p className="text-start text-sm font-normal">{description}</p>
              {m.fineprint ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {m.fineprint}
                </p>
              ) : null}
            </div>
            <div className="w-full flex gap-2 border-t border-border p-4 py-5 dark:bg-background/20">
              <Button
                onClick={handleDecline}
                className="flex-1 cursor-pointer"
                variant="secondary"
              >
                {m.declineLabel}
              </Button>
              <Button onClick={handleAccept} className="flex-1 cursor-pointer">
                {m.acceptLabel}
                <CircleCheckBig />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-border bg-card shadow-lg",
            wide ? "border-x" : "rounded-lg border",
            position?.startsWith("top") ? "border-t-0" : "border-b-0",
          )}
        >
          <div className="container flex flex-col justify-between gap-4 p-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-start gap-4 md:items-center lg:gap-7">
              <Cookie className="mt-1 size-6 shrink-0 self-start md:mt-0 md:self-auto" />
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center lg:min-w-80 lg:justify-normal">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="flex-1 cursor-pointer"
              >
                {m.declineLabel}
              </Button>
              <Button onClick={handleAccept} className="flex-1 cursor-pointer">
                {m.acceptLabel}
                <CircleCheckBig />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
