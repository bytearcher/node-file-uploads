import React from "react";
import { Link } from "@reach/router";

import { Loading } from "../common/Loading";
import client from "../common/client";
import { ProductListProduct } from "./ProductListProduct";

export class ListProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    const products = await client.getProducts();
    this.setState({
      loading: false,
      products
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div data-testid="loaded" className="container">
        <div className="row pb-4">
          <div className="col"></div>
        </div>
        {this.state.products.map((product) => (
          <ProductListProduct product={product} key={product.id} />
        ))}
        <div className="row pt-4">
          <div className="col">
            <Link to="/products/new" className="btn btn-primary">
              Create
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
