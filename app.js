// Cart array
let cart = [];

// Display products
function showProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "$" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productDiv.appendChild(button);

        productList.appendChild(productDiv);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product.stock > 0) {
        cart.push(product);
        product.stock--; // decrease stock
        showCart();
        showProducts();
    } else {
        alert("Out of stock!");
    }
}

// Display cart
function showCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.textContent = "Cart is empty";
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = item.name + " - $" + item.price;

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromCart(index));

        itemDiv.appendChild(removeBtn);
        cartDiv.appendChild(itemDiv);
    });

    // Show total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement("p");
    totalDiv.textContent = "Total: $" + total;
    cartDiv.appendChild(totalDiv);
}

// Remove from cart
function removeFromCart(index) {
    const removed = cart.splice(index, 1)[0];
    const product = products.find(p => p.id === removed.id);
    product.stock++; // add back stock
    showCart();
    showProducts();
}

// Initial display
showProducts();
showCart();
