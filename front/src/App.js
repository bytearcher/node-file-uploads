import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import { Header } from "./common/Header";
import { ListProducts } from "./listproducts/ListProducts";
import { CreateNewProduct } from "./createnewproduct/CreateNewProduct";
import { ViewProduct } from "./viewproduct/ViewProduct";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <ListProducts path="/" />
          <CreateNewProduct path="/products/new" />
          <ViewProduct path="/products/:productId" />
        </Router>
      </>
    );
  }
}

export default App;
