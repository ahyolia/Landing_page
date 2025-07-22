const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Point d'entrée pour le JavaScript
  output: {
    filename: 'bundle.[contenthash].js', // Ajout de contenthash pour le cache
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Nettoie le dossier dist avant chaque build
    assetModuleFilename: 'assets/[name][ext]', // Structure pour les fichiers statiques
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Gestion des fichiers JavaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Compatibilité avec les navigateurs modernes
          },
        },
      },
      {
        test: /\.css$/, // Gestion des fichiers CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // Exclure .ico explicitement ici
        type: 'asset/resource',
      },
      {
        test: /\.ico$/i, // Règle séparée pour .ico sans optimisation
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Fichier HTML source
      favicon: './favicon.png', // Inclusion du favicon
    }),
    new ImageMinimizerPlugin({
      test: /\.(png|jpe?g|gif)$/i, // Exclure .ico
      exclude: [/favicon\.png/i], // Exclusion explicite de favicon.png
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['imagemin-mozjpeg', { quality: 70 }], // Compression JPEG
            ['imagemin-pngquant', { quality: [50, 80] }], // Compression PNG
          ],
        },
      },
    }),
  ],
  mode: 'production', // Optimisation pour la production
  optimization: {
    minimize: true, // Activer la minification
  },
  devtool: 'source-map', // Générer des source maps pour le débogage
};