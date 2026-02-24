
const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price} ₾</p>
            <input type="number" value="${item.quantity}" min="1"
                onchange="changeQuantity(${index}, this.value)" />
            <button onclick="removeItem(${index})">Delete</button>
        `;

        cartContainer.appendChild(div);
    });

    totalPriceEl.textContent = total.toFixed(2);
}

function changeQuantity(index, qty) {
    cart[index].quantity = Number(qty);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
