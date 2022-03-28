import React from "react";
import Filter from "./Components/Filter";
import ProductList from "./Components/ProductList";
import ProductsProvider from "./Provider/ProductsProvider";

const App = () => {
  return (
    <ProductsProvider>
      <div className="app">
        <Filter />
        <ProductList />
      </div>
    </ProductsProvider>
  );
};

export default App;
