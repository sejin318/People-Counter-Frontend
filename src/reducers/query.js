const initialState = {
  start_date: undefined,
  end_date: undefined,
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B']
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'RECEIVE_LOCATION':
    state.locations = action.type.location;
    return {
      ...state
    }; 
    default:
    return state;
  }
}
