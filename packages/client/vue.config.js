
const path = require('path')
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
  }
}
