const { writeFileSync } = require('fs');
const _ = require('lodash');
const R = require('ramda');
const faker = require('faker');

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const cbAssoc = R.curry((prop, cbVal, obj) => R.assoc(prop, cbVal(), obj))

const randomRole = R.partial(R.pipe(_.shuffle, R.head), [['Partner', 'Contractor', 'Subcontractor']])

const randomString = R.pipe(
  Math.random,
  R.bind(Number.prototype.toString),
  R.apply(R.__, [36]),
  R.slice(2, 12)
)

const randomDateConstraints = [[2012, 2020], [1, 12], [1, 27]]
const toISOString = date => date.toISOString();

const randomDateStr = R.pipe(
  R.always(randomDateConstraints),
  R.map(R.apply(_.random)),
  R.apply(R.constructN(3, Date)),
  toISOString
)

const randomTransaction = R.pipe(
  faker.helpers.createTransaction,
  R.evolve({
    date: randomDateStr,
  })
)

const randomUserCard = R.pipe(
  faker.helpers.userCard,
  cbAssoc('created', randomDateStr),
  cbAssoc('uuid', faker.random.uuid),
  cbAssoc('role', randomRole),
  cbAssoc('password', randomString),
  cbAssoc('transactions', () =>
    R.range(0, _.random(1, 5))
      .map(randomTransaction)),
)

const serializeToFile = R.useWith(writeFileSync, [R.identity, R.curry(JSON.stringify)(R.__, null, 2)])

const createAndSaveUsers = R.pipe(
  R.range(0),
  R.map(randomUserCard),
  serializeToFile('users.db.json')
)

createAndSaveUsers(20);