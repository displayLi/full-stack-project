module.exports = {
    devServer: {
        port: 8088,
        open: true,
        host: '0.0.0.0',
        // proxyLabel 跨域
        // proxy: {
        //     '/api': {
        //         target: 'http://api.link97.com:8085',
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    },

}