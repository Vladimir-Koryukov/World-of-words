document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные из localStorage
    const username = localStorage.getItem('username');
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем данные о прогрессе пользователя
    const avatar = localStorage.getItem('avatar');
    const background = localStorage.getItem('background');

    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    }  
    
    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background;

    // Обработка кликов по режимам игры
    document.getElementById('classic-mode').addEventListener('click', () => {
        // Переход на страницу игры с классическим режимом
        window.location.href = '../level1-classic/level1-classic.html';
    });

    document.getElementById('first-error-mode').addEventListener('click', () => {
        // Переход на страницу игры с режимом до первой ошибки
        window.location.href = '../level1-firstError/level1-firstError.html';
    });

    document.getElementById('max-time-mode').addEventListener('click', () => {
        // Переход на страницу игры с режимом максимум за ограниченное время
        window.location.href = '../level1-limitedTime/level1-limitedTime.html';
    });
});
