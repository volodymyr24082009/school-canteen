let userStars = 10;
let cart = [];

const menuItems = [
    { name: "Сендвіч з куркою", price: 5 },
    { name: "Сендвіч з тунцем", price: 6 },
    { name: "Вегетаріанський сендвіч", price: 4.5 },
    { name: "Сендвіч з шинкою", price: 5.5 },
    { name: "Сендвіч з індичкою", price: 7 },
    { name: "Сендвіч з моцарелою", price: 6 },
    { name: "Сендвіч з овочами", price: 4 },
    { name: "Сендвіч з беконом", price: 6.5 },
];

function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('item');
        menuItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.price} зірочок</p>
            <button onclick="addToCart('${item.name}', ${item.price}, this)">Додати до кошика</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

window.onload = function() {
    displayMenuItems();
};

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
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

    document.getElementById('cart-total').textContent = `Всього: ${total} зірочок`;
    clearErrorMessage();
}

function addToCart(name, price, button) {
    cart.push({ name, price });
    updateCartDisplay();

    // Анімація летіння
    const flyingItem = document.createElement('div');
    flyingItem.classList.add('fly-animation');
    flyingItem.textContent = name;
    document.body.appendChild(flyingItem);

    const buttonRect = button.getBoundingClientRect();
    const cartButton = document.getElementById('cart-button');
    const cartButtonRect = cartButton.getBoundingClientRect();

    // Визначення координат для анімації
    const startX = buttonRect.x + buttonRect.width / 2;
    const startY = buttonRect.y + buttonRect.height / 2;
    const endX = cartButtonRect.x + cartButtonRect.width / 2;
    const endY = cartButtonRect.y + cartButtonRect.height / 2;

    // Встановлюємо початкові координати
    flyingItem.style.left = `${startX}px`;
    flyingItem.style.top = `${startY}px`;

    // Виконуємо анімацію
    requestAnimationFrame(() => {
        flyingItem.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        flyingItem.style.opacity = '0'; // Зменшуємо прозорість
    });

    // Видаляємо елемент після завершення анімації
    setTimeout(() => {
        flyingItem.remove();
    }, 1000);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function goToCart() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('cart-page').style.display = 'block';
    updateCartDisplay(); // Оновлюємо кошик при переході
}

function goBack() {
    document.getElementById('cart-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    clearErrorMessage(); // Очищаємо повідомлення про помилку при поверненні
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}

function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}
