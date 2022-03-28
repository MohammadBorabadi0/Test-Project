import React from "react";
import { useProducts } from "../Provider/ProductsProvider";

const ProductList = () => {
  const { state } = useProducts();
  const { products, products_error, products_loading } = state;

  if (products_loading) {
    return (
      <section className="productList">
        <h3>Loading...</h3>
      </section>
    );
  }

  if (products_error) {
    return (
      <section className="productList">
        <h3>An Error Occured</h3>
      </section>
    );
  }

  return (
    <section className="productList">
      {products.map((item) => (
        <div key={item.id} className="productItem">
          <div className="productItem-header">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="productItem-body">
            <h4>{item.name}</h4>
            <span>$ {item.price}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
