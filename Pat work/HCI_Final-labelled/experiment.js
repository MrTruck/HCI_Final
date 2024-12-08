// Sample product data
const products = [
  { id: 1, name: "Apple", price: 1.00, category: "fruits", subcategory: "organic", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Banana", price: 0.50, category: "fruits", subcategory: "local", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Carrot", price: 0.30, category: "vegetables", subcategory: "organic", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Milk", price: 1.20, category: "dairy", subcategory: "local", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Chips", price: 2.00, category: "snacks", subcategory: "imported", image: "https://via.placeholder.com/150" },
  // Add more products as needed
];

// Function to display products
function displayProducts(filteredProducts) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = ''; // Clear existing products

  filteredProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h5>${product.name}</h5>
          <p>$${product.price.toFixed(2)}</p>
          <button>Add to Cart</button>
      `;
      productGrid.appendChild(productItem);
  });
}

// Function to filter products
function filterProducts() {
  const category = document.querySelector('.filter-button.active[data-category]').dataset.category;
  const subcategory = document.querySelector('.filter-button.active[data-subcategory]').dataset.subcategory;
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

  const filteredProducts = products.filter(product => {
      const categoryMatch = category === 'all' || product.category === category;
      const subcategoryMatch = subcategory === 'all' || product.subcategory === subcategory;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      return categoryMatch && subcategoryMatch && priceMatch;
  });

  displayProducts(filteredProducts);
}

// Event listeners for category buttons
const categoryButtons = document.querySelectorAll('#category-buttons .filter-button');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts();
  });
});

// Event listeners for subcategory buttons
const subcategoryButtons = document.querySelectorAll('#subcategory-buttons .filter-button');
subcategoryButtons.forEach(button => {
  button.addEventListener('click', () => {
      subcategoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts();
  });
});

// Event listeners for price inputs
document.getElementById('min-price').addEventListener('input', filterProducts);
document.getElementById('max-price').addEventListener('input', filterProducts);

// Initial display of all products
displayProducts(products);