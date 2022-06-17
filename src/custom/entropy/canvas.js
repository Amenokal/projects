export function draw(points, edges, triangles){

    const cvs = document.getElementById("cvs");
    const ctx = cvs.getContext("2d");



    // 0. CLEAR CANVAS

    ctx.clearRect(0, 0, cvs.width, cvs.height);



    // 1. FILL TRIANGLES

    triangles.forEach((triangle) => {
        ctx.fillStyle = triangle.color;

        ctx.beginPath();
        ctx.moveTo(triangle.points[0].x, triangle.points[0].y);
        ctx.lineTo(triangle.points[1].x, triangle.points[1].y);
        ctx.lineTo(triangle.points[2].x, triangle.points[2].y);
    
        ctx.closePath();
        ctx.fill();
    })



    // 2. STROKE EDGES

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    edges.forEach((edge) => {
        ctx.beginPath();

        ctx.moveTo(edge[0].x, edge[0].y);
        ctx.lineTo(edge[1].x, edge[1].y);

        ctx.closePath();
        ctx.stroke();
    })



    // 3. DRAW POINTS

    // ctx.lineWidth = 1;
    // for(let point of points){
    //     ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];

    //     ctx.beginPath();
    //     ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    //     ctx.fill()
    //     ctx.stroke();
    // }
}
