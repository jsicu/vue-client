/*
 * @Author: linzq
 * @Date: 2021-02-20 16:07:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-24 23:09:10
 * @Description:
 */
const path = require('path')
// gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 大文件定位
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const defaultSettings = require('./src/config')

const name = defaultSettings.title || '案例演示' // page title
const Timestamp = new Date().getTime()

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
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240字节
        minRatio: 1, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }),
      // 生产环境移除console
      process.env.NODE_ENV === 'production'
        ? new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                // 删除注释
                comments: false
              },
              compress: {
                drop_console: true,
                drop_console: true //清除console语句
                // pure_funcs: ['console.log'] // 自定义去除函数
              }
            },
            sourceMap: false
          })
        : () => {}
    ],
    externals: {
      BMap: 'BMap',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts',
      'element-ui': 'ELEMENT'
    },
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
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        //{ bypassOnDebug: true }
        mozjpeg: { progressive: true, quality: 65 }, // Compress JPEG images
        optipng: { enabled: false }, // Compress PNG images
        pngquant: { quality: [0.65, 0.9], speed: 4 }, // Compress PNG images
        gifsicle: { interlaced: false } // Compress GIF images
        // webp: { quality: 75 } // Compress SVG images
      })
      .end()

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
