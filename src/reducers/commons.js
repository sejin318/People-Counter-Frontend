const initialState = {
  categories: [
    {
      id: 'south-gate',
      name: 'South Gate'
    },
    {
      id: 'north-gate',
      name: 'North Gate'
    },
    {
      id: 'barn-b',
      name: 'Computer Barn B'
    }
  ],
  buttons: {
    "south-gate": ['queue 1', 'queue 2', 'queue3'],
    "north-gate": ['queue 1', 'queue 2'],
    "barn-b": ['area 1', 'area 2', 'area'],
  },
  segments: {
    south: [
      [
        11.6279296875,
        1534.8056640625,
        0.0,
        1310.4000000000015,
        411.3000000000011,
        1372.5,
        417.10000000000036,
        1487.9000000000015,
        11.6279296875,
        1534.8056640625,
      ],
      [
        221.55078125,
        1549.3583984375,
        257.9018932874369,
        2150.803786574872,
        978.3149741824454,
        2127.6712564543905,
        2250.6041308089516,
        1797.2065404475052,
        3394.0120481927715,
        1615.4509466437194,
        3628.6419965576606,
        1605.5370051635127,
        3628.6419965576606,
        1430.3907056798635,
        3314.7005163511203,
        1453.523235800345,
        3218.865748709124,
        1387.4302925989687,
        3165.9913941480227,
        1189.1514629948379,
        2739.691910499141,
        1152.8003442340796,
        2088.676419965577,
        1202.3700516351128,
        2065.6000000000004,
        1374.300000000001,
        780.0,
        1437.0,
        221.55078125,
        1549.3583984375
      ],
      [
        0.1396484375,
        1166.0185546875,
        0.1394148020663124,
        1284.986230636834,
        426.4388984509478,
        1351.0791738382104,
        426.4388984509478,
        1423.781411359725,
        1110.500860585198,
        1400.6488812392436,
        2035.8020654044758,
        1357.6884681583488,
        2022.583476764201,
        1189.1514629948379,
        0.1396484375,
        1166.0185546875,
      ]
    ],
    north: [

    ],
    barn: [

    ]
  }
};
export default () => initialState;
