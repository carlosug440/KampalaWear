// Display products
function showProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // Product Image
        const img = document.createElement("img");
        img.src = product.img;
        img.alt = product.name;
        img.classList.add("product-img");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "$" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productDiv.appendChild(button);

        productList.appendChild(productDiv);
    });
                     }
