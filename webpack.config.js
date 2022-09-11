const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV;
const distPath = path.join(__dirname, 'dist');

module.exports = {
  mode,
  entry: {
    app: './src/app.tsx',
  },
  output: {
    path: distPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      // TODO base64の対象にするか閾値は後で調整する
      // https://webpack.js.org/guides/asset-modules/
      {
        test: /\.(jpe?g|png|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpg: {
                quality: 70,
              },
              png: {
                quality: 70,
              },
              webp: {
                quality: 70,
              },
            },
          },
        },
      }),
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js'],
      exclude: 'node_modules',
    }),
  ],
  target: 'web',
};
