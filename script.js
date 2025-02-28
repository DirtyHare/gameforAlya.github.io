let currentLevel = 1;
let dateChoices = [];
const funnyImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkiLNOjRFKbbCmX6p9d6YwtVLPmtkSRcA0g&s', // Котик
    'https://i.pinimg.com/736x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg', // Сердечко
    'https://laboratory-holiday.ru/files/products/shar-v-forme-serdechka-krasnyj_1.800x800.jpg', // Звёзды
    'https://cs6.livemaster.ru/storage/51/8d/e9304e78c01418b5ea956d3be36a.jpg', // Ещё котик
    'https://i.pinimg.com/736x/11/13/f6/1113f62b818e33f88264df5494694b1a.jpg'  // Ещё звёзды
];

async function checkAnswer(level, answerIndex) {
    const correctAnswers = {
        1: 0, // 26.05.2022
        2: 0, // На Патриках
        3: 2, // Зелёный
        4: 1, // iPhone
        5: 0  // Смотреть фильмы и гулять
    };

    if (answerIndex === correctAnswers[level]) {
        await showFireworks(); // Ждём завершения салюта
        showFunnyImage(); // Показываем милую вставку
        nextLevel(level); // Переход после салюта
    } else {
        alert('Попробуй ещё раз, моя умничка! 💕');
    }
}

function chooseOption(level, type, choice) {
    dateChoices.push(choice);
    document.getElementById(`level-${level}`).classList.add('hidden');
    currentLevel++;

    const nextLevel = document.getElementById(`level-${currentLevel}`);
    if (nextLevel) {
        nextLevel.classList.remove('hidden');
    } else {
        showResult();
    }
}

function showFireworks() {
    return new Promise((resolve) => {
        const fireworks = document.getElementById('fireworks');
        const img = document.createElement('img');
        img.src = 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg'; // Фото салюта (звёзды)
        img.alt = 'Салют';
        img.className = 'firework-image';
        fireworks.innerHTML = '';
        fireworks.appendChild(img);
        fireworks.classList.remove('hidden');

        setTimeout(() => {
            fireworks.classList.add('hidden');
            resolve(); // Завершаем промис после 1.5 секунд
        }, 1500);
    });
}

function showFunnyImage() {
    const container = document.body;
    const img = document.createElement('img');
    const randomImage = funnyImages[Math.floor(Math.random() * funnyImages.length)];
    img.src = randomImage;
    img.className = 'funny-image';

    // Случайное положение по X (слева или справа)
    const isLeft = Math.random() > 0.5;
    img.style.left = isLeft ? '10px' : 'auto';
    img.style.right = isLeft ? 'auto' : '10px';
    img.style.top = Math.random() * 80 + 'vh'; // Случайная высота

    container.appendChild(img);

    // Удаляем изображение после анимации (3 секунды)
    setTimeout(() => {
        img.remove();
    }, 3000);
}

function showResult() {
    const result = document.getElementById('result');
    const summary = document.getElementById('date-summary');
    result.classList.remove('hidden');

    const datePlan = dateChoices.length === 2
        ? `${dateChoices[0]} и ${dateChoices[1]}`
        : 'Прогулка в парке и фейерверк';

    summary.innerHTML = `
        Моя любимая Ая, ты прошла квест! 💕<br>
        Наше идеальное свидание: <strong>${datePlan}</strong> 🌸<br>
        Ты самая лучшая, и я не могу дождаться, чтобы это случилось! <br>
        Напиши мне, когда захочешь, мой котёнок! 😽💖
    `;
}

function nextLevel(level) {
    document.getElementById(`level-${level}`).classList.add('hidden');
    currentLevel++;
    const next = document.getElementById(`level-${currentLevel}`);
    if (next) {
        next.classList.remove('hidden');
    }
}

function restartGame() {
    currentLevel = 1;
    dateChoices = [];
    document.getElementById('result').classList.add('hidden');
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`level-${i}`).classList.add('hidden');
    }
    document.getElementById('level-1').classList.remove('hidden');
}
