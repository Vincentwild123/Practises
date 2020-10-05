var express = require('express');
var router = express.Router();
//引入解析post请求体模块
var log = require('log4node')
var worker = require("../translator/worker")
const bodyParser = require('body-parser');
const fs = require("fs")
const connection = require("../mysql")
/*
POST请求，请求体(body)的内容，常见的类型有json、表单、字符串、二进制数据、文件。 
分别对应请求头中的请求体类型(Content-Type)为：
类型：    Content-Type:                       解析模块：
json      application/json                   json()
表单      application/x-www-form-urlencoded   urlencoded()
字符串    text/plain                          text()
二进制    application/octet-stream            raw()
文件      multipart/form-data                 无
文件类型文件可以使用  multiparty 模块进行解析
*/

//创建二进制数据解析对象rawParser
const rawParser = bodyParser.raw();

//文件名生成函数
function getFileName() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes() + 1; //获取当前分钟数(0-59)
  let second = date.getSeconds() + 1; //获取当前秒数(0-59)
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return year + month + day + "-" + hour + minute + second + ".pcm";
}


//get请求接口
router.get('/', function (req, res, next) {
  res.send("接口正常处理GET请求")
});

//post请求接口
router.post('/', rawParser, function (req, res, next) {

  let fileName = getFileName();
  //写入buffer缓冲区文件
  fs.writeFile(`./pcm/${fileName}`, req.body, function (err, data) {
    //如果写入错误 打印错误
    if (err) {
      return console.error(err);
    }
    //写入成功 则将新文件信息添加进数据库 并且连接科大讯飞接口进行实时翻译
    log.info("成功写入语音文件 ：" + fileName)
    let addSql = `INSERT INTO PCM_new(path) VALUES(\"${fileName}\")`;
    connection.query(addSql, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }
      log.info("数据库插入成功！");
      //向客户端返回消息
    
      let answer = worker.A("./pcm/"+fileName);
      res.send(answer);
    });
  })


  //将文件路径插入数据库并调用转换接口进行转换

});
module.exports = router;



