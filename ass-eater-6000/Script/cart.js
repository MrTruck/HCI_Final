




document.addEventListener('DOMContentLoaded', () => {  
    // **1. Initialize variables for cart, UI elements, and account data**  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  
    const cartItemsContainer = document.getElementById('cart-items');  
    const totalPriceContainer = document.getElementById('total-price');  
    const eligibleDiscount = document.getElementById('eligible discount');  
    const discountInput = document.getElementById('discount-value');  
    let currentuser = JSON.parse(localStorage.getItem('current-user'))
    let home = document.querySelector('.logo')
    console.log(currentuser)
   
    let discountApplied = false;  
    let total = 0;  
    let totalwaste = 0;  
    let totaleco = 0;  
    let accountwaste = currentuser.accountwaste || 0;
    let accountdisc = currentuser.accountdisc || 0;
    let maxdiscount = accountdisc - accountwaste;  


    home.addEventListener('click',()=>{
        window.location.href='front page.html'
    }
    )
    // **2. Cap maximum discount at 30% and display discount eligibility**  
    if (maxdiscount > 30) {  
        maxdiscount = 30;  
    }  
    if (maxdiscount > 0) {  
        eligibleDiscount.innerHTML = `You are eligible for a discount up to ${maxdiscount}%`;  
    } else {  
        eligibleDiscount.innerHTML = `No discounts available`;  
    }  

    // **3. Check if the cart is empty and display items if available**  
    if (cart.length === 0) {  
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';  
    } else {  
        cart.forEach(item => {  
            const cartItem = document.createElement('div');  
            cartItem.classList.add('product');  
            cartItem.innerHTML = `  
                <div id='product'>  
                    <img id='img' src="${item.image}" alt="${item.name}" style="width: 50px;">  
                    <div>  
                        <h4>${item.name}</h4>  
                        <p>${item.price}</p>  
                        <p>${item.wasteIndex}</p>  
                    </div>  
                </div>  
            `;  
            cartItemsContainer.appendChild(cartItem);  
  
            // **4. Calculate totals for price, waste, and eco-friendliness**  
            total += parseFloat(item.price.replace('$', ''));  
            totalwaste += parseFloat(item.wasteIndex.replace('Waste Index: ', ''));  
  
            if (parseFloat(item.wasteIndex.replace('Waste Index: ', '')) < 5) {  
                totaleco += 5 - parseFloat(item.wasteIndex.replace('Waste Index: ', ''));  
            }  
        });  

        // **5. Display the total price, waste, and eco score**  
        totalPriceContainer.innerHTML = `<strong>Total: $${total.toFixed(2)} Total waste: ${totalwaste}</strong> Total eco: ${totaleco}`;  
    }  

    // **6. Discount Application Logic**  
    const applyButton = document.getElementById('Apply');  
    if (applyButton && cart.length > 0) {  
        applyButton.addEventListener('click', () => {  
            let discountValue = parseFloat(discountInput.value);  
            if (discountValue > maxdiscount) {  
                alert(`Discount cannot exceed ${maxdiscount}%. It will be capped.`);  
                discountValue = maxdiscount;  
                discountInput.value = maxdiscount;  
            }  
            discountApplied = true;  
            totalPriceContainer.innerHTML = `<strong>Total: $${total.toFixed(2) - total.toFixed(2) * discountValue / 100} Total waste: ${totalwaste}</strong> Total eco: ${totaleco}`;  
        });  
    } else {  
        applyButton.addEventListener('click', () => {  
            alert('There are no items in your cart!');  
        });  
    }  

    // **7. Purchase Button Logic**  
    const purchaseButton = document.getElementById('Purchase');  
    if (purchaseButton) {  
        purchaseButton.addEventListener('click', () => {  
            
            
            if (cart.length === 0) {  
                alert('There are no items in your cart!');  
                return;  
            }  
            if (discountApplied) {  
                accountdisc -= parseFloat(discountInput.value) || 0;  
  
            }  
            

            accountwaste += totalwaste;  
            accountdisc += totaleco;  

            if (accountwaste > 100) {  
                accountwaste = 100;  
                currentuser.accountwaste = accountwaste 
            }  
            if (accountdisc > 100) {
                accountdisc = 100; 
                currentuser.accountdisc = accountdisc 

            }
            currentuser.accountwaste = accountwaste 
            currentuser.accountdisc = accountdisc 

            localStorage.setItem('current-user', JSON.stringify(currentuser));

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === currentuser.email)
            if (userIndex !== -1){
                users[userIndex] = currentuser;
                localStorage.setItem('users',JSON.stringify(users));
            }

            cart = [];  
            localStorage.setItem('cart', JSON.stringify(cart));  
            alert('Purchase successful!');  
            location.reload();  
        });  
    }  

    

    // **8. Update progress bar for waste and eco metrics**  
    let ecobar = document.querySelector('.line-eco-meter');  
    let wastebar = document.querySelector('.line-waste-meter');  


    if (wastebar) {  
        wastebar.style.width = accountwaste + '%';  
    }  
    if (ecobar) {  
        ecobar.style.width = accountdisc + '%';  
    }  

    // **9. Debugging Logs**  
    console.log(accountwaste);  
    console.log(accountdisc);  
}); 
