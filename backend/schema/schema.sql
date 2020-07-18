CREATE TABLE product (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255)   NOT NULL,
  manufacturer VARCHAR(255)   NOT NULL,
  price        NUMERIC(11, 2) NOT NULL,
  description  TEXT
);

CREATE TABLE image (
  id           SERIAL PRIMARY KEY,
  product_id   INTEGER REFERENCES product (id),
  image        BYTEA        NOT NULL,
  content_type VARCHAR(255) NOT NULL
);

CREATE EXTENSION intarray;
