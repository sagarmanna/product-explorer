import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="card-body">
        <h3 className="card-title" title={product.title}>
          {product.title}
        </h3>

        <div className="badges">
          <span className="badge">{product.category}</span>
          <span className="badge">⭐ {product.rating?.rate ?? "N/A"}</span>
          <span className="badge">{product.rating?.count ?? 0} reviews</span>
        </div>

        <div className="priceRow">
          <div className="price">₹ {Math.round(product.price * 83)}</div>
          <button className="button addBtn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
