const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    proxy: 'http://localhost:8080'
  },
  css: {
    loaderOptions: {
      sass: {},
    }
  },
});
