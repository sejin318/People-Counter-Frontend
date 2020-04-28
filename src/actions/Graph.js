import axios from 'axios';

const API_URL = {
  "south-gate": 'http://52.220.34.115:5000/realtime/south',
  "north-gate": 'http://52.220.34.115:5000/realtime/north',
  "barn-b": 'http://52.220.34.115:5000/realtime/barn',
};
const location_list = ['south-gate', 'north-gate', 'barn-b'];

export const receiveData = (data, location, error) => ({
  type: 'RECEIVE_DATA',
  payload: { data, location, error },
});

export const fetchData = () => {
  return async (dispatch, getState) => {

    // format is yyyy-mm-dd-hh:mm:ss
    function toDate(timeString){
      const y = parseInt(timeString.substring(6, 10));
      const m = parseInt(timeString.substring(0, 2));
      const d = parseInt(timeString.substring(3, 5));
      const h = parseInt(timeString.substring(12, 14));
      const mm = parseInt(timeString.substring(15, 17));
      // const s = parseInt(timeString.substring(17, 19));
      const s = 0;
      return new Date(y, m, d, h, mm, s);
    }

    // initializing the data
    for(let i = 0; i < location_list.length; i++){
      const location = location_list[i];
      const init_url = API_URL[location].replace('realtime', 'init');
      axios.get(init_url)
      .then( (e) => {
        // console.log("response", e);
        // console.log(e.data);
        // console.log(e.data.data);
        const data_list = e.data.data;

        // console.log(data_list);
        for(let i = 0; i < data_list.length; i++){
          const data = data_list[i];
          const img = data.img_data;
          const time = toDate(data.datetime);
          const count = data.count;
          const bbox = data.bbox;
          if(time === undefined || count === undefined){
            dispatch(receiveData(null, location, true));
          } else {
            dispatch(receiveData({ time: time, count: count, img: img, bbox: bbox }, location, false));
          }
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    // realtime updating data
    for(let i = 0; i < location_list.length; i++){
      const location = location_list[i];
      const eventSource = new EventSource(API_URL[location]);
      eventSource.onmessage = e => {
        // console.log("message received at: ", new Date())
        // console.log('message received is', e);
        const message = e.data.data;
        console.log(message)
        const data_list = JSON.parse(message);
        // const data_list = e.data.data; if the e is entirely json format throughout

        // const data_list = JSON.parse({"data": message}).data;
        // const message = `{ "data": ${e.data} }`;
        // console.log(message);
        // const data_list = JSON.parse(`{ "data": ${e.data} }`).data; // why not ${e.data}? or e.data
        // const data_list = message.data;
        for(let i = 0; i < data_list.length; i++){
          const data = data_list[i];
          const img = data.img_data;
          const time = toDate(data.datetime);
          const count = data.count;
          const bbox = data.bbox;
          if(time === undefined || count === undefined){
            dispatch(receiveData(null, location, true));
          } else {
            dispatch(receiveData({ time: time, count: count, img: img, bbox: bbox }, location, false));
          }
        }
      };
    }
  };
};
