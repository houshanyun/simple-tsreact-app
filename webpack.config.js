const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 3000,
    compress: true,
    open: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    //指定されている拡張子のファイルはimportの際に拡張子を省略できる
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/base.html",
    }),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
