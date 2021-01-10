const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[names].js",
    path: path.resolve(__dirname, "../public/REACT/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /(\.png|jpe?g|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "../images",
        },
      },

      {
        test: /\.webp$/,
        use: [
          "webp-loader",
          {
            loader: "file-loader",
            options: {
              outputPath: "../webp",
            },
          },
        ],
      },

      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          outputPath: "../svgs",
        },
      },
    ],
  },

  //! Uncomment OPTIMIZATION FOR PRODUCTION if you're in production

  // OPTIMIZATION FOR PRODUCTION -- START --
  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     chunks: "all",
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           // get the name. E.g. node_modules/packageName/not/this/part.js
  //           // or node_modules/packageName
  //           const packageName = module.context.match(
  //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
  //           )[1];

  //           // npm package names are URL-safe, but some servers don't like @ symbols
  //           return `npm.${packageName.replace("@", "")}`;
  //         },
  //       },
  //     },
  //   },
  // },
  // OPTIMIZATION FOR PRODUCTION -- END --
};
