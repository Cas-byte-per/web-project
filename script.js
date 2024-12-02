// Обработчик отправки формы регистрации
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы для демонстрации

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (username && email && document.getElementById('captchaInput').value === captchaAnswer) {
        alert(`Добро пожаловать, ${username}! Регистрация прошла успешно.`);
        document.getElementById('message').textContent = 'Регистрация прошла успешно!'; // Показываем сообщение об успешной регистрации
    } else {
        alert("Пожалуйста, заполните все поля и правильно введите капчу.");
        document.getElementById('message').textContent = 'Неправильный ввод капчи или незаполненные поля.';
    }
});

// Обработчик кнопки "Вернуться на основную страницу"
document.querySelector('.back-button').addEventListener('click', function () {
    window.location.href = 'index_7.html'; // Переход на указанную страницу
});

// Обработчик кнопки "Войти"
document.getElementById('login-btn').addEventListener('click', function () {
    const login = prompt('Введите логин:');

    if (login === 'Админ') {
        const password = prompt('Введите пароль:');

        if (password === 'Я главный') {
            displayMessage('Здравствуйте!');
        } else if (password === '' || password === null) {
            displayMessage('Отменено');
        } else {
            displayMessage('Неверный пароль');
        }
    } else if (login === '' || login === null) {
        displayMessage('Отменено');
    } else {
        displayMessage('Попробуйте зарегистрироваться');
    }
});

// Функция для отображения сообщений
function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
}

// Проверка пустого ввода
function isEmpty(obj) {
    return !obj || obj.trim() === "";
}

// Инициализация капчи
let captchaType = "letters"; // Начинаем с буквенной капчи
let captchaAnswer = "";

// Генерация капчи с буквами
function generateLetterCaptcha() {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    captchaAnswer = result;
    document.getElementById("captchaText").innerText = `Введите текст: ${captchaAnswer}`;
}

// Генерация капчи с числами
function generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = (num1 + num2).toString();
    document.getElementById("captchaText").innerText = `Сколько будет: ${num1} + ${num2}?`;
}

// Обработчик смены капчи
function regenerateCaptcha() {
    if (captchaType === "letters") {
        captchaType = "math";
        generateMathCaptcha();
    } else {
        captchaType = "letters";
        generateLetterCaptcha();
    }
}

// Проверка капчи
function validateCaptcha() {
    const userInput = document.getElementById("captchaInput").value;
    const errorMessage = document.getElementById("errorMessage");

    if (userInput.trim() === captchaAnswer) {
        errorMessage.classList.add("hidden");
        document.getElementById("submitButton").disabled = false;
        document.getElementById("login-btn").disabled = false;
    } else {
        errorMessage.classList.remove("hidden");
        document.getElementById("submitButton").disabled = true;
        document.getElementById("login-btn").disabled = true;
    }
}

// Инициализация событий
document.addEventListener("DOMContentLoaded", () => {
    generateLetterCaptcha(); // Генерация первой капчи

    // Обработчик для проверки ввода капчи
    document.getElementById("captchaInput").addEventListener("input", () => {
        const input = document.getElementById("captchaInput").value;
        if (isEmpty(input)) {
            document.getElementById("submitButton").disabled = true;
            document.getElementById("login-btn").disabled = true;
        } else {
            validateCaptcha();
        }
    });

    // Перегенерация капчи при неправильном вводе
    document.getElementById("captchaInput").addEventListener("blur", () => {
        const userInput = document.getElementById("captchaInput").value;
        if (userInput.trim() !== captchaAnswer) {
            regenerateCaptcha();
        }
    });

    // Обработчик события отправки формы
    document.getElementById("registrationForm").addEventListener("submit", handleRegistration);
});
