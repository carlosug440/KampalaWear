// app.js

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Cart array
    let cart = [];

    // Display products dynamically
    function showProducts() {
        const productList = document.getElementById("product-list");
        if (!productList) return; // safety check

        productList.innerHTML = "";

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            // Product image
            const img = document.createElement("img");
            img.src = product.img;
            img.alt = product.name;
            img.classList.add("product-img");

            // Product name
            const name = document.createElement("h3");
            name.textContent = product.name;

            // Product price
            const price = document.createElement("p");
            price.textContent = "$" + product.price;

            // Add to cart button
            const button = document.createElement("button");
            button.textContent = "Add to Cart";
            button.addEventListener("click", () => addToCart(product.id));

            // Append elements
            productDiv.appendChild(img);
            productDiv.appendChild(name);
            productDiv.appendChild(price);
            productDiv.appendChild(button);

            productList.appendChild(productDiv);
        });
    }

    // Add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (product.stock > 0) {
            cart.push(product);
            product.stock--; // decrease stock
            showCart();
            showProducts();
        } else {
            alert("Out of stock!");
        }
    }

    // Remove product from cart
    function removeFromCart(index) {
        const removed = cart.splice(index, 1)[0];
        const product = products.find(p => p.id === removed.id);
        if (product) product.stock++; // restore stock
        showCart();
        showProducts();
    }

    // Display cart
    function showCart() {
        const cartDiv = document.getElementById("cart");
        if (!cartDiv) return; // safety check
        cartDiv.innerHTML = "";

        if (cart.length === 0) {
            cartDiv.textContent = "Cart is empty";
            return;
        }

        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            const itemText = document.createElement("span");
            itemText.textContent = item.name + " - $" + item.price;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => removeFromCart(index));

            itemDiv.appendChild(itemText);
            itemDiv.appendChild(removeBtn);
            cartDiv.appendChild(itemDiv);
        });

        // Total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const totalDiv = document.createElement("p");
        totalDiv.textContent = "Total: $" + total;
        totalDiv.classList.add("cart-total");
        cartDiv.appendChild(totalDiv);
    }

    // Initial display
    showProducts();
    showCart();
});
