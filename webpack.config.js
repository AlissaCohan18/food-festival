//webpack uses Node.js to build our application, so we will use the path & require modules
const path = require("path");
const webpack = require("webpack");

//config file isn't necessary, but want to use it to be specific w/ how webpack will function

module.exports = {
  //The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
  entry: "./assets/js/script.js",
  //webpack takes the entry point, bundles code, & outputs bundled code to folder specified (dist)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  //this let's webpack know to use plugins (which in this case is the jQuery package)
  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  //provide mode we want webpack to run (default for webpack is to run in "production" mode)
  mode: "development",
};
