autoSliding();

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
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('barcontainer');
    const dropdown = document.getElementById('dropdown-content');

    toggle.addEventListener('click', function () {
        dropdown.classList.toggle('show'); // Toggle the show class
    });
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


