const initialState = {
  canvas: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_CANVAS':
      return { ...state, canvas: action.canvas };
    default:
      return state;
  }
}
