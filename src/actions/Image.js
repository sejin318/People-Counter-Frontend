export function setCanvas(canvas) {
  return {
    type: 'SET_CANVAS',
    canvas: canvas
  };
}

export function addBox(canvas) {
  console.log("addBox called!!!!!!!!!!!!!!!!!!!!!!!");
  const ctx = canvas.getContext("2d");
  ctx.fillRect(110, 110, 100, 100);
}

export function drawRegion(canvas, coordinates){ // coordinates as an array of x,y coordinates (1d)
  console.log('coordinate is', coordinates);
  const ctx = canvas.getContext("2d");
  // ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.moveTo(coordinates[0]*1024/3840, coordinates[1]*768/2160);
  for(let i = 2; i < coordinates.length; i+=2){
    ctx.lineTo(coordinates[i]*1024/3840, coordinates[i+1]*768/2160);
  }
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fill();
  // ctx.globalAlpha = 1;

  // ctx.moveTo(0, 0);
  // ctx.lineTo(960, 0);
  // ctx.lineTo(960, 540);
  // ctx.lineTo(0, 540);
  // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  // ctx.fill();
}
