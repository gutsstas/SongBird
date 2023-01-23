const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist',),
      filename: 'index/index.js',
      assetModuleFilename: 'assets/[name][ext]',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(mp3|ogg)$/,
          type: 'asset',
          generator: {
            filename: 'assets/[name][ext]'
          }
        },
        {
          test: /\.(jpg|png|svg|jpeg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/Pictures/[name][ext]'
          }
        },
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      filename: 'index/index.html',
      template: './src/pages/index.html',
      favicon : "./assets/Pictures/Bird-1.jpeg",
    })],
  },
  {
    entry: './src/quiz.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'quiz/quiz.js',
      assetModuleFilename: 'assets/[name][ext]',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
      },
      open: true,
      hot: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(mp3|ogg)$/,
          type: 'asset',
          generator: {
            filename: 'assets/[name][ext]'
          }
        },
        {
          test: /\.(jpg|png|svg|jpeg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/Pictures/[name][ext]'
          }
        },
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      filename: 'quiz/quiz.html',
      template: './src/pages/quiz.html',
      favicon : "./assets/Pictures/Bird-1.jpeg",
    })],
},
{
  entry: './src/result.js',
  output: {
    path: path.resolve(__dirname, 'dist',),
    filename: 'result/result.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(mp3|ogg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/Pictures/[name][ext]'
        }
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'result/result.html',
    template: './src/pages/result.html',
    favicon : "./assets/Pictures/Bird-1.jpeg",
  })],
},
{
  entry: './src/gallery.js',
  output: {
    path: path.resolve(__dirname, 'dist',),
    filename: 'gallery/gallery.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(mp3|ogg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/Pictures/[name][ext]'
        }
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'gallery/gallery.html',
    template: './src/pages/gallery.html',
    favicon : "./assets/Pictures/Bird-1.jpeg",
  })],
}
]