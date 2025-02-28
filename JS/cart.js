// Cart array to store items
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartModal = document.querySelector(".cart-modal");
const cartItems = document.getElementById("cart-items");

// Total price element
const totalPrice = document.createElement("div");
totalPrice.id = "total-price";
totalPrice.style.fontWeight = "bold";
totalPrice.style.marginTop = "10px";
totalPrice.innerText = "Total: $0";
cartModal.appendChild(totalPrice);

// Buy button
const buyButton = document.createElement("button");
buyButton.innerText = "Buy Now";
buyButton.style.marginTop = "10px";
buyButton.style.display = "block";
buyButton.onclick = buyItems;
cartModal.appendChild(buyButton);

// Add product to cart
document.querySelectorAll(".product button").forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const product = btn.parentElement;
    const name = product.querySelector("h3").innerText;
    const priceText = product.querySelector("p").innerText;
    const price = parseFloat(priceText.match(/\d+/)[0]);
    const image = product.querySelector("img").src;

    if (!isNaN(price)) {
      const item = { name, price, image };
      cart.push(item);
      updateCart();
    }
  });
});

// Update Cart Function
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <li>
        <img src="${item.image}" width="50" style="margin-right: 10px" />
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Remove</button>
      </li>`;
  });

  cartCount.innerText = cart.length;
  totalPrice.innerText = `Total: $${total.toFixed(2)}`;

  // Always show the Buy button
  buyButton.style.display = "block";
}

// Remove Item Function
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Clear Cart Function
function clearCart() {
  cart = [];
  updateCart();
}

// Buy Items Function
function buyItems() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  clearCart();
}

// Cart Modal Toggle
document.querySelector(".cart-icon").addEventListener("click", () => {
  cartModal.classList.toggle("show");
});