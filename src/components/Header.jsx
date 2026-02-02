import { useCart } from "../context/CartContext";

export default function Header({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  totalShown,
  totalAll,
  onOpenCart,
}) {
  const { cart } = useCart();

  return (
    <div className="header">
      <div>
        <h1>Product Explorer</h1>
        <div className="helper">
          Showing <b>{totalShown}</b> of <b>{totalAll}</b> products
        </div>
      </div>

      <div className="controls">
        <input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button className="button cartBtn" onClick={onOpenCart}>
          Cart ({cart.count})
        </button>
      </div>
    </div>
  );
}
