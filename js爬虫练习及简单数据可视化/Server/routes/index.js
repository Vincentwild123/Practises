var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("欢迎访问数据接口服务器");
});
module.exports = router;
