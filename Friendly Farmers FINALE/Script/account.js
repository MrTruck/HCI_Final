
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
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
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
window.addEventListener('DOMContentLoaded', () => {
    // Ensure localStorage contains valid data
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
    let ecobar = document.querySelector('.line-eco-meter');
    let wastebar = document.querySelector('.line-waste-meter');
    let smalleco = document.querySelector('.miniEco')
    let smallwaste = document.querySelector('.miniWaste')
    const eligibleDiscount = document.getElementById('eligible-discount');  
    let home = document.querySelector('.logo')
    
    console.log(currentuser)
    if (!currentuser) {
        console.error('No user found in localStorage');
        return;
    }
    home.addEventListener('click',()=>{
        window.location.href='Home.html'
    }
    )

    // Populate user data into the HTML
    document.getElementById('full-name').textContent = currentuser.firstName + ' ' + currentuser.lastName|| 'N/A';
    document.getElementById('total-eco-points').textContent = currentuser.accountdisc || 0;
    document.getElementById('total-waste-points').textContent = currentuser.accountwaste || 0;
    const feedback = document.getElementById('feedback')

    
if (currentuser){
    let accountwaste = currentuser.accountwaste || 0;
    let accountdisc = currentuser.accountdisc || 0;
    
    let maxdiscount = accountdisc - accountwaste;  
    // **2. Cap maximum discount at 30% and display discount eligibility**  
    if (maxdiscount > 30) {  
        maxdiscount = 30;  
    }  
    if (maxdiscount > 0) {  
        eligibleDiscount.innerHTML = `You are eligible for a discount up to ${maxdiscount}%`;  
    } else {  
        eligibleDiscount.innerHTML = `No discounts available`;  
    } 
    if ((accountdisc - accountwaste) >20){
        feedback.innerHTML = "Great job! Your Eco Points are far exceeding your Waste Points, showing your dedication to sustainable shopping. Keep up the excellent work and enjoy your rewards!"
    
    

    }
    if ((accountdisc - accountwaste) > 0 && (accountdisc - accountwaste) <=20){
        feedback.innerHTML = "You're on the right track! While your Eco Points are slightly ahead of your Waste Points, there’s room to improve. Consider focusing on products with lower waste indices to boost your impact."
        
    }
    if ((accountdisc - accountwaste) <0){
        feedback.innerHTML = "It seems your Waste Points are outweighing your Eco Points. To make a greater environmental impact, try choosing more sustainable products with lower waste indices. Also, be mindful not to overbuy—purchasing only what you need can help reduce waste and keep your Eco-Meter balanced."
    }
    if ((accountdisc - accountwaste)== 0){
        feedback.innerHTML ="Your Eco Points and Waste Points are perfectly balanced. This is a good start, but aim to tip the scale by choosing more eco-friendly products to maximize your positive impact!"
    }
    if ((accountdisc + accountwaste)== 200){
        feedback.innerHTML ="Maximum levels reached! While your Eco Points showcase your commitment to sustainability, high Waste Points indicate room for improvement. Strive to reduce waste for a balanced approach."
    }
    const signOut = document.getElementById('signout');
    signOut.addEventListener('click', (event) => {
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('current-user');
    
    localStorage.setItem('logged-in', 'false');
    window.location.href = 'Home.html';

});

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

    if (smalleco) {
        smalleco.style.width = accountdisc + '%';
    }

    if (smallwaste) {
        smallwaste.style.width = accountwaste + '%';
    }
    console.log('Account Waste:', accountwaste);
    console.log('Account Discount:', accountdisc);



}
});