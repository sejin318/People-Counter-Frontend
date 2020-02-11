
const initialState = {
  data: {
    "barn-b": [...Array(60).keys()].map(() => ({ time: 0, count: 10})),
    "south-gate": [...Array(60).keys()].map(() => ({ time: 0, count: 20})),
    "north-gate": [...Array(60).keys()].map(() => ({ time: 0, count: 30})),
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
    case 'START_REQUEST':
      return {
        ...state,
        data: {
          ...state.data
        }
      };
    case 'UPDATE_IMAGE':
      return action.payload.error
        ? { ...state, error: true }
        : {
            ...state,
            img: {
              ...state.img,
              [action.payload.location]: action.payload.data
            }
          };

    case 'RECEIVE_DATA':
      const location = action.payload.location;
      const data = action.payload.data;
      return action.payload.error
        ? { ...state, error: true }
        : {
            ...state,
            data: {
              ...state.data,
              [location]: state.data[location].slice(1, state.data[location].length).concat([data])
            }
          };
    default:
      return state;
  }
}
