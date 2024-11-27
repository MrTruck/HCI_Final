document.addEventListener('DOMContentLoaded', () => {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');
const eligibleDiscount = document.getElementById('eligible discount');
const discountInput = document.getElementById('discount-value');

let discountApplied = false 
let total = 0;
let totalwaste = 0;
let totaleco = 0; 
let accountwaste = parseFloat(localStorage.getItem('accountwaste')) || 0; 
let accountdisc = parseFloat(localStorage.getItem('accountdisc')) || 0; 
let maxdiscount = accountdisc - accountwaste ; 

if (maxdiscount > 30) {
    maxdiscount = 30 
}
if (maxdiscount > 0 ) {
    eligibleDiscount.innerHTML = `You are eligible for a discount up to ${maxdiscount}%`;
} else {
    eligibleDiscount.innerHTML = `No discounts available`;
}





// Check if the cart is empty and show an appropriate message
if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
} else {
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('product');  
        cartItem.innerHTML = `
            <div id='product'>
                <img id ='img' src="${item.image}" alt="${item.name}" style="width: 50px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <p>${item.wasteIndex}</p>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Calculate the total price by parsing the price 
        total += parseFloat(item.price.replace('$', ''));
        totalwaste += parseFloat(item.wasteIndex.replace('Waste Index: ','')) 

        

        if (parseFloat(item.wasteIndex.replace('Waste Index: ','')) < 5) {
            totaleco += 5 - parseFloat(item.wasteIndex.replace('Waste Index: ',''))
        }

        
        
    });
    
    // Display the total price, ensuring it's formatted to two decimal places
    totalPriceContainer.innerHTML = `<strong>Total: $${total.toFixed(2)} Total waste: ${totalwaste}</strong> Total eco: ${totaleco}`;
}


const purchaseButton = document.getElementById('Purchase');
const applyButton = document.getElementById('Apply');

if (applyButton && cart.length > 0) {
    applyButton.addEventListener('click', () => {
        let discountValue =parseFloat(discountInput.value);
        if (discountValue > maxdiscount){
            alert(`Discount cannot exceed ${maxdiscount}%. It will be capped.`)
            discountValue = maxdiscount;
            discountInput.value = maxdiscount;
        }
        discountApplied = true; 
        totalPriceContainer.innerHTML = `<strong>Total: $${total.toFixed(2)-total.toFixed(2)*discountValue/100} Total waste: ${totalwaste}</strong> Total eco: ${totaleco}`
        
            }) }  else{
                applyButton.addEventListener('click', () => {alert('There are no items in your cart!')})
            } ;
            


if (purchaseButton) {
    purchaseButton.addEventListener('click', () => {
        if (cart.length === 0){
            alert('There are no items in your cart!')
            return;
        }
        if(discountApplied){
            accountdisc -= parseFloat(discountInput.value)||0;
            localStorage.setItem('accountdisc',accountdisc)
        }
        cart = []; // Clear the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update the localStorage cart
        alert('Purchase successful!'); // Notify the user
        location.reload(); // Refresh the page to update the cart display
        accountwaste += totalwaste;
        localStorage.setItem('accountwaste',accountwaste);
        accountdisc += totaleco;
        localStorage.setItem('accountdisc',accountdisc);

    })
    
    }

let ecobar = document.querySelector('.line-eco-meter')
let wastebar = document.querySelector('.line-waste-meter');

if (accountwaste > 100) {
    accountwaste = 100 
}

if (wastebar) {
    wastebar.style.width = accountwaste + '%'
}

if (ecobar) {
    ecobar.style.width = accountdisc + '%'
}



console.log(accountwaste)
console.log(accountdisc)
console.log(discountValue)
console.log(maxdiscount)


});
