<template>
  <div class="container">
    <canvas
      id="cvs"
      :height="CVS.y"
      :width="CVS.x"
      @click="addPoint"
      :style="{ border: borderColor }"
    ></canvas>
    <h1 :style="{ color: titleColor }">ENTROPY</h1>
  </div>
</template>

<script>
import Delaunator from "delaunator";
import {
  CVS,
  INITPOINTS,
  SPEED,
  REFRESH,
  getColor,
} from "../custom/entropy/Config";
import {
    generateNumbers,
    generateCoords,
    generatePoints,
    updatedTriangles,
    getEdges,
    getTriangles,
} from '../custom/delaunayHelper';
import { draw } from "../custom/entropy/canvas";

export default {
  setup() {
    const titleColor = getColor();
    const borderColor = `1px dotted ${getColor()}`;

    let numbers = generateNumbers(INITPOINTS, CVS);
    let coords = generateCoords(numbers);
    let points = generatePoints(numbers);

    let delaunay = new Delaunator(coords);
    let edges = getEdges(points, delaunay);
    let triangles = getTriangles(points, delaunay);

    function init() {
        draw(points, edges, triangles);
    }

    function update() {
      setInterval(() => {
        triangles = updatedTriangles(edges, triangles, SPEED, CVS);
        draw(points, edges, triangles);
      }, REFRESH);
    }

    function addPoint(e) {
      const rect = e.target.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left - 2); //x position within the element.
      const y = Math.floor(e.clientY - rect.top - 2); //y position within the element.

      numbers.push([x, y], [x, y], [x, y]);
      coords = generateCoords(numbers);
      points = generatePoints(numbers);

      delaunay = new Delaunator(coords);
      edges = getEdges(points, delaunay);
      triangles = getTriangles(points, delaunay);

      draw(points, edges, triangles);
    }

    return {
      titleColor,
      borderColor,
      CVS,
      init,
      update,
      addPoint,
    };
  },
  mounted() {
    this.init();
    this.update();
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#cvs {
  top: 8%;
  position: absolute;
}

h1 {
  position: absolute;
  top: 84%;
}
</style>
