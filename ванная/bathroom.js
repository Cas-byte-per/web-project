// Функция-конструктор Accumulator
function Accumulator(startingValue) {
this.value = startingValue; // Общая сумма корзины
this.items = []; // Массив для хранения объектов товаров в корзине

// Метод для добавления товара в корзину
this.addItem = function (price, name, img) {
    const existingItem = this.items.find((item) => item.name === name);

    if (existingItem) {
    existingItem.quantity++;
    existingItem.totalPrice += price;
    } else {
    this.items.push({ price, name, img, quantity: 1, totalPrice: price });
    }

    this.value += price;
};

// Метод для удаления товара из корзины
this.removeItem = function (index) {
    const item = this.items[index];
    this.value -= item.totalPrice;
    this.items.splice(index, 1);
};

// Метод для увеличения количества товара
this.increaseQuantity = function (index) {
    const item = this.items[index];
    item.quantity++;
    item.totalPrice += item.price;
    this.value += item.price;
};

// Метод для уменьшения количества товара
this.decreaseQuantity = function (index) {
    const item = this.items[index];
    if (item.quantity > 1) {
    item.quantity--;
    item.totalPrice -= item.price;
    this.value -= item.price;
    }
};

// Метод для фильтрации товаров по цене в корзине
this.filterByPrice = function (a, b) {
    return this.items.filter((item) => item.totalPrice >= a && item.totalPrice <= b);
};

// Метод для вывода содержимого корзины
this.viewCart = function () {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';

    if (this.items.length === 0) {
    cartContent.innerHTML = '<p>Корзина пуста.</p>';
    } else {
    let list = document.createElement('ul');
    this.items.forEach((item, index) => {
        let li = document.createElement('li');

        let img = document.createElement('img');
        img.src = item.img;
        li.appendChild(img);

        let description = document.createTextNode(
        `${item.name} - ${item.totalPrice} руб. (кол-во: ${item.quantity})`
        );
        li.appendChild(description);

        let increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
        this.increaseQuantity(index);
        this.viewCart();
        document.getElementById('cart-value').textContent = this.value;
        });
        li.appendChild(increaseButton);

        let decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
        this.decreaseQuantity(index);
        this.viewCart();
        document.getElementById('cart-value').textContent = this.value;
        });
        li.appendChild(decreaseButton);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
        this.removeItem(index);
        this.viewCart();
        document.getElementById('cart-value').textContent = this.value;
        });
        li.appendChild(removeButton);

        list.appendChild(li);
    });
    cartContent.appendChild(list);
    }

    cartContent.style.display = cartContent.style.display === 'none' ? 'block' : 'none';
};
}

// Создание экземпляра корзины с начальной суммой 0
const cart = new Accumulator(0);

// Обработчик нажатия на кнопки "Добавить в корзину"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
button.addEventListener('click', () => {
    const price = Number(button.dataset.price);
    const name = button.dataset.name;
    const img = button.dataset.img;

    cart.addItem(price, name, img);
    document.getElementById('cart-value').textContent = cart.value;
});
});

// Обработчик нажатия на кнопку оформления заказа
document.getElementById('checkout-button').addEventListener('click', () => {
alert(`Ваш заказ принят в обработку, ждите посылку через 2 недели :)`);
});

// Обработчик нажатия на кнопку просмотра содержимого корзины
document.getElementById('view-cart-button').addEventListener('click', () => {
cart.viewCart();
});

// Функция для фильтрации товаров на странице (в области продуктов)
function applyFilter() {
const minPrice = Number(document.getElementById('min-price').value);
const maxPrice = Number(document.getElementById('max-price').value);

const products = document.querySelectorAll('.product');
let filterResult = document.getElementById('filter-result');
filterResult.innerHTML = ''; // Очистка результата фильтра

let visibleProducts = 0; // Счётчик видимых товаров

products.forEach((product) => {
    const price = Number(product.querySelector('.add-to-cart').dataset.price);
    if (price >= minPrice && price <= maxPrice) {
    product.style.display = 'block';
    visibleProducts++;
    } else {
    product.style.display = 'none';
    }
});

// Обновление результата фильтра
if (visibleProducts > 0) {
    filterResult.innerHTML = `<p>Найдено ${visibleProducts} товаров в заданном диапазоне цен.</p>`;
} else {
    filterResult.innerHTML = `<p>Нет товаров в указанном диапазоне цен.</p>`;
}
}
// Функция для сортировки товаров на странице
function sortProducts(order) {
const productContainer = document.querySelector('.product-list');
const products = Array.from(document.querySelectorAll('.product'));

// Сортировка массива товаров
products.sort((a, b) => {
    const priceA = Number(a.querySelector('.add-to-cart').dataset.price);
    const priceB = Number(b.querySelector('.add-to-cart').dataset.price);

    return order === 'asc' ? priceA - priceB : priceB - priceA;
});

// Очистка контейнера и добавление отсортированных товаров
productContainer.innerHTML = '';
products.forEach((product) => productContainer.appendChild(product));
}

// Обработчики для кнопок сортировки
document.getElementById('sort-asc').addEventListener('click', () => sortProducts('asc'));
document.getElementById('sort-desc').addEventListener('click', () => sortProducts('desc'));
