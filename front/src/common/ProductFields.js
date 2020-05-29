import React from "react";

export class ProductFields extends React.Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            disabled={this.props.readonly}
            onChange={this.props.onChange}
            value={this.props.title}
            className="form-control"
            id="title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            disabled={this.props.readonly}
            onChange={this.props.onChange}
            value={this.props.manufacturer}
            className="form-control"
            id="manufacturer"
            name={"manufacturer"}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              disabled={this.props.readonly}
              onChange={this.props.onChange}
              value={this.props.price}
              className="form-control"
              id="price"
              name="price"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            disabled={this.props.readonly}
            onChange={this.props.onChange}
            className="form-control"
            id="description"
            name="description"
            value={this.props.description}></textarea>
        </div>
      </div>
    );
  }
}
