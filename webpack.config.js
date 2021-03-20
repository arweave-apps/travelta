const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminOptipng = require('imagemin-optipng');
const ImageminGifsicle = require('imagemin-gifsicle');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');

// Режим сборки
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// Настраивает оптимизацию webpack
const optimization = () => {
  const config = {
    // Выносит общие библиотеки в отдельный файл
    splitChunks: { chunks: 'all' },
  };

  if (isProd) {
    // Позволяет переопределить минимизатор по умолчанию, предоставляя другой один или несколько настроенных экземпляров
    config.minimizer = [
      // Оптимизирует/минимизирует CSS (по умолчанию он использует cssnano, но можно указать собственный процессор CSS).
      new CssMinimizerPlugin(),
      // Для минимизации JavaScript.
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const getFilename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash:7].${ext}`;

const getStyleLoaders = (loader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      // Если вы хотите использовать css модули раскоментируйте строки ниже
      // options: {
      //   modules: {
      //     localIdentName: isDev
      //       ? '[path][name]__[local]--[contenthash:base64:5]'
      //       : '[contenthash:base64]',
      //   },
      // },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
  ];

  if (loader) {
    loaders.push(loader);
  }

  if (loader === 'sass-loader') {
    loaders.push({
      // Этот загрузчик загрузит ваши ресурсы SASS в каждый required модуль SASS. Таким образом, вы можете использовать общие переменные, миксины и функции во всех стилях SASS, не загружая их вручную в каждый файл

      // https://itnext.io/sharing-sass-resources-with-sass-resources-loader-and-webpack-ca470cd11746
      loader: 'sass-resources-loader',
      options: {
        resources: require(path.join(process.cwd(), 'src/scss/utils.ts')),
      },
    });
  }

  return loaders;
};

const getPlugins = () => {
  const base = [
    // Плагин для очистки/удаления папки сборки (dist)
    new CleanWebpackPlugin(),

    // Плагин eslint вместо устаревшего eslint-loader
    new ESLintPlugin(),

    // Генерирует файл HTML5
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      title: 'Travelta',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        removeRedundantAttributes: isProd,
        useShortDoctype: isProd,
        removeEmptyAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        keepClosingSlash: isProd,
        minifyJS: isProd,
        minifyCSS: isProd,
        minifyURLs: isProd,
      },
    }),

    // Извлекает CSS в отдельные файлы
    new MiniCssExtractPlugin({
      filename: getFilename('css'),
    }),

    // Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon/'),
        },
      ],
    }),

    // Использует Imagemin для сжатия всех изображений в проекте
    new ImageminWebpackPlugin({
      disable: isDev,
      test: /\.(jpe?g|png|gif)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 20, // 0 (worst) to 100 (perfect)
          progressive: true,
        }),
        ImageminOptipng({
          optimizationLevel: 5, // 0 to 7, default - 3
        }),
        ImageminGifsicle({
          optimizationLevel: 2, // 1 to 3, default - 1
          colors: 256, // 2 - 256 количество цветов
        }),
      ],
    }),
  ];

  if (isProd) {
    // Визуализирует размер выходных файлов веб-пакета
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  target: 'web',

  // Место, где webpack рассчитывает начать сборку
  context: path.resolve(__dirname, 'src'),

  // Указывает webpack как использовать его встроенные оптимизации
  mode: isProd ? 'production' : isDev && 'development',

  // Точка входа
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },

  // Точка вывода скомпилированного файла
  output: {
    filename: `${getFilename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // Говорит Webpack какие типы файлов и в каком порядке искать при разрешении модуля
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: ['node_modules'],
  },

  optimization: optimization(),

  // Настройки сервера разработки Webpack
  devServer: {
    historyApiFallback: true,
    watchContentBase: true,
    open: true,
    compress: true,
    hot: isDev,
    port: 3000,
  },

  // Контролирует как генерируются исходные карты
  devtool: isDev ? 'source-map' : false,

  plugins: getPlugins(),

  module: {
    rules: [
      // Script loader
      {
        test: /\.(js)x?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(ts)x?$/i,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // Img loader
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/images/${getFilename('[ext]')}`,
        },
      },
      // SVG
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader', // позволяет импортировать svg как компоненты реакт
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
      // Fonts loader
      {
        test: /\.(ttf|woff|otf|eot|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]',
        },
      },
      // SASS, SCSS loader
      {
        test: /\.(s[ca]ss)$/i,
        use: getStyleLoaders('sass-loader'),
      },
      // CSS loader
      {
        test: /\.css$/i,
        use: getStyleLoaders(),
      },
    ],
  },
};
