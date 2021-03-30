const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.join(__dirname, "dist");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackCopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  const basePlugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "static/css/[name].[hash:6].css",
    }),
    new webpack.ProgressPlugin(),
    new WebpackCopyPlugin({
      patterns: [{ from: "./src/_redirects", to: "public" }],
    }),
  ];
  let productionPlugins = [...basePlugins, new CleanWebpackPlugin()];
  return {
    mode: argv.mode,
    entry: ["./src/index.js"],
    output: {
      path: outputPath,
      publicPath: "/",
    },
    devServer: {
      historyApiFallback: true,
      port: 9000,
      hot: true,
    },
    devtool: isDev ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(css|scss|sass)$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            publicPath: "",
            name: "images/[hash]-[name].[ext]",
          },
        },
        {
          test: /\.(mp3|m4a|wav)$/i,
          loader: "file-loader",
          options: {
            publicPath: "",
            name: "audio/[hash]-[name].[ext]",
          },
        },
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {},
          },
        },
      ],
    },
    plugins: isDev ? basePlugins : productionPlugins,
  };
};
