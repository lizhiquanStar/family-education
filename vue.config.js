const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 配置全局样式
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        additionalData: `
        @import "@/core/styles/mixins/layout.scss";
        $src: "${process.env.PPS_CDN_SRC}";
        `
      }
    }
  },
  //去掉console
  configureWebpack: config => {
    // 开启 gzip
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
    // 判断为生产模式下，因为开发模式我们是想保存console的
    // if (process.env.NODE_ENV === 'production') {
    //   config.optimization.minimizer.map(arg => {
    //     const option = arg.options.terserOptions.compress
    //     option.drop_console = true
    //     return arg
    //   })
    // }
  }
}
