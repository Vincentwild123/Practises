var express = require('express');
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
/* GET home page. */
router.get('/', function (req, resp, next) {
    console.log("必应壁纸接口被访问");
    axios.get("https://bing.ioliu.cn/")
        .then(function (res) {
            var My_data = [];
            $ = cheerio.load(res.data);
            var item = $(".item img");
            for (let i = 0; i < item.length; i++) {
                console.log(item[i].attribs.src);
                My_data.push(item[i].attribs.src);
            }

            resp.send(item[0].attribs.src);
        })
        .catch(function (error) {
            console.log(error);
            resp.send("必应壁纸访问失败");
        });
});
module.exports = router;
