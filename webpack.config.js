const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports ={
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      serveIndex: true,
    },
    port: 3000,
    compress: true,
    open: true,
  },
  module: {
    rules:[
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          'ts-loader',
        ],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jax', '.json', '...'] 
    //指定されている拡張子のファイルはimportの際に拡張子を省略できる
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/base.html'
    }),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ]
}
