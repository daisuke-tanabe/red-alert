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
  devServer: {
    port: 3000,
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
