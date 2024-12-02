// Функция-конструктор Accumulator
function Accumulator(startingValue) {
    this.value = startingValue;
    this.items = []; // Массив для хранения объектов товаров в корзине
  
    // Метод для добавления товара в корзину
    this.addItem = function(price, name, img) {
      this.value += price;
      this.items.push({ price, name, img });
    };
  
    // Метод для вывода содержимого корзины
    this.viewCart = function() {
      let cartContent = document.getElementById('cart-content');
      cartContent.innerHTML = ''; // Очищаем содержимое перед обновлением
  
      if (this.items.length === 0) {
        cartContent.innerHTML = '<p>Корзина пуста.</p>';
      } else {
        let list = document.createElement('ul');
        this.items.forEach(item => {
          let li = document.createElement('li');
          let img = document.createElement('img');
          img.src = item.img;
          li.appendChild(img);
          li.appendChild(document.createTextNode(`${item.name} - ${item.price} руб.`));
          list.appendChild(li);
        });
        cartContent.appendChild(list);
      }
  
      // Показать/спрятать корзину
      cartContent.style.display = cartContent.style.display === 'none' ? 'block' : 'none';
    };
  }
  
  // Создание экземпляра корзины с начальной суммой 0
  const cart = new Accumulator(0);
  
  // Обработчик нажатия на кнопки "Добавить в корзину"
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const price = Number(button.dataset.price);
      const name = button.dataset.name;
      const img = button.dataset.img;
  
      // Добавляем товар в корзину
      cart.addItem(price, name, img);
  
      // Обновляем отображаемое значение в корзине
      document.getElementById('cart-value').textContent = cart.value;
    });
  });
  
  // Обработчик нажатия на кнопку оформления заказа
  document.getElementById('checkout-button').addEventListener('click', () => {
    alert(`Общая сумма вашего заказа: ${cart.value} руб.`);
  });
  
  // Обработчик нажатия на кнопку просмотра содержимого корзины
  document.getElementById('view-cart-button').addEventListener('click', () => {
    cart.viewCart();
  });
  