//webpack uses Node.js to build our application, so we will use the path & require modules
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

//config file isn't necessary, but want to use it to be specific w/ how webpack will function

const config = {
  //The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  //webpack takes the entry point, bundles code, & outputs bundled code to folder specified (dist)
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  devServer: {
    static: {

      directory: __dirname,
    },

  },
  module: {
    rules: [
      {
        //use the test property to find a regex (any image file with jpg, png or gif extension)
        //targeting carousel images to optimize
        test: /\.(png|jpe?g|gif)$/i,
        //add the use property where the actual loader is implemented
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  //this let's webpack know to use plugins (which in this case is the jQuery package)
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      //with value set to "static" the report outputs to an HTML file in the dist folder; could also
      //set to "disable" to temp stop the reporting & automatic opening of this report in browser
      analyzerMode: "static",
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      //specify homepage for the PWA relative to the location of the manifest file
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
  //provide mode we want webpack to run (default for webpack is to run in "production" mode)
  mode: "development",
};

module.exports = config;
