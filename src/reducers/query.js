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
    const loc = action.payload.location;
    for(let i = 0; i < state.locations.length; i++){
      if(state.locations[i] === loc){
        state.locations.splice(i, 1);
        console.log(state);
        return {
          locations: state.locations,
          ...state
        };
      }
    }
    state.locations.push(loc);
    console.log(state);
    return {
      locations: state.locations,
      ...state
    };
    default:
    return state;
  }
}
