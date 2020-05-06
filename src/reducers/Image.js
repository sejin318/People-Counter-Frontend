const initialState = {
  openDrawing: false,
  lines: [
  ],
  lock: true,
  anchorEl: null,
  which_region: '',
  data_count: 0
};

export default (state = initialState, action) => {
  // console.log("Image reducer called??");
  switch (action.type) {
    case 'UNLOCK':
    console.log('unlock reducer');
    return {
      ...state,
      lines: [],
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
      ...state,
      openDrawing: false,
      lock: true,
      which_region: ''
    };
    case 'SET_ANCHOR':
    console.log('set_anchor', action.payload);
    return{
      ...state,
      anchorEl: action.payload
    }
    case 'HAS_REGION':
    return {
      ...state,
      has_region: true,
    }
    case 'CHANGE_REGION':
    return {
      ...state,
      which_region: action.payload
    };
    case 'UPDATE':
    console.log('UPDATE called!'); 
    return {
      ...state,
      data_count: state.data_count+1
    };
    default:
    return state;
  }
}
