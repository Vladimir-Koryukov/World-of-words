document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', () => {
        // Переход на страницу авторизации
        window.location.href = 'auth/auth.html'; // Страница игры
    });
});
