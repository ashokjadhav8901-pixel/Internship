let products = [
    {
        id: 1,
        name: "Basmati Rice",
        price: 1200,
        img:"C:\76\basmati-rice.webp"
    },
    {
        id: 2,
        name: "Sunflower Oil",
        price: 950,
        img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f8c"
    },
    {
        id: 3,
        name: "Sugar Pack",
        price: 520,
        img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38"
    },
    {
        id: 4,
        name: "Wheat Flour",
        price: 680,
        img: "https://images.unsplash.com/photo-1608198093002-de8a3c1d76a3"
    },
    {
        id: 5,
        name: "Fresh Vegetables",
        price: 300,
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e"
    },
    {
        id: 6,
        name: "Dry Fruits Combo",
        price: 1500,
        img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec"
    }
];

let cart = [];

function displayProducts(list) {
    let html = "";
    list.forEach(p => {
        html += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="sale">🔥 Special Offer</p>
            <p>Price: ₹${p.price}</p>
            <p>⭐⭐⭐⭐☆</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
        `;
    });
    document.getElementById("productList").innerHTML = html;
}

function addToCart(id) {
    let item = cart.find(p => p.id === id);
    if (item) {
        item.qty += 1;
    } else {
        let product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
}

function updateCart() {
    let html = "";
    let total = 0;

    cart.forEach((p, index) => {
        total += p.price * p.qty;
        html += `
        <p>
            ${p.name} (x${p.qty}) – ₹${p.price * p.qty}
            <button onclick="removeFromCart(${index})">Remove</button>
        </p>
        `;
    });

    document.getElementById("cart").innerHTML = html;
    document.getElementById("total").innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function sortProducts(type) {
    let sorted = [...products];
    if (type === "low") sorted.sort((a, b) => a.price - b.price);
    if (type === "high") sorted.sort((a, b) => b.price - a.price);
    displayProducts(sorted);
}

function searchProduct(text) {
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(text.toLowerCase())
    );
    displayProducts(filtered);
}

displayProducts(products);
