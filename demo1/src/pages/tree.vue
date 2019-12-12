
<template>
  <div>
    <div id="svgcontainer"></div>

    <!-- 元素g是用来组合对象的容器。添加到g元素上的变换会应用到其所有的子元素上。
    添加到g元素的属性会被其所有的子元素继承-->
    <!-- <svg width="100%" height="100%" viewBox="0 0 95 50" xmlns="http://www.w3.org/2000/svg">
      <g stroke="green" fill="white" stroke-width="5">
        <circle cx="25" cy="25" r="15" />
        <circle cx="40" cy="25" r="15" />
        <circle cx="55" cy="25" r="15" />
        <circle cx="70" cy="25" r="15" />
      </g>
    </svg>-->
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "tree",
  data() {
    return {
      root: null
    };
  },
  mounted() {
    this.initSvg();
  },
  methods: {
    getRoot() {},
    initSvg() {
      let width = 500,
        height = 500;

      let svg = d3
        .select("#svgcontainer")
        .append("svg") //插入SVG
        .attr("width", width) //设置属性
        .attr("height", height) //设置属性
        .append("g") //插入g元素
        .attr("transform", "translate(50,0)");

      // 2.生成树状布局，设置尺寸 d3.layout.tree
      let tree = d3.layout.tree()
      .size([width, height - 200]);

      // 3.对角线生成器
      // d3.svg.diagonal对角线生成器 v5 已更换
      // diagonal.projection 设置或选择一个点作为转换
      let diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

      //请求数据 json()基于ajax， v5 更改为promise
      d3.json("/data/city.json", function (err, root) {
          // a) 获取节点数组 nodes 和 连接数组 links
            var nodes = tree.nodes(root);
            var links = tree.links(nodes);

            // b) 生成连线
            let link = svg.selectAll('.link')
                .data(links)
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr('d', diagonal)
      })

    }
  }
};
</script>
<style>

</style>