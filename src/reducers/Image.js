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
  switch (action.type) {
    case 'UNLOCK':
    return {
      ...state,
      lines: [],
      lock: false
    }
    case 'START_DRAWING':
    return {
      ...state,
      openDrawing: true,
    };
    case 'ADD_LINE':
    let arr = [...state.lines];
    const x = action.payload.x;
    const y = action.payload.y;
    arr.push(x);
    arr.push(y);
    return {
      ...state,
      lines: arr
    };
    case 'FINISH_DRAWING':
    return {
      ...state,
      openDrawing: false,
      lock: true
    };
    case 'RESET':
    return {
      ...state,
      openDrawing: false,
      lock: true,
      which_region: ''
    };
    case 'SET_ANCHOR':
    return{
      ...state,
      anchorEl: action.payload
    };
    case 'CHANGE_REGION':
    return {
      ...state,
      which_region: action.payload
    };
    case 'UPDATE':
    return {
      ...state,
      data_count: state.data_count+1
    };
    default:
    return state;
  }
}
