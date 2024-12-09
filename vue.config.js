const { defineConfig } = require('@vue/cli-service')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4KB的字体文件将被转换为Base64
        name: 'fonts/[name].[hash:8].[ext]'
      });
  },
  devServer:{
    proxy:{
        ["/dev-api"]:{
        target:'http://localhost:8888',
          changeOrigin:true,
            pathRewrite: {
                ['^' + "/dev-ap"]: ''
            }
        }
    }

}
};
