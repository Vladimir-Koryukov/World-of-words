document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username'); // Получаем имя пользователя
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем прогресс пользователя
    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    }  
    
    const avatar = localStorage.getItem('avatar') || '../images/base-avatar.png'; // Базовый аватар
    const background = localStorage.getItem('background') || 'linear-gradient(to right, #6a11cb, #2575fc)'; // Фон по умолчанию

    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background;

    // Проверяем, какие уровни доступны
    const level2 = document.getElementById('level-2');
    const level3 = document.getElementById('level-3');
    const level2Message = document.getElementById('level-2-message');
    const level3Message = document.getElementById('level-3-message');

    // Включаем или блокируем уровни
    if (userProgress.level21Completed) {
        level2.classList.remove('locked');
        level2Message.style.display = 'none';
    }

    if (userProgress.level22Completed) {
        level3.classList.remove('locked');
        level3Message.style.display = 'none';
    }

    // Обработка кликов по уровням
    document.getElementById('level-1').addEventListener('click', () => {
        window.location.href = '../2level-1subLevel/2level-1subLevel.html'; // Переход на страницу 1 уровня
    });

    document.getElementById('level-2').addEventListener('click', () => {
        if (!userProgress.level21Completed) {
            level2Message.style.display = 'block';
            setTimeout(function () {
                level2Message.classList.add('hidden'); // Плавное исчезновение
                setTimeout(() => {
                    level2Message.style.display = 'none'; // Скрываем полностью после анимации
                    level2Message.classList.remove('hidden');
                }, 1000); // Время на плавное исчезновение (1 секунда)
            }, 2000); // Сообщение будет отображаться 2 секунды
        } else {
            window.location.href = '../2level-2subLevel/2level-2subLevel.html'; // Переход на страницу 2 уровня
        }
    });
    
    document.getElementById('level-3').addEventListener('click', () => {
        if (!userProgress.level22Completed) {
            level3Message.style.display = 'block';
            setTimeout(function () {
                level3Message.classList.add('hidden'); // Плавное исчезновение
                setTimeout(() => {
                    level3Message.style.display = 'none'; // Скрываем полностью после анимации
                    level3Message.classList.remove('hidden');
                }, 1000); // Время на плавное исчезновение (1 секунда)
            }, 2000); // Сообщение будет отображаться 2 секунды
        } else {
            window.location.href = '../2level-3subLevel/2level-3subLevel.html'; // Переход на страницу 3 уровня
        }
    });
});
