<template>
  <div class="hello">
    <h2>知乎热搜TOP10</h2>
    <ul>
      <li v-for="(item,index) in Zhihu" :key="item.index">
        <span class="paiming">排名：{{index+1}}</span>
        <span class="title">标题：{{item.title}}</span>
        <span class="detail">详情：{{item.detail}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      Zhihu: ['空']
    }
  },
   mounted() {
    var that = this;
    axios
      .get("http://localhost:3000/API-Zhihu")
      .then(function(res) {
        console.log(res);
        that.$data.Zhihu = res.data;
      })
      .catch(error => console.log(error));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  font-size: 14px;
}
ul{
  text-align: left;
}
span{
  display: inline-block;
  width: 260px;
  height: 20px;
}
span:nth-child(1){
  width: 80px;
  height: 20px;
}

</style>
