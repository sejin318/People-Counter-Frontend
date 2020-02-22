import actions from './Graph';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('fetchData Action', () => {
  fetch.mockResponse(JSON.stringify)
})

describe('Actions', () => {
  test('receiveData Action', () => {
    const data = {
      data: {
        time: new Date(2000, 1, 1, 12, 0, 0),
        count: 10,
        img: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
      },
      location: 'south-gate',
      error: false
    };
    const result = actions.receiveData(...data);
    const expected = {
      type: 'RECEIVE_DATA',
      payload: {
        data: {
          time: new Date(2000, 1, 1, 12, 0, 0),
          count: 10,
          img: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
        },
        location: 'south-gate',
        error: false,
      },
    };
    expect(result).toEqual(expected);
  })
});
