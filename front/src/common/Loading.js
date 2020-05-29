import React from "react";

export class Loading extends React.Component {
  render() {
    return (
      <div data-testid="loading" className="container">
        <div className="row pt-5 pb-5">
          <div className="col">
            <strong>Loading...</strong>
          </div>
          <div className="col text-right">
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    );
  }
}
