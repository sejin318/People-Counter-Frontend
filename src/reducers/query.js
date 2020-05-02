const initialState = {
  start_date: undefined,
  end_date: undefined,
  locations: [],
  location_list: ['South Gate', 'North Gate', 'Computer Barn B']
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
    return state;
  }
}
