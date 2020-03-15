const initialState = {
  openDrawing: false,
  lines: [
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_DRAWING': {
      // state.openDrawing = true;
      return {
        openDrawing: true,  
        ...state
      };
    }
    case 'ADD_LINE': {
      const x = action.payload.x;
      const y = action.payload.y;
      state.lines.push(x);
      state.lines.push(y);
      return {...state};
    }
    case 'RESET': {
      state.lines = [];
      return {...state};
    }
    default: {
      return state;
    }
  }
}
