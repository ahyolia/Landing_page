const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // Copie des images dans /img dans le dossier de sortie
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'img'),
          to: 'img',
        },
      ],
    }),
    // Optimisation des images copié
    new ImageMinimizerPlugin({
      test: /\.(png|jpe?g|gif)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
                        ['mozjpeg', { quality: 90 }],
            ['pngquant', { quality: [0.5, 0.8] }],
          ],
        },
      },
    }),
  ],
  mode: 'production',
};