const path = require('path');
const ExtractText = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const babelOptions = {
  presets: ['react', ['es2015', { modules: false, loose: true }], 'stage-2'],
  plugins: ['ramda'],
};

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../example/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  jsClient: {
    test: /\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: babelOptions,
      },
    ],
    exclude: /node_modules/,
  },
  cssShared: {
    test: /\.css$/,
    use: ExtractText.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    }),
  },
};
