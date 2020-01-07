
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: config => {
    config.resolve.alias = {
      '@': resolve('./client/src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
    config.entry.app = './client/src/main.js'
  }
}
