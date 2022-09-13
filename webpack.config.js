const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry: './src/app.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
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
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new ESLintPlugin(({
      extensions: ['.ts', '.tsx', '.js'],
      exclude: 'node_modules'
    }))
  ],
  target: 'web',
};
