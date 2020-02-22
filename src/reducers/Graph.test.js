import reducer from './Graph';
describe('tasks Reducer', () => {
  test('initial value', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
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
    expect(result).toEequal(expected);
  });
  test('RECEIVE_DATA action', () => {
    const state = {
      data: {
        "barn-b": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, 0, 0), count: index })),
        "south-gate": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, 2*index, 0), count: index })),
        "north-gate": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, 0, 0), count: index })),
      },
      img: {
        "barn-b": null,
        "south-gate": null,
        "north-gate": null
      },
      error: false
    };
    const action = {
      type: 'RECEIVE_DATA',
      payload: { data: { time: new Date(2000, 1, 1, 12, 9, 0), count: 100, img: null }, location: 'south-gate', error: false },
    };
    const result = reducer(state, action);
    const expected = {
      data: {
        "barn-b": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, 0, 0), count: index })),
        "south-gate": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, index < 4 ? 2*index+2 : (index > 4 ? 2*index: 9), 0), count: index })),
        "north-gate": [...Array(10).keys()].map((index) => ({ time: new Date(2000, 1, 1, 12, 0, 0), count: index })),
      },
      img: {
        "barn-b": null,
        "south-gate": null,
        "north-gate": null
      },
      error: false
    };
    expect(result).toEqual(expected);
  });
});
