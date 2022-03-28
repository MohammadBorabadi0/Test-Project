import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  GET_PRODOUCTS_BEGIN,
  GET_PRODOUCTS_ERROR,
  GET_PRODOUCTS_SUCCESS,
  SEARCH,
  FILTER,
  SORT,
} from "./actions";

const initialState = {
  products: [],
  products_loading: false,
  products_error: false,
  text: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODOUCTS_BEGIN: {
      return { ...state, products_loading: true };
    }
    case GET_PRODOUCTS_SUCCESS: {
      return { ...state, products_loading: false, products: action.payload };
    }
    case GET_PRODOUCTS_ERROR: {
      return { ...state, products_loading: false, products_error: true };
    }
    case SEARCH: {
      const value = action.e;
      const filteredProducts = state.products.filter((i) =>
        i.name.toLowerCase().includes(value.toLowerCase())
      );
      return { ...state, products: filteredProducts };
    }
    default: {
      return state;
    }
  }
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODOUCTS_BEGIN });
    try {
      const response = await axios.get(
        "https://course-api.com/react-store-products"
      );
      const products = response.data;
      dispatch({ type: GET_PRODOUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODOUCTS_ERROR, payload: error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

export const useProducts = () => useContext(ProductsContext);
