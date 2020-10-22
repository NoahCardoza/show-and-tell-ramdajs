const db = require('./db');
const { mapObjIndexed } = require('ramda');

const fauxFetch = data => new Promise(res => setTimeout(() => res(data), Math.random()))

module.exports = mapObjIndexed(fn => () => fauxFetch(fn()), db)