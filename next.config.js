/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs')

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'page.ts', 'api.js', 'api.ts'],
  webpack(config, { isServer }) {
    // Run custom scripts
    if (isServer) {
      require('./scripts/generate-sitemap')
      require('./scripts/draco')
    }

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    })

    // Import videos, models, hdrs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    })

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    })

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    })

    return config
  },
}

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
)
