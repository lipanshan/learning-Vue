module.exports = {
  productionSourceMap: false,
  //打包后不产生sourcemap
  publicPath: process.env.NODE_ENV === 'production' ? '/certificateAuth/' : '/',
  //Vue CLI 会假设你的应用是被部署在一个域名的根路径上。
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  // 例如 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  indexPath: 'index.html',
  devServer: {
    host: '193.168.14.32',
    port: 8080
  },
  outputDir: 'dist'
}
