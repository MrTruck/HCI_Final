
 // Tab Switching Function
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

  // Reset filters in the selected tab
  filterSelection('all');

  // Reset active state for filter buttons
  var btnContainer = document.getElementById("myBtnContainer");
  if (btnContainer) {
    var btns = btnContainer.getElementsByClassName("btn");
    for (i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
    if (btns[0]) {
      btns[0].classList.add("active"); // Set "Show all" as active
    }
  }
}

// Click default tab on page load
document.getElementById("defaultOpen").click();

// Filter Selection Function
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }

  // Highlight the active button
  var btns = document.querySelectorAll("#myBtnContainer .btn");
  btns.forEach((btn) => btn.classList.remove("active"));
  var activeBtn = Array.from(btns).find((btn) => btn.textContent.trim().toLowerCase() === c.toLowerCase());
  if (activeBtn) activeBtn.classList.add("active");
}

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

//add to cart and product data 

const products = [
  {
      id: 1,
      name: "Orange",
      price: 10.00,
      wasteIndex: 6,
      image: "https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
      id: 2,
      name: "Apple",
      price: 20.00,
      wasteIndex: 3,
      image: "https://i.ibb.co.com/K5fVQfn/apple.jpg",
  },
  {
      id: 3,
      name: "Celery",
      price: 30.00,
      wasteIndex: 3,
      image: "https://i.ibb.co.com/gZKBYTP/R.jpg",
  },
  {
      id: 4,
      name: "Milk",
      price: 30.00,
      wasteIndex: 2,
      image: "https://i.ibb.co.com/8YTVWVb/R-1.jpg",
  },
  {
      id: 5,
      name: "Celery",
      price: 30.00,
      wasteIndex: 2,
      image: "https://i.ibb.co.com/gZKBYTP/R.jpg",
  },
    {
      id: 6,
      name: "Celery",
      price: 30.00,
      wasteIndex: 2,
      image: "https://i.ibb.co.com/gZKBYTP/R.jpg",
  },
  {
    id: 7,
    name: "Celery",
    price: 30.00,
    wasteIndex: 2,
    image: "https://i.ibb.co.com/gZKBYTP/R.jpg",
},



  
];
localStorage.setItem('products', JSON.stringify(products));

let currentuser = JSON.parse(localStorage.getItem('current-user')) || { cart: [] };
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
          console.log(amountvalue)
          if (product) {
            // Add the product to the current user's 
            if (!isNaN(amountinput.value) && amountinput.value > 0){
              for (let i = 0; i < amountinput.value; i++ ){
                currentuser.cart.push(product);
              }
              // Update localStorage for the current user
              localStorage.setItem('current-user', JSON.stringify(currentuser));

              popup.style.display = 'none';
              popupOverlay.style.display ='none';
            }else{
              alert('please input a valid number')
            }
            
              // Optional: Alert the user
              alert(`${amountinput.value} ${product.name}s has been added to your cart!`);
          } else {
              console.error('Product not found!');
          }
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



