
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    config.resolve.alias = {
      '@': resolve('./src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
    config.entry.app = './src/main.js'
    config.plugins = [...config.plugins,
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.vue$/,
        threshold: 10240,
        minRatio: 0.7
      }),
      new BrotliPlugin({
        filename: '[path].br[query]',
        test: /\.js$|\.css$|\.html$|\.vue$/,
        threshold: 10240,
        minRatio: 0.7
      })
    ]
  }
}
