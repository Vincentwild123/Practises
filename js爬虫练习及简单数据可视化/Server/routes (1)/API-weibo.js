var express = require('express');
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
/* GET home page. */
router.get('/', function (req, resp, next) {
     console.log("微博热搜TOP50接口被访问");
     var NewsArray = [];
     axios.get("https://s.weibo.com/top/summary?Refer=top_hot")
          .then(function (res) {
               $ = cheerio.load(res.data);
               var item = $("li span");
               for (let i = 1; i < item.length; i++) {
                    let NewsData = {};
                    let title = item[i].children[0].data;
                    let heat = item[i].children[1].children[0].data
                    NewsData.title = title;
                    NewsData.heat = heat;
                    NewsArray.push(NewsData);
               }
               resp.send(NewsArray);
          })
          .catch(function (error) {
               console.log(error);
               resp.send("微博访问失败");
          });
});
module.exports = router;
