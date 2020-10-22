const R = require('ramda');

const pipeP = R.pipe(R.unapply(R.identity), R.call(R.pipeWith(R.andThen)))

module.exports = {
  pipeP,
}