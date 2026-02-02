import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, inc, dec, remove, clear } = useCart();
  const totalINR = Math.round(cart.totalUSD * 83);

  if (!open) return null;

  return (
    <div className="cartOverlay" onClick={onClose}>
      <div className="cartDrawer" onClick={(e) => e.stopPropagation()}>
        <div className="cartHeader">
          <h2>Your Cart</h2>
          <button className="button" onClick={onClose}>
            Close
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="centerBox">Cart is empty.</div>
        ) : (
          <>
            <div className="cartList">
              {cart.items.map(({ product, qty }) => (
                <div className="cartItem" key={product.id}>
                  <img className="cartImg" src={product.image} alt={product.title} />

                  <div className="cartInfo">
                    <div className="cartTitle" title={product.title}>
                      {product.title}
                    </div>
                    <div className="cartMeta">
                      ₹ {Math.round(product.price * 83)} × {qty}
                    </div>

                    <div className="cartActions">
                      <button className="miniBtn" onClick={() => dec(product.id)}>-</button>
                      <span className="qty">{qty}</span>
                      <button className="miniBtn" onClick={() => inc(product.id)}>+</button>

                      <button className="miniBtn danger" onClick={() => remove(product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cartFooter">
              <div className="total">
                Total: <b>₹ {totalINR}</b>
              </div>
              <div className="footerBtns">
                <button className="button" onClick={clear}>
                  Clear Cart
                </button>
                <button className="button primary" onClick={() => alert("Checkout demo")}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
