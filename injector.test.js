import injector from './injector';
import { getKeys, hasKeys, isValue } from './injector';

const source = { a: 12, b: { cc: 14, dd: 44 } };
const obj = { a: 20, b: { dd: 55 } };
const merge = { a: 20, b: { cc: 14, dd: 55 } }
const badSource = {
  a: [1, 2, 3, 4, 5],
  b: {
    forty: [23, 23, 25],
  },
  c: {
    d: {
      ee: 'type',
      bb: 'orange',
      gg: {
        yyy: ['role', 'up'],
      }
    }
  }
};
const badObj = {
  a: [1, 'what', 3, 4, 5],
  b: {
    forty: [23, 'no', 25],
  },
  d: {
    c: {
      ee: 'type',
      bb: 'orange',
      gg: {
        yyy: ['role', 'up'],
      }
    }
  },
  c: {
    d: {
      ff: 'type',
      bb: 'blue',
      gg: {
        yyy: [1, 0, 4],
      }
    }
  }
};
const uglyCombo = {
  'a': [1, 'what', 3, 4, 5,],
  'b': {
    'forty': [23, 'no', 25,],
  },
  d: {
    c: {
      ee: 'type',
      bb: 'orange',
      gg: {
        yyy: ['role', 'up'],
      }
    }
  },
  'c': {
    'd': {
      'bb': 'blue',
      'ee': 'type',
      'ff': 'type',
      'gg': {
        'yyy': [1, 0, 4,
        ],
      },
    },
  },
}
test('injector', () => {
  const out = injector(source, obj);

  expect(out).toEqual(merge);
});
test('simple objects', () => {
  const simple = injector({ a: 12 }, { b: 14 });

  expect(simple).toEqual({ a: 12, b: 14 });
})
test('simple objects', () => {
  const simple = injector({ a: 12 }, { });

  expect(simple).toEqual({ a: 12 });
})
test('bad object', () => {
  const bad = injector(badSource, badObj);

  expect(bad).toEqual(uglyCombo)
})
test('expect isValue {} to be true', () => {
  expect(isValue({})).toBe(true)
  expect(isValue([])).toBe(true)
})
test('expect array to work', () => {
  const result = injector({ a: [1, 2, 3] }, { b: [3, 4, 5] })

  expect(result).toEqual({ a: [1, 2, 3], b: [3, 4, 5] })
})
test('hasKeys for anything', () => {
  expect(hasKeys([1, 2])).toBe(false)
})
