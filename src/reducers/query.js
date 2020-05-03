const initialState = {
  start_date: new Date(),
  end_date: new Date(),
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B']
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'RECEIVE_LOCATION':
    state.locations = action.payload.location;
    return {
      ...state
    };
    case 'SET_START_DATE':
    return {
      start_date: action.payload,
      ...state
    }
    case 'SET_END_DATE':
    return {
      end_date: action.payload,
      ...state
    }
    default:
    return state;
  }
}
