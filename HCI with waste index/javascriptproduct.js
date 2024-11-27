window.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');
    const wasteIndex = urlParams.get('wasteIndex');
    const image = urlParams.get('img')


    document.getElementById('product-name').textContent = name;
    document.getElementById('product-price').textContent = price;
    document.getElementById('product-waste-index').textContent = `Waste Index: ${wasteIndex}`;
    document.getElementById('product-image').src = image; 
});



let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.getElementById('add-to-cart').addEventListener('click', () => {
    const product = {
        name: document.getElementById('product-name').textContent,
        price: document.getElementById('product-price').textContent,
        wasteIndex: document.getElementById('product-waste-index').textContent,
        image: document.getElementById('product-image').src,
    };

    
    cart.push(product);

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    alert(`${product.name} has been added to your cart!`);
});


