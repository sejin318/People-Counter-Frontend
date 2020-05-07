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

export function change_region(region_name){
  return {
    type: 'CHANGE_REGION',
    payload: region_name
  }
}

export function drawRegion(props, index_name, img){
  let coordinates;
  let fill_color;
  const { regions, bbox } = props;
  if(regions.hasOwnProperty(index_name)){
    coordinates = props.regions[index_name];
    fill_color = 'rgba(255, 0, 0, 0.3)';
  } else if(index_name == 'define'){
    coordinates = props.lines;
    fill_color = 'rgba(0, 0, 255, 0.3)';
  } else {
    return; // also handles when no region is selected
  }
  if(coordinates.length == 0){
    return;
  }
  const ctx = props.canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  ctx.beginPath();
  ctx.moveTo(coordinates[0], coordinates[1]);
  for(let i = 2; i < coordinates.length; i+=2){
    ctx.lineTo(coordinates[i], coordinates[i+1]);
  }
  ctx.fillStyle = fill_color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
  ctx.stroke();
  let total = 0;
  for(let i = 0; i < bbox.length; i++){
    let cross_count = 0;
    let bbox_x = (bbox[i][0]+bbox[i][2])/2;
    bbox_x *= (1024/3840);
    let bbox_y = (bbox[i][1]+bbox[i][3])/2;
    bbox_y *= (768/2160);
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
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(840, 15, 170, 40);
}

export function customDrawing(e) {
  const { dispatch, canvas, openDrawing, lines, lock } = this.props;
  if(lock){
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.lineWidth = 5;
  if(!openDrawing){
    dispatch(start_drawing());
    dispatch(add_line(x, y));
  } else {
    dispatch(add_line(x, y));
    ctx.beginPath();
    ctx.moveTo(lines[lines.length-2], lines[lines.length-1]);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

export function setAnchorEl(target){
  this.props.dispatch({
    type: 'SET_ANCHOR',
    payload: target
  });
}

export function updateCanvas(index_name){
  this.props.dispatch(change_region(index_name));
  const img = this.refs.image
  drawRegion(this.props, index_name, img);
}

export function resetCanvas(){
  this.props.dispatch({
    type: 'RESET'
  });
  const canvas = this.refs.canvas;
  const img = this.refs.image
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
}

export function finishDrawing(){
  this.props.dispatch(change_region('define'));
  this.props.dispatch({
    type: 'FINISH_DRAWING'
  });
  drawRegion(this.props, 'define', this.refs.image);
}
