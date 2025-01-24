const DETAIL_URL = "https://striveschool-api.herokuapp.com/api/product/";
const DETAIL_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWE2ZmI3NDcwMTAwMTU4YjJhZjUiLCJpYXQiOjE3Mzc3MTAxOTEsImV4cCI6MTczODkxOTc5MX0.TVe53dhyU6yM9R0PhzRkPUomIM-wHCauqZQaAUDfHfk";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const productId = getProductIdFromURL();
  if (productId) {
    fetchProduct(productId);
  }
});

function fetchProduct(productId) {
  console.log("Fetching Product ID:", productId);
  fetch(`${DETAIL_URL}${productId}`, {
    method: "GET",
    headers: {
      Authorization: DETAIL_TOKEN,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("HTTP Response:", response);
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error!: ${response.status}`);
    })
    .then((product) => {
      console.log("Product Data:", product);
      displayProductDetails(product);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
}

function displayProductDetails(product) {
  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-image").src = product.imageUrl;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-description").innerText = product.description;
  document.getElementById("product-brand").innerText = product.brand;
  document.getElementById("product-price").innerText = product.price;
}

function getProductIdFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
