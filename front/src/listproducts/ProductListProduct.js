import React from "react";
import { Link } from "@reach/router";

import { formatMoney } from "../common/format";
import client from "../common/client";

export class ProductListProduct extends React.Component {
  render() {
    let backgroundImage;
    if (this.props.product.representativeImageId) {
      backgroundImage = `url(${client.getProductImageUrl(this.props.product.id, this.props.product.representativeImageId)})`;
    }

    return (
      <Link to={`/products/${this.props.product.id}`}>
        <div className="product-list-item shadow-sm">
          <div className="row">
            <div className="col-2">
              <div style={{ backgroundImage }} className="square-bg-image"></div>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <b>
                    {this.props.product.manufacturer} {this.props.product.title}
                  </b>
                </div>
              </div>
              <div className="row">
                <div className="col">{this.props.product.description}</div>
              </div>
            </div>
            <div className="col-2">${formatMoney(this.props.product.price)}</div>
          </div>
        </div>
      </Link>
    );
  }
}
