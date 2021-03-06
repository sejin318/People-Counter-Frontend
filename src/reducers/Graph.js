
const initialState = {
  data: {
    "barn-b": [...Array(60).keys()].map(() => ({ time: null, count: 0})),
    "south-gate": [...Array(60).keys()].map(() => ({ time: null, count: 0})),
    "north-gate": [...Array(60).keys()].map(() => ({ time: null, count: 0})),
  },
  img: {
    "barn-b": null,
    "south-gate": null,
    "north-gate": null
  },
  bbox: {
    "barn-b": [...Array(60).keys()].map(() => ([])),
    "south-gate": [...Array(60).keys()].map(() => ([])),
    "north-gate": [...Array(60).keys()].map(() => ([])),
  },
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'RECEIVE_DATA':
      const location = action.payload.location;
      const data = action.payload.data;

      function find_index(list, item){
        const time = item.time;
        let i = 0;
        for(; i < list.length; i++){
          if(list[i].time > time){
            break;
          } else if((list[i].time - time) == 0){
            return -1;
          }
        }
        return i;
      }

      const index = find_index(state.data[location], data);
      if (action.payload.error || index === -1){
        return {
          ...state
        };
      }

      state.data[location].splice(index, 0, { time: data.time, count: data.count });
      state.bbox[location].splice(index, 0, data.bbox);
      state.data[location].splice(0, 1);
      state.bbox[location].splice(0, 1);
      if(index === state.data[location].length){
        state.img[location] = data.img;
      }
      return {
        ...state,
        data: {
          ...state.data,
          [location]: [...state.data[location]] // why not simply return {...state} ?
        }
      };

    default:
      return state;
  }
}
