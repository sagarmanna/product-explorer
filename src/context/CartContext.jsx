import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.product;
      const existing = state.items[p.id];
      const qty = existing ? existing.qty + 1 : 1;

      return {
        ...state,
        items: {
          ...state.items,
          [p.id]: { product: p, qty },
        },
      };
    }

    case "INC": {
      const id = action.id;
      const item = state.items[id];
      if (!item) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...item, qty: item.qty + 1 },
        },
      };
    }

    case "DEC": {
      const id = action.id;
      const item = state.items[id];
      if (!item) return state;

      const newQty = item.qty - 1;
      const newItems = { ...state.items };

      if (newQty <= 0) delete newItems[id];
      else newItems[id] = { ...item, qty: newQty };

      return { ...state, items: newItems };
    }

    case "REMOVE": {
      const newItems = { ...state.items };
      delete newItems[action.id];
      return { ...state, items: newItems };
    }

    case "CLEAR":
      return { items: {} };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const cart = useMemo(() => {
    const list = Object.values(state.items);
    const count = list.reduce((sum, it) => sum + it.qty, 0);
    const totalUSD = list.reduce((sum, it) => sum + it.product.price * it.qty, 0);
    return { items: list, count, totalUSD };
  }, [state.items]);

  const value = useMemo(
    () => ({
      cart,
      addToCart: (product) => dispatch({ type: "ADD", product }),
      inc: (id) => dispatch({ type: "INC", id }),
      dec: (id) => dispatch({ type: "DEC", id }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
