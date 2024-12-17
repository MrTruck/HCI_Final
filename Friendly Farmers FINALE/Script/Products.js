// +: Sheva | -: Patrick



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



// **1. Add event listeners to product elements for navigation**/*  
//document.querySelectorAll('.product').forEach(product => {
//product.addEventListener('click', () => {
    // **2. Retrieve product data attributes**
//    const name = product.getAttribute('data-name');
//    const price = product.getAttribute('data-price');
 //   const wasteIndex = product.getAttribute('data-waste-index');
 //   const image = product.getAttribute('data-image');
 //   const signInButton = document.getElementById('sign-in')

//    // **3. Redirect to product details page with query parameters**  
//    window.location.href = `product page.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wasteIndex=${encodeURIComponent(wasteIndex)}&img=${encodeURIComponent(image)}`;
//});

//});

//load current user's data// 
let currentuser = JSON.parse(localStorage.getItem('current-user')) || { cart: [] };
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



//------Shev don't touch this-----------------------------------------------

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;

  // Hide all tab contents
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active state from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.boxShadow = "";
  }

  // Show the selected tab
  document.getElementById(pageName).style.display = "block";
  elmnt.style.boxShadow = "0px 0px 20px #F8C519"; // Highlight active tab



  //----------------------filter resetter------------------------------------
  // Reset filters in the selected tab
  if (pageName === 'Fruits') {
    filterSelection('all');
  } else if (pageName === 'Vegetables') {
    filterSelectionVeg('all');
  } else if (pageName === 'LeastWaste') {
    filterSelectionLW('all');
  }
}

document.getElementById("defaultOpen").click();

function filterSelection(c) {
  var x, i;
  x = document.querySelectorAll("#Fruits .filterDiv");

  // Adjust filter logic for "Show all"
  if (c === "all" || c === "") {
    c = ""; // Show all elements
  }

  // Update the visibility of elements
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }

  // Highlight the active button
  var btns = document.querySelectorAll("#myBtnContainer .btn");
  btns.forEach((btn) => btn.classList.remove("active"));

  // Find and activate the correct button
  var activeBtn;
  if (c === "") {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === "show all");
  } else {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === c.toLowerCase());
  }

  if (activeBtn) activeBtn.classList.add("active");
}


//------------------------------------------------VEG FILTER------------------------------------------------------------------------
function filterSelectionVeg(c) {
  var x, i;
  x = document.querySelectorAll("#Vegetables .filterDiv");

  // Adjust filter logic for "Show all"
  if (c === "all" || c === "") {
    c = ""; // Show all elements
  }

  // Update the visibility of elements
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }

  // Highlight the active button
  var btns = document.querySelectorAll("#myBtnContainerVeg .btn");
  btns.forEach((btn) => btn.classList.remove("active"));

  // Find and activate the correct button
  var activeBtn;
  if (c === "") {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === "show all");
  } else {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === c.toLowerCase());
  }

  if (activeBtn) activeBtn.classList.add("active");
}
//-------------------------------------------------LW FILTER-----------------------------------------------------------------------
function filterSelectionLW(c) {
  var x, i;
  x = document.querySelectorAll("#LeastWaste .filterDiv");

  // Adjust filter logic for "Show all"
  if (c === "all" || c === "") {
    c = ""; // Show all elements
  }

  // Update the visibility of elements
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }

  // Highlight the active button
  var btns = document.querySelectorAll("#myBtnContainerLW .btn");
  btns.forEach((btn) => btn.classList.remove("active"));

  // Find and activate the correct button
  var activeBtn;
  if (c === "") {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === "show all");
  } else {
    activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === c.toLowerCase());
  }

  if (activeBtn) activeBtn.classList.add("active");
}


//--------------------------------------------------------------------------------------------------------------------------------
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
// Tab Switching Function

  // Function to get URL parameter
  function getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }
  
  // Function to open a tab by URL parameter or default
  window.onload = function () {
    const tabFromUrl = getUrlParam("tab"); // Get 'tab' parameter from URL
    if (tabFromUrl && document.getElementById(tabFromUrl)) {
      // Open the specified tab if it exists
      openPage(tabFromUrl, document.querySelector(`[onclick*="${tabFromUrl}"]`), "#4CAF50");
    } else {
      // Open the default tab
      document.getElementById("defaultOpen").click();
    }
  };

//+++++++++++++++++++++++++++++ add to cart and product data ++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++ patrick look at this yes ++++++++++++++++++++++++++++++++
//--------------------------- note to shev, "1 is for fruits, 2 is for vegine, 3 is for least waste, and so on" ---------------------
const products = [
  {
      id: 1,
      name: "Orange",
      price: 9.00,
      wasteIndex: 3,
      image: "https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: 'good duct',
      quantity: 1, 
      category: 'A'
  },
  {
      id: 2,
      name: "Apple",
      price: 10.00,
      wasteIndex: 3,
      image: "https://i.ibb.co.com/K5fVQfn/apple.jpg",
      description: 'good product',
      quantity: 1, 
      category: 'A'
  },
  {
      id: 3,
      name: "Grapes",
      price: 10.00,
      wasteIndex: 2,
      image: "https://images.pexels.com/photos/60021/grapes-wine-fruit-vines-60021.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: 'good product',
      quantity: 1, 
      category: 'A'
  },
  {
      id: 4,
      name: "Melon",
      price: 10.00,
      wasteIndex: 4,
      image: "https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: 'good product',
      quantity: 1, 
      category: 'A'
  },
  {
      id: 5,
      name: "Mango",
      price: 5.00,
      wasteIndex: 2,
      image: "https://foodprint.org/wp-content/uploads/2018/10/AdobeStock_116749966_1920x960_RFE.jpg",
      description: 'good product',
      quantity: 1, 
      category: 'A'
  },

//====================================================== Vegetables =============================================
    {
      id: 6,
      name: "Celery",
      price: 7.00,
      wasteIndex: 2,
      image: "https://images.pexels.com/photos/13044694/pexels-photo-13044694.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: 'good product',
      quantity: 1, 
      category: 'A'
  },
  {
    id: 7,
    name: "Lettuce",
    price: 7.00,
    wasteIndex: 2,
    image: "https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: 'good product',
    quantity: 1, 
    category: 'A'
},

{
  id: 8,
  name: "Corn",
  price: 3.00,
  wasteIndex: 6,
  image: "https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=600",
  description: 'good product',
  quantity: 1, 
  category: 'A'
},

{
  id: 9,
  name: "Tomato",
  price: 5.00,
  wasteIndex: 4,
  image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
  description: 'good product',
  quantity: 1, 
  category: 'A'
},
//====================================================== LEASTWASTE =============================================
{
  id: 10,
  name: "Watermelon",
  price: 10.00,
  wasteIndex: 1,
  image: "https://images.pexels.com/photos/974561/pexels-photo-974561.jpeg?auto=compress&cs=tinysrgb&w=600",
  description: 'good product',
  quantity: 1, 
  category: 'A'
},
{
id: 11,
name: "Blackberry",
price: 13.00,
wasteIndex: 2,
image: "https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
description: 'good product',
quantity: 1, 
category: 'A'
},

{
id: 12,
name: "Lemon",
price: 20.00,
wasteIndex: 1,
image: "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg?auto=compress&cs=tinysrgb&w=600",
description: 'good product',
quantity: 1, 
category: 'A'
},

{
id: 13,
name: "Clementine",
price: 30.00,
wasteIndex: 1,
image: "https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg?auto=compress&cs=tinysrgb&w=600",
description: 'good product',
quantity: 1, 
category: 'A'
},




  
];
localStorage.setItem('products', JSON.stringify(products));


document.addEventListener('DOMContentLoaded', () => {
  // Retrieve products from localStorage or use a default array
  const products = JSON.parse(localStorage.getItem('products')) || [];
  

  // Attach event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.popup button#add-to-cart').forEach((button) => {
    let amountinput = document.getElementById('amount-value');
    let amountvalue = amountinput.value; 
    let addbtn = document.getElementById('add');
    let removebtn = document.getElementById('remove');
    const popup = document.querySelector('.popup');
    const popupOverlay = document.querySelector('.popup-overlay');

    //ADDED TO CART POPUP attempt
    const cart_popup = document.querySelector('.cart_popup');
    const cart_popupOverlay = document.querySelector('.cart_popupOverlay');
    const cart_closeButton = cart_popup.querySelector('.cart_close');
    const cart_popupPrice = cart_popup.querySelector('p');

    amountinput.value = 1; 
    addbtn.addEventListener('click', () => {
      amountinput.value = parseInt(amountinput.value || 0) + 1; // Increment and update
  });
    removebtn.addEventListener('click', () => {
      if (amountinput.value > 1) {
        amountinput.value = parseInt(amountinput.value || 0) - 1; // Decrement
      }else{amountinput.value = 1}
    })
      button.addEventListener('click', () => {
          // Get the product ID from the parent `.product` div
          const productElement = button.closest('.popup');
          const productId = productElement.getAttribute('data-id');
          
          // Find the product in the products array
          const product = products.find(p => p.id == productId);
          product.quantity = 1; 
          console.log(amountvalue)
          if (product) {
            // Add the product to the current user's cart
            if (!isNaN(amountinput.value) && amountinput.value > 0) {
              // Create a copy of the product with updated quantity
              const productToAdd = { ...product, quantity: Number(amountinput.value) };
          
              // Check if the product already exists in the cart
              const existingProductIndex = currentuser.cart.findIndex(p => p.id === product.id);
              
              if (existingProductIndex > -1) {
                // Update quantity if the product already exists
                currentuser.cart[existingProductIndex].quantity += productToAdd.quantity;
              } else {
                // Add the new product to the cart
                currentuser.cart.push(productToAdd);
              }
          
              // Update localStorage for the current user
              localStorage.setItem('current-user', JSON.stringify(currentuser));
          
              popup.style.display = 'none';
              popupOverlay.style.display = 'none';
            } else {
              alert('please input a valid number');
            }
           cart_popup.style.display = 'block';
           cart_popupOverlay.style.display = 'block';
           cart_popupPrice.textContent = `${amountinput.value} ${product.name}s have been added to your cart!`;
            //alert(`${amountinput.value} ${product.name}s have been added to your cart!`);
          }
          
      });
      cart_closeButton.addEventListener('click', () => {
        cart_popup.style.display = 'none';
        cart_popupOverlay.style.display = 'none';
      });
      cart_popupOverlay.addEventListener('click', () => {
        cart_popup.style.display = 'none';
        cart_popupOverlay.style.display = 'none';
      });

  });
});

console.log(currentuser)
  



document.addEventListener('DOMContentLoaded', () => {
  const filterDivs = document.querySelectorAll('.filterDiv');
  const popup = document.querySelector('.popup');
  const popupOverlay = document.querySelector('.popup-overlay');
  const popupImage = popup.querySelector('img');
  const popupTitle = popup.querySelector('h2');
  const popupPrice = popup.querySelector('p');
  const popupDescription = document.createElement('p'); // Add a description paragraph
  const popupCategory = document.createElement('p'); // Add a category paragraph
  popup.appendChild(popupDescription);
  popup.appendChild(popupCategory);
  const closeButton = popup.querySelector('.close');

  filterDivs.forEach(div => {
    div.addEventListener('click', () => {
      const name = div.getAttribute('data-name');
      const price = div.getAttribute('data-price');
      const image = div.getAttribute('data-image');
      const description = div.getAttribute('data-description');
      const category = div.getAttribute('data-category');
      const id = div.getAttribute('data-id');

      popup.setAttribute('data-id', id);
      popupTitle.textContent = name;
      popupPrice.textContent = price;
      popupImage.src = image;
      popupDescription.textContent = `Description: ${description}`;
      popupCategory.textContent = `Category: ${category}`;

      popup.style.display = 'block';
      popupOverlay.style.display = 'block';
    });
  });

  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
  });

  popupOverlay.addEventListener('click', () => {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
  });
});

console.log(products)


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


