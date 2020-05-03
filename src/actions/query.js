export function set_locations(location){
  console.log('set locations from query action');
  return {
    type: 'RECEIVE_LOCATION',
    payload: { location },
  }
}
