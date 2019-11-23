export default {
  meetings: {
    label: 'Meetings/Resets',
    *probability (gen, chromaCharm) {
      console.log(chromaCharm);
      for (;;) {
        yield gen < 6 ? (chromaCharm ? (3 / 8192) : (1 / 8192)) : (chromaCharm ? (3 / 4096) : (1 / 4096));
      }
    },
  },
  eggs: {
    label: 'Reproduction (one shiny parent)',
    *probability () {
      while (true) {
        yield 1 / 64;
      }
    }
  },
  firstEgg: {
    label: 'First egg given (Pokemon Crystal only)',
    *probability() {
      while (true) {
        yield 1 / 16;
      }
    }
  },
  masuda: {
    label: 'Masuda',
    *probability(gen, chromaCharm) {
      while (true) {
        switch (gen) {
          case 4:
            yield 5/8192;
            break;
          case 5:
            yield chromaCharm ? (8/8192) : (6/8192);
            break;
          default:
            yield chromaCharm ? (8/4096) : (6/4096);
            break;
        }
      }
    },
  },
  sos: {
    label: 'SOS battles',
    *probability(gen, chromaCharm) {
      let nb = 0;
      for (;;++nb) {
        if (nb < 10) {
          yield !chromaCharm ? (1 / 4096) : (1 / 1366);
        } else if (nb < 20) {
          yield !chromaCharm ? (1/802) : (1/565);
        } else if (nb < 30) {
          yield !chromaCharm ? (1/455) : (1/373);
        } else {
          yield !chromaCharm ? (1/315) : (1/273);
        }
      }
    },
  },
  fSafari: {
    label: 'Friends safari',
    *probability(gen, chromaCharm) {
      while (true) {
        yield chromaCharm ? (7 / 4096) : (5 / 4096);
      }
    },
  },
  fishing: {
    label: 'Fishing',
    *probability(gen, chromaCharm) {
      const normArray = [
        1/4096,
        1/1366,
        1/820,
        1/586,
        1/456,
        1/373,
        1/316,
        1/274,
        1/241,
        1/216,
        1/196,
        1/179,
        1/164,
        1/152,
        1/142,
        1/133,
        1/125,
        1/118,
        1/111,
        1/106,
        1/100
      ];
      const charmArray = [
        1/1366,
        1/820,
        1/586,
        1/456,
        1/373,
        1/316,
        1/274,
        1/241,
        1/216,
        1/196,
        1/179,
        1/164,
        1/152,
        1/142,
        1/133,
        1/125,
        1/118,
        1/111,
        1/106,
        1/100,
        1/96,
      ];
      const proxy = new Proxy(chromaCharm ? charmArray : normArray, {
        get: (target, p) => p >= target.length ? target[target.length - 1] : target[p],
      });

      for (let i = 0;;++i) {
        yield proxy[i];
      }
    }
  },
};
