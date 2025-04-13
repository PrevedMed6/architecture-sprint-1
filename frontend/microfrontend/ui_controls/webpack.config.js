const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3004/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      'user_context': path.resolve('../user_context'),
    },
  },

  devServer: {
    port: 3004,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // Преобразование в base64 для маленьких файлов
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "ui_controls",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './PopupWithForm': './src/components/PopupWithForm.js',
        './ImagePopup': './src/components/ImagePopup.js',
        './InfoTooltip': './src/components/InfoTooltip.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: false,
        },
        'user_context': {
          import: 'user_context',
          requiredVersion: require('../user_context/package.json').version,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
