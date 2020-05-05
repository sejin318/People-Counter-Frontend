const initialState = {
  openDrawing: false,
  lines: [
  ],
  lock: true,
  anchorEl: null
};

export default (state = initialState, action) => {
  // console.log("Image reducer called??");
  switch (action.type) {
    case 'UNLOCK':
    console.log('unlock reducer');
    return {
      ...state,
      lock: false
    }
    case 'START_DRAWING':
    // console.log('reducer says start drawing');
    // state.openDrawing = true;
    return {
      ...state,
      openDrawing: true,
      lines: [...state.lines]
    };

    case 'ADD_LINE':
    // console.log('reducer says add line');
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
    // console.log('reducer says reset');
    return {
      openDrawing: false,
      lines: [],
      lock: true
    };
    case 'SET_ANCHOR':
    console.log('set_anchor');
    return{
      ...state,
      anchorEl: action.payload
    }
    default:
    return state;

  }
}
