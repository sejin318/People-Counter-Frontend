var initDate = new Date();
initDate.setHours(0, 0, 0, 0);

const initialState = {
  start_date: initDate,
  end_date: initDate,
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B'],
  open: false,
  openContent: ''
};

export default (state = initialState, action) => {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case 'RECEIVE_LOCATION':
    state.locations = action.payload.location;
    return {
      ...state
    };
    case 'SET_START_DATE':
    // console.log('hello1', action.payload);
    // action.payload.setHours(0, 0, 0, 0);
    return {
      ...state,
      start_date: action.payload,
    };
    case 'SET_END_DATE':
    // console.log('hello1');
    // action.payload.setHours(0, 0, 0, 0);
    return {
      ...state,
      end_date: action.payload,
    };
    case 'SET_OPEN':
    return {
      ...state,
      open: true,
      openContent: action.payload
    };
    case 'SET_CLOSE':
    return {
      ...state,
      open: false
    };

    default:
    return state;
  }
}
