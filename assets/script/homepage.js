const HOME_URL = "https://striveschool-api.herokuapp.com/api/product/";

function fetchProducts() {
  // Appare  lo spinner
  document.body.classList.add("loading");

  fetch(HOME_URL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWE2ZmI3NDcwMTAwMTU4YjJhZjUiLCJpYXQiOjE3Mzc3MTAxOTEsImV4cCI6MTczODkxOTc5MX0.TVe53dhyU6yM9R0PhzRkPUomIM-wHCauqZQaAUDfHfk",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("HTTP Response:", response); // Log per vedere la risposta HTTP
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error!: ${response.status}`);
    })
    .then((products) => {
      console.log("Prodotti:", products); // Log per vedere i prodotti
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    })
    .finally(() => {
      // Nascondo lo spinner
      document.body.classList.remove("loading");
    });
}

function displayProducts(productArray) {
  console.log("Display Products:", productArray); // Log per vedere i prodotti in display
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Pulisco la lista per aggiungere altro

  productArray.forEach((product) => {
    console.log("Prodotto:", product); // Log per ogni prodotto
    const card = document.createElement("div");
    card.className = "col-sm-4 col-md-3 mb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" onclick="window.location.href='./productDetail.html?id=${product._id}'">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Price:</strong> €${product.price}</p>
          <button class="btn btn-secondary mt-2" onclick="editProduct('${product._id}')">Modifica</button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });
}

function editProduct(productId) {
  window.location.href = `./backOffice.html?id=${productId}`;
}

// Inizia a caricare i prodotti quando il documento è pronto
document.addEventListener("DOMContentLoaded", fetchProducts);
