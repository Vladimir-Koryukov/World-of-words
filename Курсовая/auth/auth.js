document.addEventListener('DOMContentLoaded', () => {
    let selectedAvatar = null;
    let selectedBackground = null;

    // Выбор аватара
    document.querySelectorAll('.avatar').forEach(avatar => {
        avatar.addEventListener('click', () => {
            document.querySelectorAll('.avatar').forEach(av => av.classList.remove('selected'));
            avatar.classList.add('selected');
            selectedAvatar = avatar.src;
            document.getElementById('user-avatar').src = selectedAvatar;
        });
    });
    if (!selectedAvatar) {
        selectedAvatar = '../assets/images/base-avatar.png'; // Базовый аватар
    }

    // Выбор фона
    document.querySelectorAll('.bg-option').forEach(bg => {
        bg.addEventListener('click', () => {
            document.querySelectorAll('.bg-option').forEach(option => option.classList.remove('selected'));
            bg.classList.add('selected');
            selectedBackground = getComputedStyle(bg).background;
            document.body.style.background = selectedBackground;
        });
    });

    // Сохранение данных
    document.getElementById('auth-form').addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (!username) {
            alert('Введите имя пользователя!');
            return;
        }
        
        // Проверка на наличие пользователя в localStorage
        let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем данные о прогрессе пользователя

        // Если пользователя нет, создаем новый объект с прогрессом
        if (!userProgress) {
            userProgress = {
                level1Completed: true,
                level2Completed: true,
                level21Completed: true,
                level22Completed: true,
                level23Completed: true,
                level3Completed: true,
                score: 0
            };
            localStorage.setItem(username, JSON.stringify(userProgress)); // Сохраняем новый объект в localStorage
        }

        localStorage.setItem('username', username);
        localStorage.setItem('avatar', selectedAvatar);
        localStorage.setItem('background', selectedBackground);
        localStorage.setItem('progress', JSON.stringify(userProgress));
        window.location.href = '../levels/levels.html';
    });
    const username = localStorage.getItem('username');
});
