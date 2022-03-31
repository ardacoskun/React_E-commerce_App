const reducer = (state, action) => {
  if (action.type === "ADD_PRODUCT") {
    let checkCart = state.cart.find((item) => item.id === action.payload.id);

    if (checkCart) {
      checkCart.quantity += 1;

      return { ...state, quantity: checkCart.quantity };
    }
    return {
      ...state,
      cart: [...state.cart, { ...action.payload, quantity: 1 }],
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === "INCREASE") {
    let newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    console.log("increase", newCart);
    return { ...state, cart: newCart };
  }

  if (action.type === "DECREASE") {
    let newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);

    return { ...state, cart: newCart };
  }

  return state;
};

export default reducer;
