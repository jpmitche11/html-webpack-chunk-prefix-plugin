
class HtmlWebpackChunkPrefix {
  constructor(options) {
    this.prefix = options.prefix;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('html-webpack-chunk-prefix-plugin', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('html-webpack-chunk-prefix-plugin', htmlPluginData => {
        const { assets } = htmlPluginData;
        const js = assets.js.map(item => this.prefix + item);
        const css = assets.css.map(item => this.prefix + item);
        assets.js = js;
        assets.css = css;
      });
    });
  }
}

module.exports = HtmlWebpackChunkPrefix;
