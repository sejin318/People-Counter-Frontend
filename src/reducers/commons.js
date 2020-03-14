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
    "south-gate": ['queue 1', 'queue 2', 'queue 3', 'queue 4'],
    "north-gate": ['queue 1', 'queue 2'],
    "barn-b": ['area 1', 'area 2', 'area'],
  },
  regions: {
    "south-gate": {
      'queue 1': [
        26, 389,
        162, 448,
        209, 449,
        209, 393,
        44, 357
      ],
      'queue 2': [
        178, 372,
        399, 418,
        464, 417,
        464, 382,
        363, 353,
        178, 349
      ],
      'queue 3': [
        308, 348,
        463, 373,
        762, 394,
        836, 383,
        836, 351,
        766, 335,
        308, 319
      ],
      'queue 4': [
        59, 598,
        1020, 435,
        1020, 364,
        953, 365,
        762, 403,
        399, 426,
        217, 455,
        55, 465
      ]
    },
    "north-gate": {

    },
    "barn-b": {

    }
  }
};
export default () => initialState;
