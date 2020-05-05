import React from 'react';

export function intersect(
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

export function draw_count(lines){
  { dispatch, canvas, bbox } = this.props;
  const ctx = canvas.getContext("2d");
  let total = 0;
  for(let i = 0; i < bbox.length; i++){
    let cross_count = 0;
    let bbox_x = (bbox[i][0]+bbox[i][2])/2;
    bbox_x *= (1024/3840);
    let bbox_y = (bbox[i][1]+bbox[i][3])/2;
    bbox_y *= (768/2160);
    for(let j = 0; j < lines.length-2; j+=2){
      if(intersect(lines[j], lines[j+1], lines[j+2], lines[j+3], 0, 0, bbox_x, bbox_y)){
        cross_count++;
      }
    }
    if(intersect(lines[0], lines[1], lines[lines.length-2], lines[lines.length-1], 0, 0, bbox_x, bbox_y)){
      cross_count++;
    }
    if(cross_count & 1){
      total++;
    }
  }
  // dispatch(reset_line());
  ctx.font = "20px Arial";
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillText("People Count: "+total, 850, 40);
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(840, 15, 170, 40);
}

export function start_drawing(){
  // console.log("start_drawing called!");
  return {
    type: 'START_DRAWING',
  };
}

export function add_line(x, y){
  return {
    type: 'ADD_LINE',
    payload: {
      x: x,
      y: y
    }
  };
}

export function reset_line(){
  return {
    type: 'RESET'
  };
}

export function setCanvas(canvas) {
  return {
    type: 'SET_CANVAS',
    canvas: canvas
  };
}

export function unlock(){
  return {
    type: 'UNLOCK'
  };
}

export function drawRegion(canvas, coordinates, bbox){
  { dispatch } = this.props;
  dispatch(reset_line());
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(coordinates[0], coordinates[1]);
  for(let i = 2; i < coordinates.length; i+=2){
    ctx.lineTo(coordinates[i], coordinates[i+1]);
  }
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
  ctx.stroke();
  draw_count(coordinates);
}
