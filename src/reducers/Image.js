const initialState = {
  openDrawing: false,
  lines: [
  ]
};

export default (state = initialState, action) => {
  console.log("Image reducer called??"); 
  switch (action.type) {
    case 'START_DRAWING': {
      console.log('reducer says start drawing');
      // state.openDrawing = true;
      return {
        openDrawing: true,
        ...state
      };
    }
    case 'ADD_LINE': {
      console.log('reducer says add line');
      const x = action.payload.x;
      const y = action.payload.y;
      state.lines.push(x);
      state.lines.push(y);
      return {...state};
    }
    case 'RESET': {
      console.log('reducer says reset');
      state.lines = [];
      return {...state};
    }
    default: {
      return state;
    }
  }
}
