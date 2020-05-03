const initialState = {
  start_date: undefined,
  end_date: undefined,
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B']
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_LOCATION':
    loc = action.payload.location;
    for(let i = 0; i < state.locations.length; i++){
      if(state.locations[i] === loc){
        state.locations.splice(i, 1);
        return {
          ...state
        };
      }
    }
    state.locations.push(loc);
    return {
      ...state
    };
    default:
    return state;
  }
}
