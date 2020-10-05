<template>
  <div class="content">
    <h1 class="TOP">微博热搜实时榜TOP50</h1>
    <div class="data">
      <h3>第一名：<strong>{{Weibo[0].title}}</strong></h3>
      <button @click="showzhu">显示柱状图</button>
      <button @click="showbing">显示饼状图</button>
    </div>
    <div class="detail">
      <ul class="items">
        <li v-for="(item,index) in Weibo" :key="item.index">
          <span class="paiming">排名：{{index+1}}</span>
          <span class="title">
            标题：
            <em>{{item.title}}</em>
          </span>
          <span class="heat">
            热度：
            <em>{{item.heat}}</em>
          </span>
        </li>
      </ul>
    </div>
    <div id="chart-zhuzhuang"></div>
    <div id="chart-bingzhuang"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      Weibo: ["NULL"]
    };
  },
  mounted() {
    var that = this;
    axios
      .get("http://localhost:3000/API-Weibo")
      .then(function(res) {
        console.log(res);
        that.$data.Weibo = res.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    showzhu() {
      var that = this;
      var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart-zhuzhuang"));
      // 绘制图表
      var my_title = [];
      var my_heat = [];
      for (let i = 0; i < 5; i++) {
        my_title.push(that.Weibo[i].title);
        my_heat.push(that.Weibo[i].heat);
      }
      myChart.setOption({
        title: {
          text: "热搜TOP5热度柱状图"
        },
        legend: {
          data: ["话题"]
        },
        tooltip: {},
        xAxis: {
          data: my_title
        },
        yAxis: {},
        series: [
          {
            name: "话题",
            type: "bar",
            data: my_heat
          }
        ]
      });
    },
    showbing() {
      var that = this;
      var echarts = require("echarts");
      var my_data = that.Weibo.slice(0, 5);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart-bingzhuang"));
      // 绘制图表
      myChart.setOption({
        series: [
          {
            itemStyle: {
              // 阴影的大小
              shadowBlur: 100,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: "rgba(0, 0, 0, 0.3)"
            },
            name: "访问来源",
            type: "pie",
            radius: "70%",
            roseType: "10",
            data: [
              { value: my_data[0].heat, name: my_data[0].title },
              { value: my_data[1].heat, name: my_data[1].title },
              { value: my_data[2].heat, name: my_data[2].title },
              { value: my_data[3].heat, name: my_data[3].title },
              { value: my_data[4].heat, name: my_data[4].title }
            ]
          }
        ]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 strong{
  font-size: 30px;
  color: chartreuse;
}
ul{
  padding: 0;
  text-align: left;
  list-style: none;
}
#chart-zhuzhuang {
  position: absolute;
  left: 440px;
  top: 60px;
  border: 1px black;
  width: 1000px;
  height: 600px;
}
#chart-bingzhuang {
  position: absolute;
  left: 440px;
  top: 600px;
  border: 1px black;
  width: 1000px;
  height: 600px;
}
button {
  margin: 0px 10px;
  width: 120px;
  height: 40px;
  border: 3px rgb(63, 247, 7);
  box-shadow: 0px 5px 2px rgb(8, 8, 8);
  translate: all;
}
button:hover{
  transform: translateY(-5px);
  background-color: rgb(18, 252, 232);
  cursor: pointer;
}
span {
  display: inline-block;
  height: 20px;
  width: 240px;
}
span:nth-child(1) {
  width: 100px;
}
span:nth-child(2) em {
  color: rgb(8, 108, 223);
}
.content {
  border: 4px rgb(248, 57, 57);
  text-align: left;
  font-size: 12px;
}
span:nth-child(3) em {
  color: red;
}
.detail {
  margin-top: 30px;
}
</style>
