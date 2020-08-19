const { connect } = require("../integration/productDatabase");

async function executeCommandRollbackOnError(productDatabase, fn) {
  try {
    return await fn(productDatabase);
  } catch (e) {
    await productDatabase.rollbackAndRelease(e);
    throw e;
  }
}

async function withinTransaction(fn) {
  const productDatabase = await connect();
  return executeCommandRollbackOnError(productDatabase, async (productDatabase) => {
    const result = await fn(productDatabase);
    await productDatabase.commitAndRelease();
    return result;
  });
}

module.exports = {
  executeCommandRollbackOnError,
  withinTransaction,
};
