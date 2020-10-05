<template>
  <div id="app">
    <Content></Content>
  </div>
</template>

<script>
import Content from './components/Content'
export default {
  name: 'App',
  components: {
    Content
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  height:100vh;
  background: url("../static/ing.jpg") no-repeat;
  background-size: cover;
}
</style>
