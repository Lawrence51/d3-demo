<template>
  <div id="app">
    
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
    console.log(d3,'d3')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
