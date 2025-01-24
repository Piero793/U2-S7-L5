const productData = [
  {
    name: "Cuffie Wireless",
    description: "Esperienza audio di livello superiore",
    brand: "Audio bla",
    imageUrl:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3VmZmllfGVufDB8fDB8fHww",
    price: 100,
  },
  {
    name: "Chitarra Elettrica",
    description: "Lo strumento perfetto",
    brand: "Guitars Hero",
    imageUrl:
      "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaXRhcnJhfGVufDB8fDB8fHww",
    price: 599,
  },

  {
    name: "WebCam",
    description: "Massima risoluzione e microfono incorporato",
    brand: "Security WebCam",
    imageUrl:
      "https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViY2FtfGVufDB8fDB8fHww",
    price: 120,
  },

  {
    name: "SunGlasses",
    description: "Massima protezione contro i raggi UV",
    brand: "OKLEY",
    imageUrl:
      "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
    price: 150,
  },

  {
    name: "Berretto VA-RVCA",
    description: "Stile Perfetto",
    brand: "VA-RVCA",
    imageUrl:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhdHxlbnwwfHwwfHx8MA%3D%3D",
    price: 40,
  },

  {
    name: "Canon RF-400",
    description: "Camera Canon 2025",
    brand: "Canon",
    imageUrl:
      "https://images.unsplash.com/photo-1533425962554-06f6d8c4dacc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fub258ZW58MHx8MHx8fDA%3D",
    price: 650,
  },

  {
    name: "Body Cream",
    description: "Cream for body daily routine",
    brand: "Neauthy",
    imageUrl:
      "https://images.unsplash.com/photo-1601049413574-214d105b26e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyZWFtfGVufDB8fDB8fHww",
    price: 25,
  },

  {
    name: "Kettlebell 9kg",
    description: "Equipment for body training",
    brand: "New gym",
    imageUrl:
      "https://images.unsplash.com/photo-1632077804406-188472f1a810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V0dGxlYmVsbHxlbnwwfHwwfHx8MA%3D%3D",
    price: 45,
  },

  {
    name: "Lampada da scrivania",
    description: "Pratica e regolabile in tutte le direzioni",
    brand: "Nine Light",
    imageUrl:
      "https://images.unsplash.com/photo-1504194008492-c55ffe34e18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFtcGFkYXxlbnwwfHwwfHx8MA%3D%3D",
    price: 18,
  },
];

const BACKOFFICE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWE2ZmI3NDcwMTAwMTU4YjJhZjUiLCJpYXQiOjE3Mzc3MTAxOTEsImV4cCI6MTczODkxOTc5MX0.TVe53dhyU6yM9R0PhzRkPUomIM-wHCauqZQaAUDfHfk";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");

  if (productId) {
    console.log("Product ID:", productId);
    fetchProduct(productId);
  }

  const formElement = document.getElementById("product-form");
  if (formElement) {
    console.log("Form Element Found");
    formElement.addEventListener("submit", handleFormSubmit);
  }

  const deleteButton = document.getElementById("delete-button");
  if (deleteButton) {
    console.log("Delete Button Found");
    deleteButton.addEventListener("click", handleDelete);
  }
});

function fetchProduct(productId) {
  console.log("Fetching Product");
  fetch(`${BACKOFFICE_URL}${productId}`, {
    method: "GET",
    headers: {
      Authorization: token,
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
      populateForm(product);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
}

function populateForm(product) {
  document.getElementById("productName").value = product.name;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productBrand").value = product.brand;
  document.getElementById("productImageUrl").value = product.imageUrl;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productId").value = product._id;
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitted");

  const productId = document.getElementById("productId").value;
  const method = productId ? "PUT" : "POST";
  const urlEndpoint = productId ? `${BACKOFFICE_URL}${productId}` : BACKOFFICE_URL;

  const product = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDescription").value,
    brand: document.getElementById("productBrand").value,
    imageUrl: document.getElementById("productImageUrl").value,
    price: document.getElementById("productPrice").value,
  };

  fetch(urlEndpoint, {
    method: method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      console.log("HTTP Response:", response);
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error!: ${response.status}`);
    })
    .then((result) => {
      console.log("Form Submit Result:", result);
      alert(`Prodotto ${method === "POST" ? "creato" : "modificato"} con successo!`);
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Error submitting product:", error);
    });
}

function handleDelete() {
  console.log("Delete Button Clicked");
  const productId = document.getElementById("productId").value;

  if (!productId) {
    alert("Nessun prodotto selezionato per l'eliminazione.");
    return;
  }

  const confirmation = confirm("Sei sicuro di voler cancellare questo prodotto?");
  if (!confirmation) return;

  fetch(`${BACKOFFICE_URL}${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("HTTP Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error!: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      console.log("Delete Result:", result);
      alert("Prodotto cancellato con successo!");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
}

function getProductIdFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
