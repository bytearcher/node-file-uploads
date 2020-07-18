const bytea = require("postgres-bytea");
const cleanDeep = require("clean-deep");
const stream = require("stream");
const util = require("util");
const { from: copyFrom } = require("pg-copy-streams");

const { pool } = require("./pool");

const pipeline = util.promisify(stream.pipeline);

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
    const response = await this.connection.query(`SELECT nextval('image_id_seq') AS id`);
    const id = response.rows[0].id;

    const toDatabase = this.connection.query(copyFrom(`COPY image (id, content_type, image) FROM STDIN`));

    toDatabase.write(id + "\t");
    toDatabase.write(contentType + "\t");

    await pipeline(stream, new bytea.Encoder(), toDatabase);

    return id;
  }

  async updateProductIdForImages(productId, imageIds) {
    await this.connection.query(
      `
                UPDATE image
                SET product_id = $1
                WHERE id = ANY ($2::INT[])`,
      [productId, imageIds]
    );
  }

  async findProduct(productId) {
    const result = await this.connection.query(
      `
                SELECT product.id                                    AS "id",
                       product.title                                 AS "title",
                       product.manufacturer                          AS "manufacturer",
                       product.price                                 AS "price",
                       product.description                           AS "description",
                       sort(array_remove(array_agg(image.id), NULL)) AS "imageIds"
                FROM product
                         LEFT OUTER JOIN image ON (product.id = image.product_id)
                WHERE product.id = $1
                GROUP BY product.id`,
      [productId]
    );
    return result.rows[0];
  }

  async getProducts() {
    const result = await this.connection.query(
      `
                SELECT product.id                                    AS "id",
                       product.title                                 AS "title",
                       product.manufacturer                          AS "manufacturer",
                       product.price                                 AS "price",
                       substring(product.description FROM 0 FOR 100) AS "description",
                       image.id                                      AS "representativeImageId"
                FROM product
                         LEFT JOIN LATERAL (SELECT id
                                            FROM image
                                            WHERE product_id = product.id
                                            ORDER BY id
                                            LIMIT 1) image ON TRUE
                ORDER BY product.manufacturer, product.title`
    );
    // remove nulls with cleanDeep
    return cleanDeep(result.rows);
  }

  async release() {
    await this.connection.release();
  }
}

module.exports = {
  connect,
};
