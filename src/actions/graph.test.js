import * as actions from './Graph';

describe('Actions', () => {  test('receiveData Action', () => {
    const data = {
      data: {
        time: new Date(2000, 1, 1, 12, 0, 0),
        count: 10,
        img: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
      },
      location: 'south-gate',
      error: false
    };
    // const result = actions.receiveData(...data);
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
    console.log(actions.receiveData);
    const result = actions.receiveData(data.data, data.location, data.error);
    expect(result).toEqual(expected);
  });
});
