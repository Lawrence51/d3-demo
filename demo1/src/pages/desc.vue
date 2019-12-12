
<template>
  <div>
    <p></p>
    <p></p>
    <p></p>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "desc",
  data() {
    return {};
  },
  mounted() {
    // console.log(d3,'d3')
    let p = d3.selectAll("p");
    // console.log(p)
    var arr = [3];

    //更新
    var update = p.data(arr);
    //update 处理方法
    update.text(d => d);
    console.log(update);

    //数组长度大于dom的长度，这部分叫enter
    let enter = update.enter();
    //dom不足进行添加
    enter.append("p").text(d => d);
    console.log(update);

    //数组长度大于dom的长度，这部分叫exit
    let exit = update.exit();
    exit.remove();
    console.log(exit);
  }
};
</script>