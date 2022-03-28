import React, { useState } from "react";
import { SEARCH } from "../Provider/actions";
import { useProducts } from "../Provider/ProductsProvider";

const Search = () => {
  const [search, setSearch] = useState("");
  const { state, dispatch } = useProducts();
  const { products } = state;

  const changeHandler = (e) => {
    setSearch(e.target.value);
    dispatch({ type: SEARCH, e: e.target.value });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        placeholder="Search in products"
        onChange={changeHandler}
      />
    </div>
  );
};

export default Search;
