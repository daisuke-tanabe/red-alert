const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const dotenv = require('dotenv')
const webpack = require("webpack");

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const distPath = path.join(__dirname, 'dist');
const env = dotenv.config().parsed;

const config = {
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js'],
      exclude: 'node_modules',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
  target: 'web',
};

if (!isProd) {
  config.devtool = 'eval-source-map';
  config.devServer = {
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  };
}

module.exports = config;
