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

export function resetCanvas(canvas, img){
  const img_elem = <img src={`data:image/jpeg;base64,${img}`} />
  const ctx = canvas.getContext("2d");
  img_elem.onload = () => {
    ctx.drawImage(img, 0, 0);
  }
}

export function addBox(canvas) {
  // console.log("addBox called!!!!!!!!!!!!!!!!!!!!!!!");
  const ctx = canvas.getContext("2d");
  ctx.fillRect(110, 110, 100, 100);
}

export function drawRegion(canvas, coordinates, bbox=[[330, 580, 330, 580]], obj){ // coordinates as an array of x,y coordinates (1d)
  // console.log('coordinate is', coordinates);
  const ctx = canvas.getContext("2d");
  // ctx.globalAlpha = 0.2;
  ctx.drawImage(obj.refs.image, 0, 0);
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
        // console.log('intersection occurred at:', coordinates[j]*1024/3840, coordinates[j+1]*768/2160, coordinates[j+2]*1024/3840, coordinates[j+3]*768/2160);
        cross_count++;
      }
    }
    if(intersect(coordinates[0], coordinates[1], coordinates[coordinates.length-2], coordinates[coordinates.length-1], 0, 0, bbox_x, bbox_y)){
      // console.log('intersection occurred at:', coordinates[0]*1024/3840, coordinates[1]*768/2160, coordinates[coordinates.length-2]*1024/3840, coordinates[coordinates.length-1]*768/2160);
      cross_count++;
    }
    if(cross_count & 1){
      total++;
    }
    // console.log('cross count is', cross_count);
  }
  // console.log('total is', total);
  // ctx.globalAlpha = 1;

  // ctx.moveTo(0, 0);
  // ctx.lineTo(960, 0);
  // ctx.lineTo(960, 540);
  // ctx.lineTo(0, 540);
  // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  // ctx.fill();
}
