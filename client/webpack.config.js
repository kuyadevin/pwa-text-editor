const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Webpack plugin to generate files and inject our bundle
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E.",
      }),

      //Inject our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Create a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "J.E.S.T. Text Editor",
        short_name: "J.E.S.T",
        description: "A text editor app!",
        background_color: "#556b2f",
        theme_color: "#556b2f",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assests", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        //CSS loader
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        //Babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
