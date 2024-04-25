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
    updateCartModal();
    cartModal.style.display = 'flex';
});

//Fechar Modal
cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    } else if(event.target === closeModalBtn) {
        cartModal.style.display = 'none';
    }
});

menu.addEventListener('click', (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn');

    if (parentButton) {
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));
        addToCart(name, price);
    }
});

//função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        //se o item ja exite, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
        //senao add um novo item ao carrinho
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal();
}

//atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                    <br>
                </div>    
                <button class="remove-cart-btn" data-name="${item.name}">Remover</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    cartCount.innerHTML = cart.length;
}

//função de remover item do carrinho
cartItemsContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('remove-cart-btn')) {
        const name = event.target.getAttribute('data-name');
        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

//validação de endereço de entrega
addressInput.addEventListener('input',(event) => {
    let inputValue = event.target.value;

    if(inputValue !== '') {
        addressInput.classList.remove('border-red-500');
        addressWarn.classList.add('hidden');
    }
});

//finalizar pedido
checkoutBtn.addEventListener('click', () => {

    const isOpen = checkRestOpen();
    if(!isOpen) {
        //biblioteca toastify (exibição do alert)
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === '') {
        addressWarn.classList.remove('hidden');
        addressInput.classList.add('border-red-500');
        return;
    }

    //enviar pedido para api whats
    const cartItems = cart.map((item) => {
        return(`${item.name} Quantidade: (${item.quantity}) Preço: ${item.price} |`)
    }).join("");

    const message = encodeURIComponent(cartItems);
    const phone = "40028922";

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, '_blank');

    //zera o carrinho após efetuar o pedido
    cart = [];
    updateCartModal();
});

//verificar a hora e manipular o card horario
function checkRestOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22; //true 
}

const isOpen = checkRestOpen();

if(isOpen) {
    dateSpan.classList.add('bg-green-600');
    dateSpan.classList.remove('bg-red-500');
}else {
    dateSpan.classList.add('bg-red-500');
    dateSpan.classList.remove('bg-green-600');
}