document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные из localStorage
    const username = localStorage.getItem('username');
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем данные о прогрессе пользователя
    const avatar = localStorage.getItem('avatar'); // Базовый аватар
    const background = localStorage.getItem('background'); // Фон по умолчанию

    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background;

    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    }    
    
    // Проверяем, какие уровни доступны
    const level2 = document.getElementById('level-2');
    const level3 = document.getElementById('level-3');
    const level2Message = document.getElementById('level-2-message');
    const level3Message = document.getElementById('level-3-message');

    // Включаем или блокируем уровни
    if (userProgress.level1Completed) {
        level2.classList.remove('locked');
        level2Message.style.display = 'none';
    }

    if (userProgress.level2Completed) {
        level3.classList.remove('locked');
        level3Message.style.display = 'none';
    }

    // Обработка кликов по уровням
    document.getElementById('level-1').addEventListener('click', () => {
        window.location.href = '../modes/modes.html'; // Переход на страницу 1 уровня
    });

    document.getElementById('level-2').addEventListener('click', () => {
        if (!userProgress.level1Completed) {
            level2Message.style.display = 'block';
            setTimeout(function () {
                level2Message.classList.add('hidden'); // Плавное исчезновение
                setTimeout(() => {
                    level2Message.style.display = 'none'; // Скрываем полностью после анимации
                    level2Message.classList.remove('hidden');
                }, 1000); // Время на плавное исчезновение (1 секунда)
            }, 2000); // Сообщение будет отображаться 2 секунды
        } else {
            window.location.href = '../levels2/levels2.html'; // Переход на страницу 2 уровня
        }
    });
    
    document.getElementById('level-3').addEventListener('click', () => {
        if (!userProgress.level2Completed) {
            level3Message.style.display = 'block';
            setTimeout(function () {
                level3Message.classList.add('hidden'); // Плавное исчезновение
                setTimeout(() => {
                    level3Message.style.display = 'none'; // Скрываем полностью после анимации
                    level3Message.classList.remove('hidden');
                }, 1000); // Время на плавное исчезновение (1 секунда)
            }, 2000); // Сообщение будет отображаться 2 секунды
        } else {
            window.location.href = '../level3-classic/level3-classic.html'; // Переход на страницу 3 уровня
        }
    });
});
