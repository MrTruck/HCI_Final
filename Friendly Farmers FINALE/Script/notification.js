
function updateWastePoints() {
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
    if (!currentuser) return; // If there's no current user, exit

    let lastUpdated = localStorage.getItem('lastUpdated'); // Get last updated date from localStorage
    let currentDate = new Date(); // Get current date

    console.log("Last Updated:", lastUpdated); // Check if lastUpdated exists
    console.log("Current Date:", currentDate); // Check current date

    if (lastUpdated) {
        lastUpdated = new Date(lastUpdated); // Convert string to Date object
        let timeDiff = currentDate - lastUpdated; // Difference in milliseconds
        let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to full days

        console.log("Days Difference:", daysDiff); // Log days difference

        if (daysDiff >= 2) {
            let accountwaste = currentuser.accountwaste || 0;
            accountwaste = Math.max(0, accountwaste - 2);
            currentuser.accountwaste = accountwaste;

            localStorage.setItem('current-user', JSON.stringify(currentuser));
            localStorage.setItem('lastUpdated', currentDate.toISOString()); // Save current date
            console.log("Waste points updated:", accountwaste); // Log the updated waste points
        }
    } else {
        // If there's no lastUpdated date, set it to the current date
        localStorage.setItem('lastUpdated', currentDate.toISOString());
        console.log("No lastUpdated found. Setting to current date.");
    }
}



document.addEventListener('DOMContentLoaded', function () {
    updateWastePoints(); // Call the function to update the waste points
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
    if (currentuser) {
        let wastebar = document.querySelector('.line-waste-meter');
        if (wastebar) {
            wastebar.style.width = currentuser.accountwaste + '%';
        }
    }
});
//--------------------------------------------------------------



// **1. Add event listeners to product elements for navigation**  
document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('click', () => {
      // **2. Retrieve product data attributes**
      const name = product.getAttribute('data-name');
      const price = product.getAttribute('data-price');
      const wasteIndex = product.getAttribute('data-waste-index');
      const image = product.getAttribute('data-image');
      const signInButton = document.getElementById('sign-in')

      // **3. Redirect to product details page with query parameters**  
      window.location.href = `product page.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wasteIndex=${encodeURIComponent(wasteIndex)}&img=${encodeURIComponent(image)}`;
  });
});

//load current user's data// 
let currentuser = JSON.parse(localStorage.getItem('current-user'))
console.log(currentuser)


let ecobar = document.querySelector('.line-eco-meter');
let wastebar = document.querySelector('.line-waste-meter');

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


// **4. Retrieve waste and discount values from local storage**  
//let accountwaste = localStorage.getItem('accountwaste');

//let accountdisc = localStorage.getItem('accountdisc');


if (currentuser){

  

  let accountwaste = currentuser.accountwaste || 0;
  let accountdisc = currentuser.accountdisc || 0;

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
  console.log('Account Waste:', accountwaste);
  console.log('Account Discount:', accountdisc);

      // **8. Implement Time Decay button logic**  
  const TimeDecay = document.getElementById('Time-Decay');
  if (TimeDecay) {
      TimeDecay.addEventListener('click', () => { 
          // **9. Decrease account waste by 2 units and reload the page**
          accountwaste = Math.max(0, accountwaste - 2);
          currentuser.accountwaste = accountwaste; 
          localStorage.setItem('current-user', JSON.stringify(currentuser));
          
          
      
          //update user data in 'users' array
          let users = JSON.parse(localStorage.getItem('users')) || [];
          const userIndex = users.findIndex(user => user.email === currentuser.email)
          if (userIndex !== -1){
              users[userIndex] = currentuser;
              localStorage.setItem('users',JSON.stringify(users));
          }
          location.reload();
      });
}
}


//<!--=============================================drop down WASTE INDEX=====================================================-->
document.addEventListener('DOMContentLoaded', function () {
    currentuser
	const toggle = document.getElementById('barcontainer');
    const dropdown = document.getElementById('dropdown-content');
	const minieco = document.querySelector('.mini-eco');
	const miniwaste = document.querySelector('.mini-waste');
	const minieconumber = document.getElementById('mini-eco-points')
	const miniwastenumber = document.getElementById('mini-waste-points')

    toggle.addEventListener('click', function () {
        dropdown.classList.toggle('show'); // Toggle the show class
    });
	if (miniwaste) {
		miniwaste.style.width = currentuser.accountwaste + '%';
		miniwastenumber.innerHTML = currentuser.accountwaste;
		
		}  
	
	if (minieco) {
		minieco.style.width = currentuser.accountdisc + '%';
		minieconumber.innerHTML = currentuser.accountdisc;
		}  
	
	// Close dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show'); // Remove the show class
        }})
	

});








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
						<img src="${item.image}" alt="${item.name}" width="100" height="100" class="transaction-image" />
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
  
//sort features (dropdown)

// Get the dropdown toggle button and dropdown content
const dropdownToggle = document.querySelector('.SRTdropdown-toggle');
const dropdownContent = document.querySelector('.SRTdropdown-content');

// Function to toggle the dropdown
function toggleDropdown() {
  dropdownContent.classList.toggle('show');
}

// Event listener for the dropdown toggle button
dropdownToggle.addEventListener('click', toggleDropdown);

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
  if (!event.target.matches('.SRTdropdown-toggle')) {
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