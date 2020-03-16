const initialState = {
  openDrawing: false,
  lock: true,
  lines: [
  ]
};

export default (state = initialState, action) => {
  console.log("Image reducer called??");
  switch (action.type) {
    case 'UNLOCK_DRAWING':
    console.log('unlock reducer');
    return {
      lock: false,
      ...state
    };
    case 'START_DRAWING':
    console.log('reducer says start drawing');
    // state.openDrawing = true;
    return {
      openDrawing: true,
      lines: [...state.lines],
      ...state
    };

    case 'ADD_LINE':
    console.log('reducer says add line');
    let arr = [...state.lines];
    const x = action.payload.x;
    const y = action.payload.y;
    arr.push(x);
    arr.push(y);
    return {
      lines: arr,
      ...state,
    };

    case 'RESET':
    console.log('reducer says reset');
    return {
      openDrawing: false,
      lines: [],
      lock: true
    };

    default:
    return state;

  }
}
