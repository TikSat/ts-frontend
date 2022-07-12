module.exports = {
  plugins: [
    'postcss-nested',
    [
      'postcss-custom-media',
      {
        importFrom: './styles/media.css',
      },
    ],
  ],
};
