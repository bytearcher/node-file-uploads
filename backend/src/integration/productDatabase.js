const { from: copyFrom } = require("pg-copy-streams");

const { pool } = require("./pool");

async function connect() {
  const connection = await pool.connect();
  return new ProductDatabase(connection);
}

class ProductDatabase {
  constructor(connection) {
    this.connection = connection;
  }

  async insertProduct(product) {
    const { title, manufacturer, price, description } = product;
    const response = await this.connection.query(
      `
                INSERT INTO product (title, manufacturer, price, description)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
      [title, manufacturer, price, description]
    );
    return response.rows[0].id;
  }

  async insertProductImage(stream, contentType) {
    const toDatabase = this.connection.query(copyFrom(`COPY image (id, content_type, image) FROM STDIN`));

    toDatabase.write(id + "\t");
    toDatabase.write(contentType + "\t");

    stream.pipe(toDatabase);
  }

  async updateProductIdForImages(productId, imageIds) {}

  async release() {
    await this.connection.release();
  }
}

module.exports = {
  connect,
};
