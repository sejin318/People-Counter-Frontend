const initialState = {
  start_date: new Date(),
  end_date: new Date(),
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B']
};

export default (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'RECEIVE_LOCATION':
    state.locations = action.payload.location;
    return {
      ...state
    };
    case 'SET_START_DATE':
    console.log('hello1', action.payload);
    return {
      ...state,
      start_date: action.payload,
    }
    case 'SET_END_DATE':
    console.log('hello1');
    return {
      ...state, 
      end_date: action.payload,
    }
    default:
    return state;
  }
}
