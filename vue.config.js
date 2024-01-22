const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = {
    devServer: {
        port: 10000, //配置启动端口
        proxy: { //拦截器
            '/api': {
                target: "http://localhost:8080/ssm",//代理目标地址linux服务器http://47.94.159.168:8080/ssm
                changeOrigin: true,//允许跨源
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}
