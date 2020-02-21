import actions from './Graph';
import thunk from 'redux-thunk';
import actions from './requestTodo';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('fetchData Action', () => {
  fetch.mockResponse(JSON.stringify)
})

describe('Actions', () => {
  test('receiveData Action', () => {
    const data = {
      data: {
        time: '2019-02-20-12:46',
        count: 10
      },
      location: 'south-gate',
      error: false
    };
    const result = actions.receiveData(data);
    const expected = {
      type: 'RECEIVE_DATA',
      payload: {
        data: {
          time: '2019-02-20-12:46',
          count: 10
        },
        location: 'south-gate',
        error: false,
      },
    };
    expect(result).toEqual(expected);
  })
});
