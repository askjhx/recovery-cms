let env = 'prod'

let devConfig = {
    aliOssUpload: 'https://recovery-service.oss-cn-guangzhou.aliyuncs.com/',
    baseAPI: 'http://127.0.0.1:3000/'
}

let prodConfig = {
    aliOssUpload: 'https://recovery-service.oss-cn-guangzhou.aliyuncs.com/',
    baseAPI: 'https://cms.jin-quan.tech/recovery/'
}

let config 
if(env === 'prod')
    config = prodConfig
else
    config = devConfig

export default config
