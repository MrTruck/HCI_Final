// +: Sheva | -: Patrick

function redDotNotif(){


    let currentuser = JSON.parse(localStorage.getItem('current-user')); 
    const cart_redDot = document.getElementById('cart_red_dot');
    const notif_redDot = document.getElementById('notif_red_dot');
    if (currentuser.cart.length > 0){ 
        cart_redDot.style.display = 'block';
    } 
    if (currentuser.history.length > 0 ) {
        notif_redDot.style.display = 'block';
    }
} 




//------Shev don't touch this-----------------------------------------------

autoSliding();


//--------------------------------------- locationpopup -----------------------------------------
function toggleLocationPopup() {
    const popup = document.getElementById("location-popup");
    const container = document.getElementById("location-container");

    // Get container position
    const rect = container.getBoundingClientRect();
 //   popup.style.top = `${rect.bottom + window.scrollY}px`; // Position below container
    popup.style.left = `${rect.left + window.scrollX}px`; // Align horizontally

    // Toggle visibility
    popup.classList.toggle("hidden");
}

function filterLocations() {
    const query = document.getElementById("location-search").value.toLowerCase();
    const locations = document.querySelectorAll("#location-list li");
    locations.forEach(function (location) {
        const locationText = location.textContent.toLowerCase();
        location.style.display = locationText.includes(query) ? "block" : "none";
    });
}

function updateLocation(locationName) {
    document.querySelector(".location_name").textContent = locationName;
    toggleLocationPopup(); // Close the popup
}
//--------------------------------------------------------------------------------


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
document.querySelectorAll('.popup').forEach(product => {
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
//==============================================================================slider=======================================================================

	// Access the Images
	let slideImages = document.querySelectorAll('div .slides img');
	// Access the next and prev buttons
	let next = document.querySelector('.next');
	let prev = document.querySelector('.prev');
	// Access the indicators
	let dots = document.querySelectorAll('.dot');

	var counter = 0;

	// Code for next button
	next.addEventListener('click', slideNext);
	function slideNext(){
	slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
	if(counter >= slideImages.length-1){
		counter = 0;
	}
	else{
		counter++;
	}
	slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
	indicators();
	}

	// Code for prev button
	prev.addEventListener('click', slidePrev);
	function slidePrev(){
	slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
	if(counter == 0){
		counter = slideImages.length-1;
	}
	else{
		counter--;
	}
	slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
	indicators();
	}

	// Auto slideing
	function autoSliding(){
		deletInterval = setInterval(timer, 3000);
		function timer(){
			slideNext();
			indicators();
		}
	}
	//autoSliding();

	// Stop auto sliding when mouse is over
	
	const container = document.querySelector('.slides');
	container.addEventListener('mouseover', function(){
		clearInterval(deletInterval);
	});

	// Resume sliding when mouse is out
	container.addEventListener('mouseout', autoSliding);

	// Add and remove active class from the indicators
	function indicators(){
		for(i = 0; i < dots.length; i++){
			dots[i].className = dots[i].className.replace(' active', '');
		}
		dots[counter].className += ' active';
	}

	// Add click event to the indicator
	function switchImage(currentImage){
		currentImage.classList.add('active');
		var imageId = currentImage.getAttribute('attr');
		if(imageId > counter){
		slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
		counter = imageId;
		slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
		}
		else if(imageId == counter){
			return;
		}
		else{
		slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
		counter = imageId;
		slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';	
		}
		indicators();
	}



