/** @type {{devIndicators: {autoPrerender: boolean}, reactStrictMode: boolean, swcMinify: boolean}} */

const { withSentryConfig } = require('@sentry/nextjs');
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true,
  authToken: 'a00b1bc1e8a94439b590eebd2d08b346f4c52bde1ed342e58f839dd2aae2566b'
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions)
