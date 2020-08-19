const { pool } = require("./pool");

class Connection {
  constructor(client) {
    this.client = client;
  }

  async rollbackAndRelease(err) {
    await this.executeCommandAndRelease("ROLLBACK", err);
  }

  async commitAndRelease() {
    await this.executeCommandAndRelease("COMMIT");
  }

  async executeCommandAndRelease(command, err) {
    if (!this.client) {
      // handle gracefully multiple calls to release, might happen e.g. if 'error' event fired multiple times
      console.warn("Client already closed");
      return;
    }
    // get private copy of client and null it fast. if awaits have gotten out of hand, there can be multiple concurrent in-flight executions of this method
    const client = this.client;
    this.client = null;

    await client.query(command);
    await client.release(err);
  }

  query() {
    return this.client.query.apply(this.client, arguments);
  }
}

async function getDatabaseConnection() {
  const client = await pool.connect();
  await client.query("BEGIN TRANSACTION");
  return new Connection(client);
}

module.exports = {
  Connection,
  getDatabaseConnection,
};
