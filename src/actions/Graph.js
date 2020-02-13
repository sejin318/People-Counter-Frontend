import fetchJsonp from 'fetch-jsonp';
import { replace } from 'react-router-redux';
import axios from 'axios';

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
    // initializing the data
    // for(let i = 0; i < location_list.length; i++){
    //   const location = location_list[i];
    //   const init_url = location.replace('realtime', 'init');
    //   axios.get(init_url)
    //   .then( (e) => {
    //     console.log("response", e);
    //     const data_list = JSON.parse(`{ "data": ${e.data} }`).data;
    //     for(let i = 0; i < data_list.length; i++){
    //       const data = data_list[i];
    //       const img = data.img_data;
    //       const time = data.datetime;
    //       const count = data.count;
    //       if(img === undefined){
    //         dispatch(updateImage(null, location, true));
    //       } else {
    //         dispatch(updateImage(img, location, false));
    //       }
    //       if(data.datetime !== undefined && data.count !== undefined){
    //         dispatch(receiveData({ time: time, count: count }, location, false));
    //       } else {
    //         dispatch(receiveData({}, location, true));
    //       }
    //     }
    //   })
    //   .catch( (error) => {
    //     console.log(error);
    //   });
    // }



    // realtime updating data
    for(let i = 0; i < location_list.length; i++){
      const location = location_list[i];
      const eventSource = new EventSource(API_URL[location]);
      eventSource.onmessage = e => {
        console.log("message received at: ", new Date())
        console.log(e);
        const message = `{ "data": ${e.data} }`;
        console.log(message);
        const data_list = JSON.parse(`{ "data": ${e.data} }`).data;
        for(let i = 0; i < data_list.length; i++){
          const data = data_list[i];
          const img = data.img_data;
          const time = data.datetime;
          const count = data.count;
          if(img === undefined){
            dispatch(updateImage(null, location, true));
          } else {
            dispatch(updateImage(img, location, false));
          }
          if(data.datetime !== undefined && data.count !== undefined){
            dispatch(receiveData({ time: time, count: count }, location, false));
          } else {
            dispatch(receiveData({}, location, true));
          }
        }
      };
    }
  };
};
