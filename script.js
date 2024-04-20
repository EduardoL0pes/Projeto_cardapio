const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');
const dateSpan = document.querySelector('#date-span');

let cart = [];

//Abrir Modal
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

//Fechar Modal
cartModal.addEventListener('click', (event) => {
    if(event.target === cartModal || closeModalBtn) {
        cartModal.style.display = 'none';
    }
});

menu.addEventListener('click', (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn');
    
    if(parentButton) {
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));
        addToCart(name, price);
    }
})

//função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if(existingItem) {
        existingItem.quantity += 1;
        return;
    }

    cart.push({
        name,
        price,
        quantity: 1,
    });
}