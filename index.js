
class HtmlWebpackChunkPrefix {
  constructor(options) {
    this.prefix = options.prefix;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('html-webpack-chunk-prefix-plugin', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tap('html-webpack-chunk-prefix-plugin', htmlPluginData => {
        const { head, body } = htmlPluginData;
        head.forEach(tag => this.processTag(tag));
        body.forEach(tag => this.processTag(tag));
      });
    });
  }

  processTag(tag){
    if (tag.tagName === 'script' && tag.attributes.src) {
      tag.attributes.src = this.prefix + tag.attributes.src
    }
    else if (tag.tagName === 'link' && tag.attributes.href) {
      tag.attributes.href = this.prefix + tag.attributes.href
    }
  }
}

module.exports = HtmlWebpackChunkPrefix;
