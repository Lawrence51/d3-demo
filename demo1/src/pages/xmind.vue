
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
  name: "xmind",
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
      let width = 800,
        height = 600;
      let xPadding = { left: 80, right: 50, top: 20, bottom: 20 };
      let svg = d3
        .select("#svgcontainer")
        .append("svg") //插入SVG
        .attr("width", width + xPadding.left + xPadding.right) //设置属性
        .attr("height", height + xPadding.top + xPadding.bottom) //设置属性
        .append("g") //插入g元素
        .attr("transform", `translate(${xPadding.left},${xPadding.top})`);

      // 2.生成树状布局，设置尺寸 d3.layout.tree
      let tree = d3.layout.tree().size([height, height]);

      // 3.对角线生成器
      // d3.svg.diagonal对角线生成器 v5 已更换
      // diagonal.projection 设置或选择一个点作为转换 90度旋转
      let diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.y, d.x];
      });

      //请求数据 json()基于ajax， v5 更改为promise
      d3.json("/data/web.json", function(err, root) {
        // a) 获取节点数组 nodes 和 连接数组 links
        var nodes = tree.nodes(root);
        var links = tree.links(nodes);

        // b) 生成连线
        let link = svg
          .selectAll(".link") //获取dom，此刻没有通过enter获取，仍旧有效用
          .data(links) //遍历
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("d", diagonal);

        //生成节点
        let node = svg
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", d => {
            return "translate(" + d.y + "," + d.x + ")";
          });

        // d） 加圆圈
        node.append("circle").attr("r", 5);
        // e) 加上文本
        node
          .append("text")
          .text(d => d.name)
          .attr("dx", d => (d.children ? -15 : 15)) //根绝是否有子节点来决定文字展示的位置，以免遮盖子节点 横向
          //.attr('dy', 0) //功能同上 纵向 值为0时可不写
          .attr("text-anchor", d => {
            return d.children ? "end" : "start"; // text-anchor属性控制文本样式 start右上 end左下 middle中间
          });
      });
    }
  }
};
</script>
<style>
.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font-size: 12px;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
</style>