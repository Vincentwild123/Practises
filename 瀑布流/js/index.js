var i = 0;//已显示的图片数
img_width = 300;//图片宽度
var margin_top = 30;
var margin_left = 60;
var gap = 20;// 每张图片的间隔 为10px
var datas = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.jpg",
    "./image5.jpg",
    "./image6.jpg",

]
window.onload = function () {
    var box = document.getElementById('wrap');
    var items = box.children;//得到子元素集合
    console.log(items);
    waterFall();

    //对num张照片进行瀑布流布局
    function waterFall() {

        //得到列数 = 页面可视区域宽度 / 图片的宽度
        var pageWidth = getClient().width;
        var itemWidth = img_width;
        var columns = parseInt(pageWidth / (itemWidth + gap));
        var arr = [];//用于判断最小高度的数组
        for (var i = 0; i < items.length; i++) {
            if (i < columns) {
                // 对第一行图片进行布局
                items[i].style.top = margin_top + 'px';
                items[i].style.left = (itemWidth + gap) * i + margin_left + 'px';
                arr.push(items[i].offsetHeight);
            }
            else {
                // 对接下来的图片进行定位
                // 首先要找到数组中最小高度和它的索引
                var minHeight = arr[0];
                var index = 0;
                for (let j = 0; j < arr.length; j++) {
                    if (minHeight > arr[j]) {
                        minHeight = arr[j];
                        index = j;
                    }
                }
                console.log("index:" + index, "i:" + i);//index为高度最小的元素所在列的索引-1
                // 设置下一行的第一个盒子位置
                // top值就是最小列的高度 + gap

                items[i].style.top = arr[index] + gap + margin_top + 'px';
                // left值就是最小列距离左边的距离
                items[i].style.left = items[index].offsetLeft + 'px';
                // 修改最小列的高度
                // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                arr[index] = arr[index] + items[i].offsetHeight + gap;
            }
        }

    }
    window.onscroll = function () {
        if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
            window.alert("更新啦！");
            let i = 0;
            while (i < datas.length) {
                var div = document.createElement("div");
                div.className = "item";
                div.innerHTML = '<img src="' + datas[i] + '" alt="">';
                div.firstChild.style.width = img_width;
                box.appendChild(div);
                i++;
            }
            waterFall();
        }
    }
};
// clientWidth 处理兼容性:获得浏览器可视区域的宽和高
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理 :获得浏览器可视区域 距 整个html文档顶部的距离
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}