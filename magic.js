const { __, curry, partial } = require('ramda');

const mut = (x, y) => x * y;
const add = x => y => x + y;
const sub = curry((x, y) => x - y);

const add10 = add(10)
const double = partial(mut, [2])
const subFrom5 = sub(5)
const sub5 = sub(__, 5)