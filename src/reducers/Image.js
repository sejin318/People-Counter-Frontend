const initialState = {
  openDrawing: false,
  lines: [
  ]
};

export default (state = initialState, action) => {
  console.log("Image reducer called??");
  switch (action.type) {
    case 'START_DRAWING':
    console.log('reducer says start drawing');
    // state.openDrawing = true;
    return {
      openDrawing: true,
      lines: [...state.lines];
    };

    case 'ADD_LINE':
    console.log('reducer says add line');
    let arr = [...state.lines];
    const x = action.payload.x;
    const y = action.payload.y;
    arr.push(x);
    arr.push(y);
    return {
      ...state,
      lines: arr
    };

    case 'RESET':
    console.log('reducer says reset');
    return {
      openDrawing: false,
      lines: []
    };

    default:
    return state;

  }
}
