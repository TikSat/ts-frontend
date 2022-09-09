module.exports = {
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
