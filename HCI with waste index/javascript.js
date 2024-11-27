document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        const name = product.getAttribute('data-name');
        const price = product.getAttribute('data-price');
        const wasteIndex = product.getAttribute('data-waste-index');
        const image = product.getAttribute('data-image')

    window.location.href = `product page.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wasteIndex=${encodeURIComponent(wasteIndex)}&img=${encodeURIComponent(image)}`;
    });
});
let accountwaste = localStorage.getItem('accountwaste'); 
let wastebar = document.querySelector('.line-waste-meter');
let accountdisc = localStorage.getItem('accountdisc');
let ecobar = document.querySelector('.line-eco-meter')

if (accountwaste > 100) {
    accountwaste = 100 
}

if (wastebar) {
    wastebar.style.width = accountwaste + '%'
}

if (ecobar) {
    ecobar.style.width = accountdisc + '%'
}
const TimeDecay = document.getElementById('Time-Decay');

if (TimeDecay) {
    TimeDecay.addEventListener('click', () => {
        accountwaste -= 2;
        localStorage.setItem('accountwaste',accountwaste);
        location.reload();
    })}





