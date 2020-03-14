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
  ctx.moveTo(coordinates[0], coordinates[1]);
  for(let i = 2; i < coordinates.length; i+=2){
    ctx.lineTo(coordinates[i], coordinates[i+1]);
  }
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fill();
  ctx.globalAlpha = 1;
}
