const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');
const dateSpan = document.querySelector('#date-span');

//Abrir Modal
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

//Fechar Modal
cartModal.addEventListener('click', (event) => {
    if(event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});