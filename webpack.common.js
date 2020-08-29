const path = require('path');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')()]
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(pmg|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: env == 'production' ? '[name].css' : '[name].[hash]css',
      chunkFilename: env == 'production' ? '[id].[hash].css' : '[id].[hash].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', ],
  }
};