
const API_URL = "https://restaurant.stepprojects.ge/api";

async function getCategories() {
    const res = await fetch(`${API_URL}/Categories/GetAll`);
    return res.json();
}

async function getDishes() {
    const res = await fetch(`${API_URL}/Dishes/GetAll`);
    return res.json();
}
