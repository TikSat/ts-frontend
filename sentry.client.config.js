import * as Sentry from "@sentry/nextjs";
import { BrowserTracing } from "@sentry/tracing";

const SENTRY_DSN = process.env.FRONT_SENTRY_DSN || process.env.FRONT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || "https://9c58ffe772f04d56928df29b7dcc6303@o1367671.ingest.sentry.io/6668634",

  environment: process.env.RUN_ENV ?? "development",
  release: process.env.SENTRY_RELEASE,

  // This enables automatic instrumentation (highly recommended), but is not
  // necessary for purely manual usage
  integrations: [new BrowserTracing()],

  // To set a uniform sample rate
  tracesSampleRate: 0.2
});
