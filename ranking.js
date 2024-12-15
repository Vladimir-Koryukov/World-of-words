document.addEventListener('DOMContentLoaded', () => {
    const avatar = localStorage.getItem('avatar') || '../assets/images/base-avatar.png';
    const background = localStorage.getItem('background');
    const username = localStorage.getItem('username'); // Получаем имя пользователя
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем прогресс пользователя
    
    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    }  
    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background

    function loadRanking() {
        const tableBody = document.getElementById('ranking-table');
        tableBody.innerHTML = '';
    
        const currentUsername = localStorage.getItem('username'); // Текущий пользователь
    
        // Собираем всех пользователей из localStorage
        const allUsers = Object.keys(localStorage).filter(key => {
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                return userData && userData.score !== undefined;
            } catch {
                return false;
            }
        });
    
        // Извлекаем данные для рейтинга
        const ranking = allUsers.map(key => {
            const userData = JSON.parse(localStorage.getItem(key));
            return {
                username: key,
                score: userData.score || 0 // Если поле score отсутствует, используем 0
            };
        });
    
        // Сортируем по убыванию очков
        ranking.sort((a, b) => b.score - a.score);
    
        // Заполняем таблицу
        ranking.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}. ${user.username}</td>
                <td>${user.score}</td>`;
            if (user.username === currentUsername) {
                row.classList.add('current-user');
            }
            
            tableBody.appendChild(row);
        });
    }
    
    // Функция для возвращения в игру
    function goBackToGame() {
        window.location.href = '../levels/levels.html'; // Укажите URL вашей игры
    }
    
    // Добавляем обработчики событий
    document.getElementById('back-btn').addEventListener('click', goBackToGame);
    
    // Загружаем рейтинг при загрузке страницы
    loadRanking();
    
})


