// get *path* module from nodejs.
const path = require("path");
// resolve the *dist* path.
const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  /**
   * Output mode.
   *  production...
   *    minified files as possible.
   *  development...
   *    bundle files debuggable.
   */
  mode: "development",

  /**
   * Mapping between original source and bundled file.
   */
  devtool: "inline-source-map",

  /**
   * Automatially build when changed files.
   */
  watch: true,

  /**
   * Ignore file or direcotry for *watch*.
   */
  watchOptions: {
    ignored: [/node_modules/, "./src/__test__/"],
  },

  /**
   * Filename of entry point for bundling.
   */
  entry: "./src/index.js",

  /**
   * Output configurations.
   */
  output: {
    /**
     *  output.path
     *  directory for output file(include path.).
     *  __dirname
     *    variable that preset on nodejs.
     *    it stored absolute path of *this* file.
     *    ex) c:/user/app
     *  output.filename
     *  filename of output.
     */
    path: outputPath,
    filename: "main.js",
  },

  /**
   * Configuration for webpack-dev-server.
   *  contentBase
   *    The location of file that will be automatically
   *    executed when the server is run.
   */
  devServer: {
    contentBase: outputPath,
    port: 3000,
  },

  /**
   * Setting for compile before bundling files.
   * this complier called *loader*.
   * test
   *  assign the file type using by reguler expression.
   * exclude
   *  exclude the directory or files on bundling.
   * use
   *  select loader.
   *    loader... loader name.
   *    options... configuration the loader.
   */
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-flow",
              ],
              plugins: [
                "@babel/plugin-syntax-jsx",
                "@babel/transform-runtime",
                "transform-flow-strip-types",
                "transform-class-properties",
              ],
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
    ],
  },

  /**
   * These extensions can be skipped on import syntax.
   */
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
};
