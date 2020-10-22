const { writeFileSync } = require('fs');
const _ = require('lodash');
const R = require('ramda');
const faker = require('faker');

const cbAssoc = R.curry((prop, cbVal, obj) => R.assoc(prop, cbVal(), obj))

const randomRole = R.partial(R.pipe(_.shuffle, R.head), [['Partner', 'Contractor', 'Subcontractor']])

const randomString = R.pipe(
  Math.random,
  R.bind(Number.prototype.toString),
  R.apply(R.__, [36]),
  R.slice(2, 12)
)

const randomUserCard = R.pipe(
  faker.helpers.userCard,
  cbAssoc('uuid', faker.random.uuid),
  cbAssoc('role', randomRole),
  cbAssoc('password', randomString),
  cbAssoc('transactions', () =>
    R.range(0, _.random(1, 5))
      .map(faker.helpers.createTransaction)),
)

const serializeToFile = R.useWith(writeFileSync, [R.identity, R.curry(JSON.stringify)(R.__, null, 2)])

const createAndSaveUsers = R.pipe(
  R.range(0),
  R.map(randomUserCard),
  serializeToFile('users.db.json')
)

createAndSaveUsers(20);