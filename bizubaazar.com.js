// --- STYLES ---
const style = document.createElement('style');
style.textContent = `
  body { font-family: sans-serif; margin: 0; padding: 20px; background: #fafafa; }
  .navbar { display: flex; justify-content: space-between; align-items: center; background: #d97706; padding: 15px; color: white; border-radius: 8px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; margin-top: 20px; }
  .card { background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #ddd; }
  button { background: #d97706; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
  .cart-panel { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 20px; }
`;
document.head.appendChild(style);

// --- DATA & STATE ---
const products = [
  { id: 1, name: "Gummy Bears", price: 2.99, icon: "🐻" },
  { id: 2, name: "Potato Chips", price: 3.49, icon: "🥔" },
  { id: 3, name: "Chocolate Bar", price: 1.99, icon: "🍫" }
];
let cart = [];

// --- BUILD HTML ---
const app = document.createElement('div');
app.innerHTML = `
  <div class="navbar">
    <h2>🍬 bizubazaar.com</h2>
    <span id="cart-count">Items: 0</span>
  </div>
  <div class="grid" id="product-grid"></div>
  <div class="cart-panel">
    <h3>Your Cart</h3>
    <div id="cart-items">Empty</div>
    <h4>Total: $<span id="cart-total">0.00</span></h4>
    <button id="checkout-btn">Checkout</button>
  </div>
`;
document.body.appendChild(app);

// --- LOGIC ---
function render() {
  // Render Products
  document.getElementById("product-grid").innerHTML = products.map(p => `
    <div class="card">
      <div style="font-size: 2rem;">${p.icon}</div>
      <h4>${p.name}</h4>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');

  // Render Cart
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById("cart-count").textContent = `Items: ${totalItems}`;
  document.getElementById("cart-total").textContent = totalPrice.toFixed(2);

  const cartItemsEl = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "Empty";
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <p>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>
    `).join('');
  }
}

window.addToCart = function(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  render();
};

document.getElementById("checkout-btn").onclick = () => {
  if (cart.length === 0) return alert("Cart is empty!");
  alert("Order placed successfully!");
  cart = [];
  render();
};

render();