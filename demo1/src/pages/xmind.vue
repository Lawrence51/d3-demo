
<template>
  <div>
    <div id="xmindChart"></div>
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
    initSvg() {
      let width = 800,
        height = 600;
      let xPadding = { left: 80, right: 50, top: 20, bottom: 20 };
      let svg = d3
        .select("#xmindChart")
        .append("svg") //插入SVG
        .attr("width", width + xPadding.left + xPadding.right) //设置属性
        .attr("height", height + xPadding.top + xPadding.bottom) //设置属性
        .append("g") //插入g元素
        .attr("transform", `translate(${xPadding.left},${xPadding.top})`);
      console.log(svg)
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
        //第一个点初始位置 对角线的转换
        root.x0 = height / 2;
        root.y0 = 0;

        //第一次调用绘制函数
        redraw(root)

        function redraw(source) {
          // a) 获取节点数组 nodes 和 连接数组 links
          let nodes = tree.nodes(root);
          let links = tree.links(nodes);

          //计算节点坐标 平滑过渡 并且让节点与深度正相关
          nodes.forEach(d => (d.y = d.depth * 180)); // depth系数

          //节点处理
          let nodeUpdate = svg.selectAll(".node").data(nodes, d => d.name);
          let nodeEnter = nodeUpdate.enter();
          let nodeExit = nodeUpdate.exit();

          //节点enter部分的处理方法
          // 1.添加g元素
          // 2.设置类
          // 3.绑定点击事件
          // 4.调用绘制函数
          // 5.添加圆圈
          // 6.添加文本

          let enterNodes = nodeEnter
            .append("g")
            .attr("class", "node")
            .attr(
              "transform",
              d => "translate(" + source.y0 + "," + source.x0 + ")"
            )
            .on("click", d => {
              console.log("~~~~~", d);
              toggle(d);
              redraw(d); //每次操作都要重置
            });

          //添加圆圈 未显示出来
          enterNodes
            .append("circle")
            .attr("r", 0) // 初始状态为0 后update才出现
            .style("fill", d => (d._children ? "red" : "#fff"));

          //添加文本 未显示出来
          enterNodes
            .append("text")
            .text(d => d.name)
            .attr("dx", d => (d.children || d._children ? -14 : 14))
            .attr("dy", 4)
            .attr("text-anchor", d =>
              d.children || d._children ? "end" : "start"
            )
            .style("fill-opacity", 0);

          // 节点update部分的处理方法 过渡 设置位置 上面的圆圈和文本显示
          let updateNodes = nodeUpdate
            .transition()
            .duration(500)
            .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

          // 显示圆圈
          updateNodes
            .select("circle")
            .attr("r", 6)
            .style("fill", d=>d._children ? "red" : "#fff");
          //显示文本
          updateNodes.select("text").style("fill-opacity", 1);

          // c.4 节点 Exit 部分处理方法 过渡带自己的位置 删除
          var exitNodes = nodeExit
            .transition()
            .duration(500)
            .attr(
              "transform",
              d => "translate(" + source.y + "," + source.x + ")"
            )
            .remove();

          // 圈圈半径为0
          exitNodes.select("circle").attr("r", 0);

          // 文本透明度为0
          exitNodes.select("text").style("fill-opacity", 0);

          // d 连线的处理
          // d.1 获取连线的三个选择集
          let linkUpdate = svg
            .selectAll(".link")
            .data(links, d => d.target.name);
          let linkEnter = linkUpdate.enter();
          let linkExit = linkUpdate.exit();

          // d.2 连线Enter 部分的处理 插入路径  添加类
          linkEnter
            .insert("path", ".node")
            // 设置类
            .attr("class", "link")
            // 开始绘制点
            .attr("d", d => {
              var o = {
                x: source.x0,
                y: source.y0
              };
              return diagonal({
                source: o,
                target: o
              }); // 刚开始没有这个线 所以source和target同一个点
            })
            .transition()
            .duration(500)
            // 使用对角线生成器
            .attr("d", diagonal);

          // d.3 连线 update部分处理
          linkUpdate
            .transition()
            .duration(500)
            .attr("d", diagonal);

          // 连线 exit部分处理
          linkExit.transition()
            .duration(500)
            .attr("d", function(d) {
              var o = {
                x: source.x,
                y: source.y
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .remove();

          // 保存当前节点坐标 ，更新使用
          nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y
          })
        }
      });
      function toggle(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      }
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