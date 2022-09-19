import Head from 'next/head';

export const PwaHead = () => {
  return (
    <Head>
      <meta name="application-name" content="Tiksat" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Tiksat" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#5a51c2" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icon.png" color="#5a51c2" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </Head>
  );
};
