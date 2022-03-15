module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 解决引入less样式报错
        javascriptEnabled: true
      }
    }
  }
}
