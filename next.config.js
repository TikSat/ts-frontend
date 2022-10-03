/** @type {{devIndicators: {autoPrerender: boolean}, reactStrictMode: boolean, swcMinify: boolean}} */

const { withSentryConfig } = require('@sentry/nextjs');
const sentryWebpackPluginOptions = {
  silent: true,
  authToken: 'a00b1bc1e8a94439b590eebd2d08b346f4c52bde1ed342e58f839dd2aae2566b'
};

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: {
    autoPrerender: true
  },
  images: {
    domains: ['localhost', 'tiksat.bid', 'master.backend.tiksat.bid', 'tiksat-prod.fra1.digitaloceanspaces.com', 'tiksat-dev.fra1.digitaloceanspaces.com']
  },
  sentry: {
    disableServerWebpackPlugin: (process.env.NODE_ENV !== 'production'),
    disableClientWebpackPlugin: (process.env.NODE_ENV !== 'production'),
    hideSourceMaps: true
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

const withPWA = require('next-pwa')({dest: 'public'})

module.exports = process.env.NODE_ENV === 'production'
  ? withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions)
  : nextConfig
