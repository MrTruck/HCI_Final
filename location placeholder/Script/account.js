
window.addEventListener('DOMContentLoaded', () => {
    // Ensure localStorage contains valid data
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
    let ecobar = document.querySelector('.line-eco-meter');
    let wastebar = document.querySelector('.line-waste-meter');
    let smalleco = document.querySelector('.mini-eco')
    let smallwaste = document.querySelector('.mini-waste')
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