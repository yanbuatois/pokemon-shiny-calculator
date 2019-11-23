const def = {
  chromaCharm: false,
  methods: ['meetings'],
};

const obj = {
  2: {
    methods: [
      'meetings',
      'eggs',
      'firstEgg',
    ],
  },
  3: {
    methods: [
      'meetings',
    ],
  },
  4: {
    methods: [
      'meetings',
      'masuda',
    ],
  },
  5: {
    chromaCharm: true,
    methods: [
      'meetings',
      'masuda',
    ],
  },
  6: {
    chromaCharm: true,
    methods: [
      'meetings',
      'masuda',
      'fSafari',
      'fishing',
    ],
  },
  7: {
    chromaCharm: true,
    methods: [
      'meetings',
      'masuda',
      'sos',
    ]
  },
  8: {
    chromaCharm: true,
    methods: [
      'meetings',
      'masuda',
    ],
  },
};

const output = {};
for (const key in obj) {
  output[key] = Object.assign({}, def, obj[key]);
}

export default output;
