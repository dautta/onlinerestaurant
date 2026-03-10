const productsTable = document.getElementById("products");
const totalPriceEl = document.getElementById("totalPrice");

var cartProductsId = [];

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    // cartContainer.innerHTML = "";
    // let total = 0;

    // cart.forEach((item, index) => {
    //     total += item.price * item.quantity;

    //     const div = document.createElement("div");
    //     div.className = "card";
    //     div.innerHTML = `
    //         <h3>${item.name}</h3>
    //         <p>${item.price} ₾</p>
    //         <input type="number" value="${item.quantity}" min="1"
    //             onchange="changeQuantity(${index}, this.value)" />
    //         <button onclick="removeItem(${index})">Delete</button>
    //     `;

    //     cartContainer.appendChild(div);
    // });

    // totalPriceEl.textContent = total.toFixed(2);

    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll").then(function (res) {
        return res.json()
    }).then(function (products) {

        var totalPrice = 0;

        products.forEach((element, index) => {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            td1.textContent = (index + 1)

            var img = document.createElement("img");
            img.src = element.product.image;
            img.width = "50"

            var td2 = document.createElement("td");
            td2.textContent = " " + element.product.name;
            td2.prepend(img);
            // td2.appendChild(img);

            var td3 = document.createElement("td");
            td3.textContent = element.product.price

            var deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger"
            deleteButton.textContent = "წაშლა"

            deleteButton.onclick = function () {
                axios.delete("https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/" + element.product.id).then(function (response) {
                    window.location.reload();
                }).catch(function (err) {
                    console.log(err);
                });
            }

            var td4 = document.createElement("td");
            td4.appendChild(deleteButton)

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            productsTable.appendChild(tr)

            totalPrice += element.product.price;

            cartProductsId.push(element.product.id);
        });

        totalPriceEl.innerHTML = totalPrice
    });
}

function purchase() {
    for (let id of cartProductsId) {
        axios.delete("https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/" + id).then(function (response) {
            window.alert("შეკვეთა განხორციელდა");
            window.location.replace("index.html");
        }).catch(function (err) {
            console.log(err);
        });
    }
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
