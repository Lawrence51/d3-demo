<template>
  <div id="app">
    <p></p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  mounted(){
    // console.log(d3,'d3')
    let p = d3.selectAll('p')
    // console.log(p)
    var arr = [3,6,9,12,15]
    
    //更新
    var update = p.data(arr);
    //update 处理方法
    update.text(d=>d)
    console.log(update)

    //数组长度大于dom的长度，这部分使用enter
    let enter = update.enter();
    console.log(update);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
