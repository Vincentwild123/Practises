/**
 *
 * 运行前：请先填写Appid、APIKey、APISecret
 *
 * 实时转写调用demo
 * 此demo只是一个简单的调用示例，不适合用到实际生产环境中
 * 
 * @author vincent
 *
 */
const CryptoJS = require('crypto-js')
const WebSocket = require('ws')
const fs = require("fs")
var log = require('log4node')
//配置
const config = {
    // 请求地址
    hostUrl: "wss://rtasr.xfyun.cn/v1/ws",
    //在控制台-我的应用-实时语音转写获取
    appid: "5e4f7d6f",
    //在控制台-我的应用-实时语音转写获取
    apiKey: 'd33da2cabef0a07857394e1c5e753780',
    highWaterMark: 1280
}
function getSigna(ts) {
    let md5 = CryptoJS.MD5(config.appid + ts).toString()
    let sha1 = CryptoJS.HmacSHA1(md5, config.apiKey)
    let base64 = CryptoJS.enc.Base64.stringify(sha1)
    return encodeURIComponent(base64)
}
function A(fileName) {
    // 得到识别结果后进行处理，仅供参考，具体业务具体对待
    let rtasrResult = []
    // 获取当前时间戳
    let ts = parseInt(new Date().getTime() / 1000)
    let wssUrl = config.hostUrl + "?appid=" + config.appid + "&ts=" + ts + "&signa=" + getSigna(ts)
    //建立websocket连接
    let ws = new WebSocket(wssUrl)
    //!连接建立成功触发open事件
    ws.on('open', (event) => {
        log.info("成功建立连接！")
    })
    //!意外故障发生触发error事件
    ws.on('error', (err) => {
        log.error("握手阶段出现错误: " + err)
    })
    //!连接关闭时触发close事件
    ws.on('close', () => {
        log.info('连接已经关闭！')
    })
    // !服务器返回数据触发message事件
    ws.on('message', (data, err) => {
        if (err) {
            console.log("服务器发生错误！")
            log.info(`err:${err}`)
            return
        }
        let res = JSON.parse(data)
        switch (res.action) {
            //!发生错误
            case 'error':
                log.info(`error code:${res.code} desc:${res.desc}`)
                break
            //!确认握手成功
            case 'started':
            
                // log.info("如果没有数据传输，连接将在15秒后关闭")
                // let time = setInterval(() => {
                //     let readerStream = fs.createReadStream(fileName, {
                //         highWaterMark: config.highWaterMark
                //     })
                //     readerStream.on("data", (chunk) => {
                //         ws.send(chunk)
                //     })
                //     readerStream.on("end", () => {
                //     })
                // }, 3000);
                // 开始读取音频文件并进行传输
                // setTimeout(function () {
                //     clearInterval(time);
                //     // ws.send("{\"end\": true}")
                // }, 30000);
                let readerStream = fs.createReadStream(fileName, {
                    highWaterMark: config.highWaterMark
                })
                readerStream.on("data", (chunk) => {
                    ws.send(chunk)
                })
                readerStream.on("end", () => {
                    ws.send("{\"end\":true}")
                })
                break
            case 'result':
                let str = ''
                let data = JSON.parse(res.data)
                rtasrResult[data.seg_id] = data
                // 把转写结果解析为句子
                if (data.cn.st.type == 0) {
                    rtasrResult.forEach(i => {
                        i.cn.st.rt.forEach(j => {
                            j.ws.forEach(k => {
                                k.cw.forEach(l => {
                                    str += l.w
                                })
                            })
                        })

                    })
                    log.info("转换结果：" + str);
                }
                return str;
        }
    })
}
exports.A = A;