async function insertProduct(product) {
  const { title, manufacturer, price, description } = product;
  const response = await connection.query(
    `
              INSERT INTO product (title, manufacturer, price, description)
              VALUES ($1, $2, $3, $4)
              RETURNING id`,
    [title, manufacturer, price, description]
  );
  return response.rows[0].id;
}
