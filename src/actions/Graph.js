import fetchJsonp from 'fetch-jsonp';
import { replace } from 'react-router-redux';

const API_URL = {
  "south-gate": 'http://52.220.34.115:5000/realtime/south',
  "north-gate": 'http://52.220.34.115:5000/realtime/north',
  "barn-b": 'http://52.220.34.115:5000/realtime/barn',
};
const location_list = ['south-gate', 'north-gate', 'barn-b'];

const startRequest = () => ({
  type: 'START_REQUEST',
});

const receiveData = (data, location, error) => ({
  type: 'RECEIVE_DATA',
  payload: { data, location, error },
});

const updateImage = (data, location, error) => ({
  type: 'UPDATE_IMAGE',
  payload: { data, location, error }
});

export const fetchData = () => {
  return async (dispatch, getState) => {
    for(let i = 0; i < location_list.length; i++){
      const location = location_list[i];
      const eventSource = new EventSource(API_URL[location]);
      eventSource.onmessage = e => {
        const data = JSON.parse(e.data);
        if(data.img === undefined){
          dispatch(updateImage(null, location, true));
        } else {
          dispatch(updateImage(data.img, location, false));
        }
        for(let i = 0; i < data.time.length; i++){
          const time = data.time[i];
          const count = data.count[i];
          if(time === undefined || count === undefined){
            dispatch(receiveData({}, location, true));
          } else {
            dispatch(receiveData({ time: time, count: count }, location, false));
          }
        }
      }
    }
  };
};
