import React from 'react';

function intersect(
    v1x1, v1y1, v1x2, v1y2,
    v2x1, v2y1, v2x2, v2y2
) {
    var d1, d2;
    var a1, a2, b1, b2, c1, c2;
    a1 = v1y2 - v1y1;
    b1 = v1x1 - v1x2;
    c1 = (v1x2 * v1y1) - (v1x1 * v1y2);
    d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
    d2 = (a1 * v2x2) + (b1 * v2y2) + c1;
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;
    a2 = v2y2 - v2y1;
    b2 = v2x1 - v2x2;
    c2 = (v2x2 * v2y1) - (v2x1 * v2y2);
    d1 = (a2 * v1x1) + (b2 * v1y1) + c2;
    d2 = (a2 * v1x2) + (b2 * v1y2) + c2;
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;
    if ((a1 * b2) - (a2 * b1) == 0.0) return false;
    return true;
}

export function setCanvas(canvas) {
  return {
    type: 'SET_CANVAS',
    canvas: canvas
  };
}

export function drawRegion(canvas, coordinates, bbox=[[373, 350, 384, 420], [710, 353, 722, 409], [938, 357, 951, 413]]){
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(coordinates[0], coordinates[1]);
  for(let i = 2; i < coordinates.length; i+=2){
    ctx.lineTo(coordinates[i], coordinates[i+1]);
  }
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fill();
  let total = 0;
  for(let i = 0; i < bbox.length; i++){
    let cross_count = 0;
    let bbox_x = (bbox[i][0]+bbox[i][2])/2;
    let bbox_y = (bbox[i][1]+bbox[i][3])/2;
    for(let j = 0; j < coordinates.length-2; j+=2){
      if(intersect(coordinates[j], coordinates[j+1], coordinates[j+2], coordinates[j+3], 0, 0, bbox_x, bbox_y)){
        cross_count++;
      }
    }
    if(intersect(coordinates[0], coordinates[1], coordinates[coordinates.length-2], coordinates[coordinates.length-1], 0, 0, bbox_x, bbox_y)){
      cross_count++;
    }
    if(cross_count & 1){
      total++;
    }
  }
  ctx.font = "20px Arial";
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillText("People Count: "+total, 850, 40);
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.strokeRect(840, 15, 170, 40);
}
