/*
 * @Author: linzq
 * @Date: 2021-02-20 16:07:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-08 09:23:59
 * @Description:
 */
const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const defaultSettings = require('./src/config')

const name = defaultSettings.title || '案例演示' // page title
const Timestamp = new Date().getTime()

console.log(process.env.VUE_APP_Version)
console.log(defaultSettings.title)

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  pages: {
    main: {
      entry: 'src/pages/main/main.js',
      template: 'public/index.html'
    },
    login: 'src/pages/login/main.js',
    index: 'src/pages/login/main.js'
  },
  publicPath: './',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  configureWebpack: {
    name,
    output: {
      // [模块名称.版本号.时间戳]
      filename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
    // plugins: [
    //   new MiniCssExtractPlugin({
    //     // 打包后css文件名 [模块名称.版本号.时间戳]
    //     filename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`,
    //     chunkFilename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`
    //   })
    // ],
    resolve: {
      alias: {
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@pages': resolve('src/pages'),
        '@mainView': resolve('src/pages/main/view')
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.module.rule('svg').uses.clear()
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域
  devServer: {
    port: 3999, // 端口
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
      ]
    })
}
