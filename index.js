document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');
    let isDrawing = false; // Флаг для режима рисования

    // Обработчик для лайков
    likeButtons.forEach(button => {
        const likeCount = button.querySelector('.like-count');

        button.addEventListener('click', () => {
            button.classList.toggle('liked');

            // Увеличиваем или уменьшаем количество лайков
            let count = parseInt(likeCount.textContent, 10);
            if (button.classList.contains('liked')) {
                count++;
                isDrawing = true; // Включаем рисование
            } else {
                count--;
                isDrawing = false; // Выключаем рисование
            }
            likeCount.textContent = count;
        });
    });

    // Функция для создания элемента под курсором
    function createCursorElement(x, y) {
        const element = document.createElement('div');
        element.className = 'cursor-element';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        document.body.appendChild(element);

        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            document.body.removeChild(element);
        }, 1000);
    }

    // Обработчик движения мыши
    document.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            createCursorElement(event.pageX, event.pageY);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".badge");
    const notificationList = document.querySelector(".notification-list");
    const bellIcon = document.querySelector(".bell");

    // Массив с новыми уведомлениями
    const newNotifications = [
        "Акция: 30% на весь текстиль",
        "Новые поступления в разделе 'Освещение'",
        "Сегодня скидки до 50% на товары для спальни",
        "Сезонная распродажа: успейте купить со скидкой",
        "Только сегодня! Скидки до 40% на мягкую мебель",
        "Большая распродажа! Скидки до 60% на шкафы",
        "Новая коллекция: стильные диваны и кресла уже в продаже",
        "Скидки на кухонную мебель до 25%!",
        "Обновление ассортимента! Идеальные решения для вашего интерьера",
        "Купите мебель для спальни с скидкой до 30%!",
        "Летняя распродажа: скидки на мебель до 50%!",
        "Специальная акция: скидка 20% на все кровати",
        "Только до конца месяца: скидки до 70% на аксессуары для дома",
        "Новая коллекция стульев с скидкой 10%!",
        "Текстиль для дома со скидкой 25%! Успейте приобрести",
        "Скидки на мебель для гостиной до 40%!",
        "Эксклюзивное предложение: 15% скидка на заказы от 50 000 рублей",
        "Акция: при покупке дивана — подарок!",
        "Летняя распродажа на кухонные гарнитуры! Скидки до 30%",
        "Скидка 35% на все матрасы!",
        "Акция: 10% на заказ всей мебели для спальни!",
        "Крутые скидки на модульные диваны! До 45%!",
        "Выставка новинок! Ознакомьтесь с последними поступлениями",
        "Акция: 20% на мебель для дачи!",
        "Успей купить стильные стеллажи со скидкой 15%!",
        "Сегодня скидки на мебель для детей — до 30%!",
        "Готовы к осени? Обновите интерьер со скидкой 20%",
        "Скидки до 40% на модные кресла!",
        "Только в этот уикенд: акции на обеденные группы!",
        "Новая коллекция штор со скидкой 10%! Спешите!",
        "До конца недели: скидки на мебель для кухни до 20%",
        "Текущие скидки на мебель для ванной до 25%",
        "Сезонная распродажа! Специальные цены на диваны!",
        "Сегодня только для вас — скидка 20% на стулья и кресла!",
        "Акция! Мебель для дома по сниженным ценам!",
        "Скидки до 60% на мебель для прихожей!",
        "Крупная распродажа! Мебель со скидками до 50%",
        "Новая мебель для вашего дома с выгодой до 30%",
        "Товары для ванной комнаты — скидки до 40%",
        "Весенняя распродажа: скидки на мебель для гостиной!",
        "Покупка мебели с доставкой — скидка 10%!",
        "Акция недели: мебель для отдыха с большой скидкой!",
        "Только в ноябре: скидки до 25% на комплектующие для кухни!",
        "Обнови интерьер с нашими скидками до 30%",
        "Новинки сезона: кровати и матрасы со скидкой 15%",
        "Скидки на мебель для дачи! Успей купить до конца месяца!",
        "Успейте приобрести шторы и текстиль со скидкой 20%",
        "Акция: 25% на весь ассортимент мебели для спальни!",
        "Все для вашего интерьера: до 35% скидки на мебель",
        "Грандиозная распродажа! Мебель для дома по сниженным ценам"
    ];

    let currentIndex = 0;
    let currentCount = parseInt(badge.textContent);
    const maxNotifications = 20; // Максимальное количество уведомлений
    let canAddNotifications = true; // Флаг, позволяющий добавлять уведомления

    // Функция для удаления уведомления
    function deleteNotification(event) {
        const item = event.target.closest(".item");
        if (item) {
            item.remove();
            currentCount--;
            badge.textContent = Math.max(currentCount, 0); // Обновляем счетчик

            // Когда уведомление удалено, проверяем количество уведомлений
            if (currentCount < maxNotifications && canAddNotifications) {
                // Даем возможность добавлять уведомления через 10 секунд
                canAddNotifications = false;
                setTimeout(() => {
                    canAddNotifications = true;
                    checkAndAddNotification();
                }, 10000); // Ожидание 10 секунд
            }
        }
    }

    // Функция для отображения или скрытия уведомлений при клике на значок
    bellIcon.addEventListener("click", function () {
        notificationList.style.display = notificationList.style.display === "block" ? "none" : "block";
    });

    // Добавляем обработчик для уже существующих кнопок удаления
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", deleteNotification);
        });
    }

    // Изначально добавляем обработчики на кнопки удаления, если они уже есть
    addDeleteButtonListeners();

    // Функция для добавления нового уведомления
    function addNewNotification() {
        // Проверяем, не достигли ли мы максимального количества уведомлений
        if (currentCount >= maxNotifications || !canAddNotifications) {
            return; // Прекращаем добавление, если уведомлений уже 20 или флаг запрещает добавление
        }

        const newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.textContent = newNotifications[currentIndex];

        // Создаем кнопку удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "×";

        // Добавляем кнопку удаления к уведомлению
        newItem.appendChild(deleteBtn);

        // Вставляем новое уведомление в список
        notificationList.appendChild(newItem);

        // Увеличиваем счетчик
        currentCount++;
        badge.textContent = currentCount;

        // Добавляем обработчик события для кнопки удаления
        deleteBtn.addEventListener("click", deleteNotification);

        // Переходим к следующему уведомлению
        currentIndex = (currentIndex + 1) % newNotifications.length;
    }

    // Функция для проверки и добавления уведомлений при уменьшении их количества
    function checkAndAddNotification() {
        if (currentCount < maxNotifications && canAddNotifications) {
            addNewNotification();
        }
    }

    // Добавляем новое уведомление через определенные интервалы времени
    setInterval(() => {
        checkAndAddNotification();
    }, 3000);
});


