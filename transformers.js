const R = require('ramda');

// amount cmp
const amountLessThan = n => R.propSatisfies(R.gt(n), 'amount')
const amountGreaterThan = n => R.propSatisfies(R.lt(n), 'amount')

// date converters
const dateToEpoch = timestr => (new Date(timestr)).getTime()
const datePropToEpoch = R.pipe(R.prop('date'), dateToEpoch)

// date cmp
const cmpByDateProp = cmp => R.comparator(R.useWith(cmp, [datePropToEpoch, datePropToEpoch]))

const cmpDec = R.lt
const cmpAsc = R.complement(cmpDec)

// date sorting
const sortByDatePropDec = R.sort(cmpByDateProp(cmpDec))
const sortByDatePropAsc = R.sort(cmpByDateProp(cmpAsc))

module.exports = {
  amountLessThan,
  amountGreaterThan,
  datePropToEpoch,
  sortByDatePropDec,
  sortByDatePropAsc,
}