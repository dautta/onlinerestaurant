
const dishesContainer = document.getElementById("dishesContainer");
const categoryFilter = document.getElementById("categoryFilter");
const spiceFilter = document.getElementById("spiceFilter");
const nutsFilter = document.getElementById("nutsFilter");
const vegFilter = document.getElementById("vegFilter");

let dishes = [];

async function init() {
    const categories = await getCategories();
    dishes = await getDishes();

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categoryFilter.appendChild(option);
    });

    renderDishes(dishes);
}

function renderDishes(data) {
    dishesContainer.innerHTML = "";

    data.forEach(dish => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${dish.image}" />
            <h3>${dish.name}</h3>
            <p>Spice: ${dish.spiciness}</p>
            <p>${dish.nuts ? "Contains Nuts" : "No Nuts"}</p>
            <p>${dish.vegetarian ? "Vegetarian" : ""}</p>
            <p><strong>${dish.price} ₾</strong></p>
            <button onclick="addToCart(${dish.id})">Add To Cart</button>
        `;

        dishesContainer.appendChild(card);
    });
}

function applyFilters() {
    let filtered = dishes;

    if (categoryFilter.value)
        filtered = filtered.filter(d => d.categoryId == categoryFilter.value);

    if (spiceFilter.value)
        filtered = filtered.filter(d => d.spiciness == spiceFilter.value);

    if (nutsFilter.checked)
        filtered = filtered.filter(d => d.nuts);

    if (vegFilter.checked)
        filtered = filtered.filter(d => d.vegetarian);

    renderDishes(filtered);
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const dish = dishes.find(d => d.id === id);

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...dish, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

categoryFilter.onchange = applyFilters;
spiceFilter.onchange = applyFilters;
nutsFilter.onchange = applyFilters;
vegFilter.onchange = applyFilters;

init();
