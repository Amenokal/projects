import Triangle from './Triangle';

// ========
// DELAUNAY
// ========

// 1. EDGES
function nextHalfedge(e) { return (e % 3 === 2) ? e - 2 : e + 1; }

export function getEdges(points, delaunay) {
    const edges = [];
    for (let e = 0; e < delaunay.triangles.length; e++) {
        if (e > delaunay.halfedges[e]) {
            const p = points[delaunay.triangles[e]];
            const q = points[delaunay.triangles[nextHalfedge(e)]];
            edges.push([p, q])
        }
    }
    return edges;
}

// 2. TRIANGLES
function edgesOfTriangle(t) { return [3 * t, 3 * t + 1, 3 * t + 2]; }

function pointsOfTriangle(delaunay, t) {
    return edgesOfTriangle(t).map(e => delaunay.triangles[e]);
}

export function getTriangles(points, delaunay) {
    const triangles = [];
    for (let t = 0; t < delaunay.triangles.length / 3; t++) {
        const triangle = new Triangle(pointsOfTriangle(delaunay, t).map(p => points[p]));
        triangles.push(triangle);
    }
    return triangles;
}

function triangleOfEdge(e)  { return Math.floor(e / 3); }

// function trianglesAdjacentToTriangle(delaunay, t) {
//     const adjacentTriangles = [];
//     for (const e of edgesOfTriangle(t)) {
//         const opposite = delaunay.halfedges[e];
//         if (opposite >= 0) {
//             adjacentTriangles.push(triangleOfEdge(opposite));
//         }
//     }
//     return adjacentTriangles;
// }

// 3. VORONOI
function circumcenter(a, b, c) {
    const ad = a.x * a.x + a.y * a.y;
    const bd = b.x * b.x + b.y * b.y;
    const cd = c.x * c.x + c.y * c.y;
    const D = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    return [
        1 / D * (ad * (b.y - c.y) + bd * (c.y - a.y) + cd * (a.y - b.y)),
        1 / D * (ad * (c.x - b.x) + bd * (a.x - c.x) + cd * (b.x - a.x)),
    ];
}
function triangleCenter(points, delaunay, t) {
    const vertices = pointsOfTriangle(delaunay, t).map(p => points[p]);
    return circumcenter(vertices[0], vertices[1], vertices[2]);
}
export function forEachVoronoiEdge(points, delaunay, callback) {
    for (let e = 0; e < delaunay.triangles.length; e++) {
        if (e < delaunay.halfedges[e]) {
            const p = triangleCenter(points, delaunay, triangleOfEdge(e));
            const q = triangleCenter(points, delaunay, triangleOfEdge(delaunay.halfedges[e]));
            callback(e, p, q);
        }
    }
}
function edgesAroundPoint(delaunay, start) {
    const result = [];
    let incoming = start;
    do {
        result.push(incoming);
        const outgoing = nextHalfedge(incoming);
        incoming = delaunay.halfedges[outgoing];
    } while (incoming !== -1 && incoming !== start);
    return result;
}

export function forEachVoronoiCell(points, delaunay, callback) {
    const seen = new Set();  // of point ids
    for (let e = 0; e < delaunay.triangles.length; e++) {
        const p = delaunay.triangles[nextHalfedge(e)];
        if (!seen.has(p)) {
            seen.add(p);
            const edges = edgesAroundPoint(delaunay, e);
            const triangles = edges.map(triangleOfEdge);
            const vertices = triangles.map(t => triangleCenter(points, delaunay, t));

            callback(p, vertices);
        }
    }
}

// ======
// CUSTOM
// ======

// 1. RAW POINTS = [ x1, y1, x2, y2, x3, y3, ...]
export function generateNumbers(nbOfPoints, cvs){
    return [...Array(nbOfPoints)]
        .map(() => [
            Math.floor(Math.random() * cvs.x),
            Math.floor(Math.random() * cvs.y)
        ])
}

// 2. COORDONNEES = [x, y];
export function generateCoords(array){
    return array.flat();
}

// 3. POINTS = { index, x, y }
export function generatePoints(array){
    let i = 0;
    return array.map((point)=>({
        index: i++,
        x: point[0],
        y: point[1]
    }))
}

// 4. TRIANGLES
export function updatedTriangles(edges, triangles, speed, cvs){
    for(let i=0; i<triangles.length; i++){
        const tgls = [...triangles[i].points];

        tgls.forEach(tgl=>{

            // set random direction for next iteration
            const distance = speed/2;
            const dirX = Math.random()>0.5 ? distance : -distance;
            const dirY = Math.random()>0.5 ? distance : -distance;


            // check if coord escapes the canvas
            if(tgl.x + dirX > cvs.x){
                tgl.x -= Math.abs(dirX);
            } else if(tgl.x - dirX < 0){
                tgl.x += Math.abs(dirX);
            } else {
                tgl.x += dirX;
            }
            
            if(tgl.y + dirY > cvs.y){
                tgl.y -= Math.abs(dirY);
            } else if(tgl.y - dirY < 0){
                tgl.y += Math.abs(dirY);
            } else {
                tgl.y += dirY;
            }

            // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
            // const sign = (p1, p2, p3) => {
            //     return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
            // }

            // const pointInTriangle = (pt, v1, v2, v3) => {
            //     let d1, d2, d3;
            //     let has_neg, has_pos;

            //     d1 = sign(pt, v1, v2);
            //     d2 = sign(pt, v2, v3);
            //     d3 = sign(pt, v3, v1);

            //     has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
            //     has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

            //     return !(has_neg && has_pos);
            // }

            // const newPoint = {x: tgl.x, y: tgl.y};

            console.log(tgls)
        })


    }
    return triangles;
}

export function insidePolygon(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}