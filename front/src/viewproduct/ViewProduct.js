import React from "react";

import { Loading } from "../common/Loading";
import { ProductFields } from "../common/ProductFields";
import client from "../common/client";

export class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    const product = await client.getProduct(this.props.productId);
    this.setState({
      loading: false,
      product
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div data-testid="loaded" className="container">
        <div className="row">
          <div className="col">
            <h1>
              {this.state.product.manufacturer} {this.state.product.title}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              {this.state.product.imageIds.map((imageId) => (
                <div className="col-6" key={imageId}>
                  <div className="pt-2 pb-2">
                    <div className="img-thumbnail">
                      <div
                        className="square-bg-image"
                        style={{ backgroundImage: `url(${client.getProductImageUrl(this.state.product.id, imageId)})` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col">
            <ProductFields
              readonly={true}
              title={this.state.product.title}
              manufacturer={this.state.product.manufacturer}
              price={this.state.product.price}
              description={this.state.product.description}
            />
          </div>
        </div>
      </div>
    );
  }
}
