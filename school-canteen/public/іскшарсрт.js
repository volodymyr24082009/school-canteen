let cart = [];

// Перевіряємо, чи є щось в Local Storage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCounter(); // Оновлюємо лічильник при завантаженні
}

// Меню товарів
const menuItems = [
    { name: "Сендвіч з куркою", price: 5, description: "Сендвіч з куркою, свіжими овочами та соусом.", image: "https://cdn.meta.ua/meta_news/85/01002irt-858e_1280x720.jpeg" },
    { name: "Сендвіч з тунцем", price: 6, description: "Сендвіч з тунцем, листям салату та соусом.", image: "https://i.obozrevatel.com/food/recipemain/2019/3/19/s1200.jpg?size=636x424" },
    { name: "Вегетаріанський сендвіч", price: 4.5, description: "Сендвіч з свіжими овочами.", image: "https://kanapulka.com.ua/image/cache/catalog/recipe/veggie-sandwich/veggie-sandwich-1-1140x400.jpg" },
    { name: "Сендвіч з шинкою", price: 5.5, description: "Сендвіч з шинкою та сиром.", image: "https://vesuvio.ua/wp-content/uploads/2020/02/%D0%A1%D0%B5%D0%BD%D0%B4%D0%B2%D1%96%D1%87-%D0%B7-%D1%88%D0%B8%D0%BD%D0%BA%D0%BE%D1%8E-%D0%9C%D0%B5%D0%BD%D1%8E-scaled.jpg" },
    { name: "Сендвіч з індичкою", price: 7, description: "Сендвіч з індичкою та авокадо.", image: "https://e2go.com.ua/load/120/food/sandvich-z-indichkoyu_8pic_ebf89__75237.jpg" },
];

// Відображаємо товари меню
function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('item');
        menuItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.price} зірочок</p>
            <img src="${item.image}" alt="${item.name}" />
            <button onclick="addToCart('${item.name}', ${item.price}, this)">Додати до кошика</button>
            <button onclick="viewDetails('${item.name}', ${item.price}, '${item.description}')">Деталі</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Додаємо товар до кошика
function addToCart(name, price, button) {
    const item = { name, price };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    // Анімація "летіння" товару до кошика
    const flyAnimation = document.createElement('div');
    flyAnimation.className = 'fly-animation';
    flyAnimation.innerText = name;
    document.body.appendChild(flyAnimation);
    
    const buttonRect = button.getBoundingClientRect();
    flyAnimation.style.left = `${buttonRect.x + buttonRect.width / 2}px`;
    flyAnimation.style.top = `${buttonRect.y + buttonRect.height / 2}px`;

    setTimeout(() => {
        flyAnimation.style.transform = `translate(calc(${window.innerWidth - 80}px - 50%), calc(${buttonRect.y}px - 50%)) scale(0.5)`;
        flyAnimation.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        flyAnimation.remove();
    }, 1000);
}

// Оновлюємо лічильник кошика
function updateCartCounter() {
    document.getElementById('cart-button').innerText = `Кошик (${cart.length})`;
}

// Переходить на сторінку кошика
function goToCart() {
    document.getElementById('main-page').style.display = 'none';
    const cartPage = document.getElementById('cart-page');
    cartPage.style.display = 'block';
    displayCartItems();
}

// Повертається на головну сторінку
function goBack() {
    document.getElementById('cart-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

// Відображаємо товари в кошику
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price} зірочок</span>
            <button onclick="removeFromCart(${index})">Видалити</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total').innerText = `Всього: ${total} зірочок`;
}

// Видаляємо товар з кошика
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    displayCartItems();
}

// Купуємо товари
function buyItems() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
    } else {
        alert("Дякуємо за покупку!");
        cart = [];
        localStorage.removeItem('cart');
        updateCartCounter();
        displayCartItems();
    }
}

// Показати деталі товару
function viewDetails(name, price, description) {
    alert(`Назва: ${name}\nЦіна: ${price} зірочок\nОпис: ${description}`);
}

displayMenuItems();
// Додаємо товар до кошика
function addToCart(name, price, button) {
const item = { name, price };
cart.push(item);
localStorage.setItem('cart', JSON.stringify(cart));
updateCartCounter();

// Анімація "летіння" товару до кошика
const flyAnimation = document.createElement('div');
flyAnimation.className = 'fly-animation';
flyAnimation.innerText = name;
document.body.appendChild(flyAnimation);

// Отримуємо позицію кнопки
const buttonRect = button.getBoundingClientRect();
const cartButtonRect = document.getElementById('cart-button').getBoundingClientRect();

// Встановлюємо стартову позицію
flyAnimation.style.left = `${buttonRect.x + buttonRect.width / 2}px`;
flyAnimation.style.top = `${buttonRect.y + buttonRect.height / 2}px`;

// Додаємо анімацію
setTimeout(() => {
    flyAnimation.style.transform = `translate(${cartButtonRect.x - buttonRect.x}px, ${cartButtonRect.y - buttonRect.y}px) scale(0.5)`;
    flyAnimation.style.opacity = '0';
}, 50);

setTimeout(() => {
    flyAnimation.remove();
}, 1000);
}
