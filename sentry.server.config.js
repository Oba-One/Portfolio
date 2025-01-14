// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://9b1a0b2207074e4db2473a233e04860d@o1400298.ingest.sentry.io/4504751395569664',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
})
