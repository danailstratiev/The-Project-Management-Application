const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './scripts/index.ts',
  output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist')
},
devServer: {
  contentBase: './dist',
  open: true
},
module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        configFile: 'tsconfig.webpack.json'
      }
    },
    {
      test: /\.css$/,
      // use:[{ loader: 'style-loader' }, { loader: 'css-loader' }],
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    },
  ]
},
resolve: {
  extensions: ['.tsx', '.ts', '.js', '.css'],
},
plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Project Management'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
      publicPath: '/'
    }),
    // new ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery'",
    //   "window.$": "jquery"
    // })
  ],
};






