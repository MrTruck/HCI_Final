// Modal logic
const modal = document.getElementById('customModal');  // Corrected ID selector
const closeBtn = document.querySelector('.close-btn');
const detailsButtons = document.querySelectorAll('.details-btn');

// Show modal on "Details" button click
detailsButtons.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'block';
	});
});

// Close modal when "X" is clicked
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

// Close modal when clicking outside content
window.addEventListener('click', (event) => {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
});

// Handle displaying items from user's history in cart
document.addEventListener('DOMContentLoaded', function () {
	let currentuser = JSON.parse(localStorage.getItem('current-user')); 
	const history = currentuser.history; 
	const transactionItemContainer = document.querySelector('.transaction-items'); // Container to hold transaction items


	

	// Function to display history items in the transaction list
	function displayHistoryItems() {
		if (history.length === 0) {
			transactionItemContainer.style.display = 'none'; // Hide if history is empty
		} else {
			transactionItemContainer.style.display = 'block'; // Show if history has items
			transactionItemContainer.innerHTML = ''; // Clear previous content


			// Sort history by purchaseDate (newest first)
			const sortedHistory = history.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
			// Loop through history to create item elements
			sortedHistory.forEach(item => {
				// Get the correct quantity for each item
				const price = Number(item.price) || 0; // Ensure valid number
				const quantity = Number(item.quantity) || 0; // Ensure valid number
				const rawDate = item.purchaseDate;
				const date = new Date(rawDate);

				const formattedDateTime = new Intl.DateTimeFormat('en-CA', { 
					year: 'numeric', 
					month: '2-digit', 
					day: '2-digit', 
					hour: '2-digit', 
					minute: '2-digit', 
					hour12: false // Use 24-hour format
				}).format(date);

				// Log error if price or quantity is invalid
				if (isNaN(price) || isNaN(quantity)) {
					console.error(`Invalid item data:`, item);
				}

				// Create a div for each transaction item
				const transactionItemDiv = document.createElement('div');
				transactionItemDiv.classList.add('transaction-item');
				transactionItemDiv.id = `product-${item.id}`;
				transactionItemDiv.innerHTML = `
					<p class="transaction-date">${formattedDateTime}</p>
					<div class="transaction-details">
						<img src="${item.img}" alt="${item.name}" width="100" height="100" class="transaction-image" />
						<div class="details-text">
							<p class="item-title">${item.name}</p>
							<p class="item-count">Quantity: <span class="quantity">${item.quantity}</span></p>
						</div>
						<p class="item-total">Total: <strong>$${(Number(price)) * Number(quantity)}</strong></p>
					</div>
					<div class="transaction-actions">
						<button class="details-btn" data-id="${item.id}">Details</button>
						<button class="track-btn">Track</button>
					</div>
				`;

				// Append the item to the container
				transactionItemContainer.appendChild(transactionItemDiv);

				// Event listener for details button
				const detailsButton = transactionItemDiv.querySelector('.details-btn');
				detailsButton.addEventListener('click', () => {
					showItemDetails(item);
				});
			});
		}
	}

	// Function to show details in a popup
	function showItemDetails(item) {
		const popup = document.querySelector('.popup');
		const popupOverlay = document.querySelector('.popup-overlay');
		let popupImage = popup.querySelector('img');
		let popupTitle = popup.querySelector('h2');
		let popupPrice = popup.querySelector('p');
		let popupDescription = document.createElement('p');
		let popupCategory = document.createElement('p');
		popup.appendChild(popupDescription);
		popup.appendChild(popupCategory);

		popupTitle.innerHTML = item.name;
		popupPrice.innerHTML = `$${item.price}`;
		popupImage.src = item.img; // Assuming item.img contains the image source
		popupDescription.innerHTML = item.description || 'No description available.';
		popupCategory.innerHTML = `Category: ${item.category}` || 'No category available.';
		
		popup.style.display = 'block';
		popupOverlay.style.display = 'block';

		// Close popup functionality
		const closeButton = popup.querySelector('.close');
		closeButton.addEventListener('click', () => {
			popup.style.display = 'none';
			popupOverlay.style.display = 'none';
		});
	}

	// Initial call to display the history items
	displayHistoryItems();
}); 
//shows sign in button only when signed out// 
document.addEventListener('DOMContentLoaded', function() {
  
	let logged_in = localStorage.getItem('logged-in') || 'false'; // Set default if null
  
	const signInButton = document.getElementById('sign-in')
	const accounticon = document.getElementById('accounticon');
  
	if (logged_in === 'false') {
		accounticon.style.display = "none";
		signInButton.style.display = "block";
	} else {
		accounticon.style.display = "block";
		signInButton.style.display = "none";
	}
  
	signInButton.addEventListener('click', () => {
		window.location.href = 'Login.html';
	});
  });
  const signInButton = document.getElementById('sign-in')
  signInButton.addEventListener('click', (event) => {
	window.location.href = 'Login.html';
  });
  
//sort features (dropdown)

// Get the dropdown toggle button and dropdown content
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');

// Function to toggle the dropdown
function toggleDropdown() {
  dropdownContent.classList.toggle('show');
}

// Event listener for the dropdown toggle button
dropdownToggle.addEventListener('click', toggleDropdown);

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    if (dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
    }
  }
});

//actual sorting features 
const dropdownOptions = document.querySelectorAll('.filter-option');

// Function to sort and display items based on selected criteria
function sortItems(criteria) {
    const transactionItems = Array.from(document.querySelectorAll('.transaction-item'));
    
    let sortedItems;
    switch (criteria) {
		case 'Newest':
			sortedItems = transactionItems.sort((a, b) => {
				const dateA = new Date(a.querySelector('.transaction-date').innerText);
				const dateB = new Date(b.querySelector('.transaction-date').innerText);
				return dateB - dateA; // Newest first
			});
			break; // Add break here
	
		case 'Oldest':
			sortedItems = transactionItems.sort((a, b) => {
				const dateA = new Date(a.querySelector('.transaction-date').innerText);
				const dateB = new Date(b.querySelector('.transaction-date').innerText);
				return dateA - dateB; // Oldest first
			});
			break; // Ensure there's a break here too
	
		case 'Price: Low to High':
			sortedItems = transactionItems.sort((a, b) => {
				const priceA = parseFloat(a.querySelector('.item-total strong').innerText.replace('$', ''));
				const priceB = parseFloat(b.querySelector('.item-total strong').innerText.replace('$', ''));
				return priceA - priceB;
			});
			break;
	
		case 'Price: High to Low':
			sortedItems = transactionItems.sort((a, b) => {
				const priceA = parseFloat(a.querySelector('.item-total strong').innerText.replace('$', ''));
				const priceB = parseFloat(b.querySelector('.item-total strong').innerText.replace('$', ''));
				return priceB - priceA;
			});
			break;
	
		case 'Alphabetical':
			sortedItems = transactionItems.sort((a, b) => {
				const nameA = a.querySelector('.item-title').innerText.toLowerCase();
				const nameB = b.querySelector('.item-title').innerText.toLowerCase();
				return nameA.localeCompare(nameB);
			});
			break;
	
		default:
			sortedItems = transactionItems; // No sorting
	}
	

    // Clear the current display and append sorted items
    const transactionItemContainer = document.querySelector('.transaction-items');
    transactionItemContainer.innerHTML = '';
    sortedItems.forEach(item => transactionItemContainer.appendChild(item));
	dropdownToggle.innerText = criteria;
}

// Event listeners for sort options
dropdownOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        const criteria = event.target.innerText;

        sortItems(criteria);
    });
});