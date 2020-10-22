const { readFileSync } = require('fs');
const R = require('ramda');

const deserializeFromFile = R.pipe(
  readFileSync,
  R.toString,
  JSON.parse
)

// load data
const users = deserializeFromFile('users.db.json');

// prop getters
const transactionsProp = R.prop('transactions')
const uuidProp = R.propEq('uuid')

// prop checks
const roleEq = R.propEq('role')
const roleIsPartner = roleEq('Partner')
const roleIsContractor = roleEq('Contractor')
const roleIsSubcontractor = roleEq('Subcontractor')

// user filters
const filterPartners = R.filter(roleIsPartner)
const filterContractors = R.filter(roleIsContractor)
const filterSubcontractors = R.filter(roleIsSubcontractor)

// getters
const getAllUsers = () => users
const getAllPartners = () => filterPartners(users)
const getAllContractors = () => filterContractors(users)
const getAllSubcontractors = () => filterSubcontractors(users)

const getAllTransactions = () => getAllUsers().flatMap(getTransactions)
const getAllPartnerTransactions = () => getAllPartners().flatMap(transactionsProp)
const getAllContractorTransactions = () => getAllContractors().flatMap(transactionsProp)
const getAllSubcontractorTransactions = () => getAllSubcontractors().flatMap(transactionsProp)

// find by uuid
const getUserByUID = R.pipe(
  uuidProp,
  R.find(R.__, users),
)

const getTransactionsByUID = R.pipe(
  getUserByUID,
  transactionsProp
)

module.exports = {
  getAllUsers,
  getAllPartners,
  getAllContractors,
  getAllSubcontractors,
  getAllTransactions,
  getAllPartnerTransactions,
  getAllContractorTransactions,
  getAllSubcontractorTransactions,
  getUserByUID,
  getTransactionsByUID,
}