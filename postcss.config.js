module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    'postcss-nested',
    [
      'postcss-custom-media',
      {
        importFrom: './src/styles/media.css',
      },
    ],
  ],
};
