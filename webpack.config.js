const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/'),
  },
  module: {
    rules: [
      {test: /\.m?js$/, exclude: /(node_modules)/, use: {loader: 'babel-loader', options: {presets: ['@babel/preset-env']}}},
      {test: /\.less$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']},
      {test: /\.(?:|ttf)$/, use: [{loader: 'file-loader', options: {name: `fonts/[name].[ext]`, publicPath: "../",}}]}
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      filename: '[name].html',
      template: 'source/main.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "source/img", to: "img" },
      ],
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: 'build', index: "main.html"},
      files: ['source/**/*.js', 'source/**/*.html', 'source/**/*.less',],
      ui: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};