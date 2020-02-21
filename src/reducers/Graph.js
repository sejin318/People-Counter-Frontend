
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
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // 요청을 시작할 때 상태 리셋
    // case 'START_REQUEST':
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data
    //     }
    //   };
    // case 'UPDATE_IMAGE':
    //   return action.payload.error
    //     ? { ...state, error: true }
    //     : {
    //         ...state,
    //         img: {
    //           ...state.img,
    //           [action.payload.location]: action.payload.data
    //         }
    //       };

    case 'RECEIVE_DATA':
      const location = action.payload.location;
      const data = action.payload.data;

      function find_index(list, item){
        const time = item.time;
        let i = 0;
        for(; i < list.length; i++){
          if(list[i].time > time){
            break;
          } else if(list[i].time === time){
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
      state.data[location].splice(0, 1);
      if(index === state.data[location].length){
        state.img[location] = data.img;
      }
      return {
        ...state,
        data: {
          ...state.data,
          [location]: [...state.data[location]]
        }
      };

    default:
      return state;
  }
}
