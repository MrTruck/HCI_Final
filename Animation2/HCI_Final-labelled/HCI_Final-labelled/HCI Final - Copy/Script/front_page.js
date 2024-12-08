// **1. Add event listeners to product elements for navigation**  
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        // **2. Retrieve product data attributes**
        const name = product.getAttribute('data-name');
        const price = product.getAttribute('data-price');
        const wasteIndex = product.getAttribute('data-waste-index');
        const image = product.getAttribute('data-image');

        // **3. Redirect to product details page with query parameters**  
        window.location.href = `product page.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wasteIndex=${encodeURIComponent(wasteIndex)}&img=${encodeURIComponent(image)}`;
    });
});

// **4. Retrieve waste and discount values from local storage**  
let accountwaste = localStorage.getItem('accountwaste');
let wastebar = document.querySelector('.line-waste-meter');
let accountdisc = localStorage.getItem('accountdisc');
let ecobar = document.querySelector('.line-eco-meter');

// **5. Cap the waste progress bar at 100%**  
if (accountwaste > 100) {
    accountwaste = 100;
}

// **6. Update waste progress bar width based on account waste**  
if (wastebar) {
    wastebar.style.width = accountwaste + '%';
}

// **7. Update eco progress bar width based on account discount**  
if (ecobar) {
    ecobar.style.width = accountdisc + '%';
}

// **8. Implement Time Decay button logic**  
const TimeDecay = document.getElementById('Time-Decay');
if (TimeDecay) {
    TimeDecay.addEventListener('click', () => {
        // **9. Decrease account waste by 2 units and reload the page**
        accountwaste -= 2;
        localStorage.setItem('accountwaste', accountwaste);
        location.reload();
    });
}

//for search bar -------------------------------------------------------------------

const products = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Tablet",
    "Charger",
    "Webcam",
    "Speakers"
  ];

  function showSuggestions() {
    const searchBar = document.getElementById("search-bar");
    const suggestions = document.getElementById("suggestions");
    const query = searchBar.value.toLowerCase();
    
    if (query.trim() === "") {
      suggestions.classList.add("hidden");
      return;
    }

    const filteredProducts = products.filter(product => 
      product.toLowerCase().includes(query)
    );

    suggestions.innerHTML = filteredProducts.length 
      ? filteredProducts.map(item => `<p onclick="selectSuggestion('${item}')">${item}</p>`).join("")
      : `<p>No results found</p>`;

    suggestions.classList.remove("hidden");
  }

  function selectSuggestion(product) {
    const searchBar = document.getElementById("search-bar");
    searchBar.value = product;
    document.getElementById("suggestions").classList.add("hidden");
  }

  document.addEventListener("click", (e) => {
    const searchContainer = document.querySelector(".search-container");
    if (!searchContainer.contains(e.target)) {
      document.getElementById("suggestions").classList.add("hidden");
    }
  });