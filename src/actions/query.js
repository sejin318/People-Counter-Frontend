export function set_locations(location){
  return {
    type: 'RECEIVE_LOCATION',
    payload: { location },
  }
}
