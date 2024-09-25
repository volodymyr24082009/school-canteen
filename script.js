let userStars = 10;
let cart = [];

function updateStarsDisplay() {
    document.getElementById('user-stars-count').textContent = userStars;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Очищаємо кошик для оновлення
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price} зірочок</span>
            <button onclick="removeFromCart(${index})">Видалити</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('cart-total').textContent = total;
    clearErrorMessage(); // Очищуємо повідомлення про помилку при оновленні кошика
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function placeOrder() {
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    
    if (userStars >= totalPrice) {
        userStars -= totalPrice;
        updateStarsDisplay();
        cart = [];
        updateCartDisplay();
        alert('Ваше замовлення було успішно оформлено!');
    } else {
        showErrorMessage('Недостатньо зірочок для оформлення замовлення!'); // Викликаємо повідомлення про помилку
    }
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}

function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}
