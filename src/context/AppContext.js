import React, { useContext, useEffect, useReducer, useState } from "react";
import { baseService } from "../network/services/baseService.js";
import reducer from "./reducer.js";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const initialState = {
    cart: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await baseService.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log("category list error", error);
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        addToCart,
        categories,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
