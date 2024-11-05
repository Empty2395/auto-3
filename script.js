// Функція для плавного прокручування до секцій
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Функція для відображення деталей автомобіля
function showDetails(carName) {
    alert(`Деталі автомобіля: ${carName}`);
}

// Функція для обробки надсилання форми
function handleSubmit(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    fetch('/send-email', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(message => {
        alert(message); // Показываем сообщение об успешной отправке
    })
    .catch(error => {
        alert('Ошибка отправки: ' + error);
    });
}


// Функція для анімації появи елементів при прокрутці
const sections = document.querySelectorAll('section');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(100px)';
    observer.observe(section);
});

// Функція для відкриття чат-бота
function openChat() {
    const chatbot = document.querySelector('.chatbot');
    const toggleButton = document.getElementById('chatbot-toggle');
    chatbot.style.display = 'flex'; // Показує чат-бот
    toggleButton.style.display = 'none'; // Скрывает кнопку
}

// Функція для закриття чат-бота
function closeChat() {
    const chatbot = document.querySelector('.chatbot');
    const toggleButton = document.getElementById('chatbot-toggle');
    chatbot.style.display = 'none'; // Ховає чат-бот
    toggleButton.style.display = 'block'; // Показує кнопку
}

// Функція для обробки вводу повідомлення
function handleChatInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const userMessage = input.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            input.value = '';
            respondToUser(userMessage);
        }
    }
}

// Функція для відображення повідомлення
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокручиваем вниз
}

// Функція для відповіді на повідомлення користувача
function respondToUser(message) {
    const lowerMessage = message.toLowerCase();
    let botResponse = '';

    if (lowerMessage.includes('автомобілі')) {
        botResponse = 'У нас есть большой выбор автомобилей! Какой вам интересен?';
    } else if (lowerMessage.includes('гарантія')) {
        botResponse = 'Мы предоставляем длительную гарантию на все автомобили.';
    } else if (lowerMessage.includes('ціна')) {
        botResponse = 'Ціни на автомобілі починаються від $20,000.';
    } else {
        botResponse = 'Вибачте, я не зовсім зрозумів. Можете уточнити ваше питання?';
    }

    setTimeout(() => {
        displayMessage(botResponse, 'bot');
    }, 1000); // Затримка для імітації відповіді бота
}

// Показати чат-бота при завантаженні сторінки (опционально)
window.onload = () => {
    //toggleChat(); // Закомментируйте эту строку, если не нужно открывать чат автоматически
};
