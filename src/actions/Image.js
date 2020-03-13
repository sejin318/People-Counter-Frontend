export function setCanvas(canvas) {
  return {
    type: 'SET_CANVAS',
    canvas: canvas
  };
}

export function addBox(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.fillRect(110, 110, 100, 100);
}
