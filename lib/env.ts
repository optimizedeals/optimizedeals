import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default("https://optimize.deals"),
    NEXT_PUBLIC_GTM_ID: z.string().optional(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },

  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});

export const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
