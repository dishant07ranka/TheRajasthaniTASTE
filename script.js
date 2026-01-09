let cart = [];
let total = 0;

function addToCart(btn) {
  let product = btn.parentElement;
  let name = product.dataset.name;
  let price = parseInt(product.dataset.price);

  cart.push({name, price});
  total += price;

  renderCart();
}

function renderCart() {
  let list = document.getElementById("cartItems");
  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;

  let upiLink = `upi://pay?pa=9928166780@upi&pn=Rajkumari Ranka&am=${total}&cu=INR`;
  document.getElementById("payBtn").href = upiLink;
}
