var express = require('express');
var router = express.Router();
var axios = require("axios");
/* GET home page. */
router.get('/', function (req, resp, next) {
    console.log("知乎热搜TOP10接口被访问");
    axios.get("https://www.zhihu.com/api/v4/search/top_search")
        .then(function (res) {
            var my_data = [];
            for (let i = 0; i < res.data.top_search.words.length; i++) {
                let obj = {};
                obj.title = res.data.top_search.words[i].query;
                obj.detail = res.data.top_search.words[i].display_query;
                my_data.push(obj);
            }
            resp.json(my_data);
        })
        .catch(function (error) {
            console.log(error);
            resp.send("知乎网站接口访问出错");
        });
});
module.exports = router;
