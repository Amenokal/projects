import Delaunator from "delaunator";

import {
    generateNumbers,
    generateCoords,
    generatePoints,
    forEachVoronoiEdge,
    forEachVoronoiCell,
    insidePolygon,
  } from "../delaunayHelper";

export default class Voronoi {
    constructor(cells, canvas){
        // CONFIG
        this.cells = cells
        this.canvas = canvas;

        // DATA
        this.numbers = generateNumbers(cells, canvas);
        this.coords = generateCoords(this.numbers);
        this.points = generatePoints(this.numbers);
        this.delaunay = new Delaunator(this.coords);

        // VORONOI
        this.cellEdges = this.voronoiEdges(this.points, this.delaunay);
        this.cells = this.voronoiCells(this.points, this.delaunay);

        // INTERACTION
        this.selectedCell = null;
    }

    voronoiEdges = (points, delaunay) => {
        const edges = [];
        forEachVoronoiEdge(points, delaunay, (e, p, q) => {
            edges.push({
                index: e,
                p1: { x: p[0], y: p[1] },
                p2: { x: q[0], y: q[1] },
            })
        })
        return edges;
    }
        
    voronoiCells = (points, delaunay) => {
        const cells = [];
        forEachVoronoiCell(points, delaunay, (i, vertices) => {
            cells.push({ index: i, vertices: vertices })
        })
        return cells;
    }

    init(){
        const cvs = document.getElementById("cvs2");
        const ctx = cvs.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        this.cellEdges.forEach((edge) => {
            ctx.beginPath();
            ctx.moveTo(edge.p1.x, edge.p1.y);
            ctx.lineTo(edge.p2.x, edge.p2.y);
            ctx.closePath();
            ctx.stroke();
        });
    }    

    colorize(e) {
      const cvs = document.getElementById('cvs2');
      const ctx = cvs.getContext("2d");

      // get mouse location
      const rect = e.target.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left - 2); //x position within the element.
      const y = Math.floor(e.clientY - rect.top - 2); //y position within the element.
      const mouseLocation = [x, y];

    // finds clicked cell
      this.cells.forEach((cell) => {
        cell.vertices.forEach(() => {
          if (insidePolygon(mouseLocation, Array.from(cell.vertices))) {
              this.selectedCell = cell
          }
        });
      });

      // paint cell
      ctx.fillStyle= "red";

      if (this.selectedCell) {
        let target = this.cells.filter((cell) => cell.index === this.selectedCell.index );

        target.forEach((point) => {
          ctx.beginPath();
          ctx.moveTo(point.vertices[0][0], point.vertices[0][1]);

          for (let i = 0; i < point.vertices.length; i++) {
            if (i + 1 < point.vertices.length) {
              ctx.lineTo(point.vertices[i + 1][0], point.vertices[i + 1][1]);
            }
          }
          ctx.closePath();
          ctx.fill();
        });
      }
    }
}