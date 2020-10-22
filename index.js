const R = require('ramda');
const D = require('./db');
const A = require('./api');
const T = require('./transformers')
const { pipeP } = require('./helpers');


const amountsLessThan500SortedDec = R.pipe(
  R.filter(T.amountLessThan(500)),
  T.sortByDatePropDec
)

const sortTransactionsByIdAsc = pipeP(
  A.getTransactionsByUID,
  T.sortByDatePropAsc,
  R.project(['date', 'amount'])
)

const examplePartnerTransactionsLessThan500SortedDec = R.pipe(
  D.getAllPartnerTransactions,
  amountsLessThan500SortedDec,
  console.log
)

const exampleSortTransactionsByIdAsc = () => {
  sortTransactionsByIdAsc('a034eca3-f966-4c94-a1d5-0a10621e7f34').then(console.log)
  console.log('I promise!');
}
