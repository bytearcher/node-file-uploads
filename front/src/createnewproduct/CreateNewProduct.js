import React from "react";
import { navigate } from "@reach/router";

import { ProductFields } from "../common/ProductFields";
import client from "../common/client";

export class CreateNewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      manufacturer: "",
      price: "",
      description: ""
    };
    this.fileInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { title, manufacturer, price, description } = this.state;
    const images = this.fileInput.current.files;

    const product = await client.createNewProduct({ title, manufacturer, price, description, images });

    navigate(`/products/${product.id}`);
  }

  render() {
    return (
      <form data-testid="loaded" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Create new product</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="images">Images</label>
                <input ref={this.fileInput} multiple className="form-control-file" id="images" name="images" type="file" accept="*/*" />
              </div>
            </div>
            <div className="col">
              <ProductFields
                readonly={false}
                onChange={this.handleChange}
                title={this.state.title}
                manufacturer={this.state.manufacturer}
                price={this.state.price}
                description={this.state.description}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input className="btn btn-primary" type="submit" value="Create" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
