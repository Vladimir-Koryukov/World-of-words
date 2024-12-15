function updateProgress(level, points) {
    const username = localStorage.getItem('username'); // Получаем имя пользователя
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем прогресс пользователя

    // Обновляем прогресс в зависимости от уровня
    if (level === 1) {
        userProgress.level1Completed = true;
    } else if (level === 2) {
        userProgress.level2Completed = true;
    } else if (level === 21) {
        userProgress.level21Completed = true;
    } else if (level === 22) {
        userProgress.level22Completed = true;
    } else if (level === 23) {
        userProgress.level23Completed = true;
    } else if (level === 3) {
        userProgress.level3Completed = true;
    }

    userProgress.score += points;

    // Сохраняем обновленный прогресс в localStorage
    localStorage.setItem(username, JSON.stringify(userProgress));
}

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username'); // Получаем имя пользователя
    let userProgress = JSON.parse(localStorage.getItem(username)); // Получаем прогресс пользователя
    
    // Получаем данные из localStorage для фона, текста и аватара
    const avatar = localStorage.getItem('avatar');
    const background = localStorage.getItem('background');

    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    } 

    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background;

    const questions = [
        {
            words: ['аллея', 'ночь', 'гантель', 'ОРВИ', 'фейхоа', 'учебник', 'кофе', 'торнадо', 'пенальти', 'тюль', 'солнце', 'лото', 'бра', 'латте', 'капучино'],
            categories: {
                Женский_род: ['аллея', 'ночь', 'гантель', 'ОРВИ', 'фейхоа'],
                Мужской_род: ['учебник', 'кофе', 'торнадо', 'пенальти', 'тюль'],
                Средний_род: ['солнце', 'лото', 'бра', 'латте', 'капучино']
            }
        },
        {
            words: ['United States', 'Belgium', 'Ireland', 'Japan', 'Scotland', 'American', 'Belgian', 'British', 'Cuban', 'Iraqi', 'Scottish', 'Dutch', 'Portuguese', 'Irish', 'Persian'],
            categories: {
                Country: ['United States', 'Belgium', 'Ireland', 'Japan', 'Scotland'],
                Nationality: ['American', 'Belgian', 'British', 'Cuban', 'Iraqi'],
                Language: ['Scottish', 'Dutch', 'Portuguese', 'Irish', 'Persian']
            }
        },
        {
            words: ['животные', 'грибы', 'растения', 'бактерии', 'ящеры', 'приматы', 'хищные', 'сумчатые', 'рукокрылые', 'млекопитающие', 'птицы', 'пресмыкающиеся', 'рыбы', 'земноводные'],
            categories: {
                Царство: ['животные', 'грибы', 'растения', 'бактерии'],
                Отряд: ['ящеры', 'приматы', 'хищные', 'сумчатые', 'рукокрылые'],
                Класс: ['млекопитающие', 'птицы', 'пресмыкающиеся', 'рыбы', 'земноводные']
            }
        },
        {
            words: ['волк', 'олень', 'рысь', 'лиса', 'медведь', 'корова', 'кошка', 'хомяк', 'собака', 'поросенок'],
            categories: {
                Дикие: ['волк', 'олень', 'рысь', 'лиса', 'медведь'],
                Домашние: ['корова', 'кошка', 'хомяк', 'собака', 'поросенок'],
            }
        },
        {
            words: ['огурец', 'тыква', 'шпинат', 'руккола', 'цукини', 'авокадо', 'яблоко', 'банан', 'дуриан', 'киви', 'земляника', 'черника', 'голубика', 'облепиха', 'морошка'],
            categories: {
                Овощи: ['огурец', 'тыква', 'шпинат', 'руккола', 'цукини'],
                Фрукты: ['авокадо', 'яблоко', 'банан', 'дуриан', 'киви'],
                Ягоды: ['земляника', 'черника', 'голубика', 'облепиха', 'морошка']
            }
        },
        {
            words: ['Ангола', 'Мавритания', 'Камерун', 'Коморы', 'Сент-Люсия', 'Дакка', 'Сан-Хосе', 'Валлетта', 'Порт-оф-Спейн', 'Нуакшот'],
            categories: {
                Страны: ['Ангола', 'Мавритания', 'Камерун', 'Коморы', 'Сент-Люсия'],
                Столицы: ['Дакка', 'Сан-Хосе', 'Валлетта', 'Порт-оф-Спейн', 'Нуакшот'],
            }
        }
    ];

    let score = 0;
    let countQuestions = 1;
    let timeLeft = 60;
    const timerElement = document.getElementById('time-left');
    let timerInterval;

    // Функция для обновления отображения очков
    function updateScore() {
        document.getElementById('score-value').textContent = score;
    }

    // Обработка истечения времени
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft -= 1;
            timerElement.textContent = timeLeft;
        } else {
            clearInterval(timerInterval); // Останавливаем таймер
            showRetryModal(); // Показываем модальное окно
        }
    }

    // Функция для сброса таймера на 30 секунд
    function resetTimer() {
        clearInterval(timerInterval);  // Останавливаем старый таймер
        timeLeft = 60;  // Сбрасываем таймер
        timerElement.textContent = timeLeft;  // Обновляем отображаемое время
        timerInterval = setInterval(updateTimer, 1000);  // Запускаем новый таймер
    }

    // Массив для хранения использованных индексов заданий
    let usedTasks = [];
    
    function getRandomQuestion(tasksArray) {
        if (usedTasks.length === tasksArray.length) {
            // Если все задания использованы, сбрасываем массив использованных заданий
            usedTasks = [];
        }

        let taskIndex;
        do {
            taskIndex = Math.floor(Math.random() * tasksArray.length);
        } while (usedTasks.includes(taskIndex));

        // Добавляем индекс задания в список использованных
        usedTasks.push(taskIndex);

        return tasksArray[taskIndex];
    }
    
    function displayQuestion(question) {
        const container = document.getElementById('question-container');
        container.innerHTML = '';
    
        let shuffledOptions = shuffle([...question.words]);

        shuffledOptions.forEach(word => {
            const wordBlock = document.createElement('div');
            wordBlock.className = 'word-block';
            wordBlock.textContent = word;
            wordBlock.draggable = true;
    
            wordBlock.addEventListener('dragstart', handleDragStart);
            wordBlock.addEventListener('dragend', handleDragEnd);
    
            container.appendChild(wordBlock);
        });
    
        displayCategories(question.categories);
    }

    // Функция для случайного перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function displayCategories(categories) {
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.innerHTML = '';
    
        Object.keys(categories).forEach(categoryName => {
            const categoryBlock = document.createElement('div');
            categoryBlock.className = 'category-block';
    
            const title = document.createElement('div');
            title.className = 'category-title';
            title.textContent = categoryName;
    
            const content = document.createElement('div');
            content.className = 'category-content';
            content.dataset.category = categoryName;
    
            content.addEventListener('dragover', handleDragOver);
            content.addEventListener('drop', handleDrop);
    
            categoryBlock.appendChild(title);
            categoryBlock.appendChild(content);
            categoriesContainer.appendChild(categoryBlock);
        });
    }

    let draggedWord = null;

    function handleDragStart(event) {
        draggedWord = event.target;
        event.dataTransfer.setData('text/plain', event.target.textContent);
        setTimeout(() => {
            event.target.style.display = 'none'; // Скрываем слово для визуального эффекта
        }, 0);
    }

    function handleDragEnd(event) {
        event.target.style.display = 'block'; // Показываем слово после перетаскивания
        draggedWord = null;
    }

    function handleDragOver(event) {
        event.preventDefault(); // Позволяем сброс
        event.dataTransfer.dropEffect = 'move';
        event.target.classList.add('hover'); // Для визуальной подсветки, если понадобится
    }

    function handleDrop(event) {
        event.preventDefault();

        const content = event.target.closest('.category-content'); // Проверяем, что сброс был в корзину
        if (content && draggedWord) {
            content.appendChild(draggedWord); // Добавляем слово в корзину
            content.classList.remove('hover'); // Убираем подсветку
        }
    }

    const newQuestionButton = document.getElementById('new-question-btn');
    newQuestionButton.disabled = true;
    document.getElementById('new-question-btn').addEventListener('click', () => {
        const randomQuestion = getRandomQuestion(questions);
        const checkButton = document.getElementById('check-btn');
        checkButton.disabled = false;
        checkButton.style.backgroundColor = ''; // Сбрасываем стиль
        checkButton.textContent = 'Проверить'; // Сбрасываем текст

        // Сброс текста результата
        const resultContainer = document.getElementById('result-container');
        resultContainer.textContent = '';
        resultContainer.style.color = '';

        // Очищаем массив processedWords
        processedWords.clear();        
        displayQuestion(randomQuestion);
        resetTimer();
    });

    let processedWords = new Set(); // Хранит только правильно распределенные слова

    document.getElementById('check-btn').addEventListener('click', () => {
        const categoriesContainer = document.getElementById('categories-container');
        const wordPool = document.getElementById('question-container'); // Контейнер со словами
        const categories = Array.from(categoriesContainer.querySelectorAll('.category-block'));
        const resultContainer = document.getElementById('result-container');
        const checkButton = document.getElementById('check-btn');
        
        let allCorrect = true; // Для проверки правильности
        let allDistributed = wordPool.children.length === 0; // Проверка на распределение всех слов

        if (!allDistributed) {
            resultContainer.textContent = 'Необходимо распределить все слова!';
            resultContainer.style.color = '#dc3545'; // Красный текст
            return; // Выходим из функции
        }

        categories.forEach(categoryBlock => {
            const categoryName = categoryBlock.querySelector('.category-title').textContent;
            const words = Array.from(categoryBlock.querySelectorAll('.word-block'));

            words.forEach(wordBlock => {
                const word = wordBlock.textContent;

                if (!processedWords.has(word)) { // Проверяем, обрабатывалось ли слово
                    const isCorrect = questions.some(question =>
                        question.categories[categoryName]?.includes(word)
                    );

                    if (isCorrect) {
                        wordBlock.classList.add('correct', 'locked');
                        wordBlock.classList.remove('wrong');
                        score += 1; // Добавляем баллы за правильное слово
                        processedWords.add(word); // Добавляем только правильные слова
                        newQuestionButton.disabled = false;
                    } else {
                        wordBlock.classList.add('wrong');
                        wordBlock.classList.remove('correct');
                        score -= 5; // Вычитаем баллы за неправильное слово
                        allCorrect = false; // Отмечаем, что не всё правильно
                    }

                    updateScore(); // Обновляем счёт
                }
            });
        });

        if (allCorrect && countQuestions > 4) {
            updateProgress(3, score);
            showCongratulations();
        } else if (allCorrect) {
            resultContainer.textContent = `Отлично! Вы справились! Ваш счёт: ${score}`;
            resultContainer.style.color = '#28a745'; // Зелёный текст
            checkButton.disabled = true;
            checkButton.style.backgroundColor = '#ccc'; // Изменяем стиль кнопки
            checkButton.textContent = 'Завершено';
            clearInterval(timerInterval); // Останавливаем таймер
            countQuestions += 1;
        } else {
            resultContainer.textContent = `Попробуйте еще! Ваш счёт: ${score}`;
            resultContainer.style.color = '#dc3545'; // Красный текст
        }
    });       
    
    // Показываем первый вопрос сразу при загрузке страницы
    window.onload = () => {
        const initialQuestion = getRandomQuestion(questions);
        displayQuestion(initialQuestion);
    };

    // Модальное окно и кнопка перехода на следующий уровень
    const modal = document.getElementById('congratulation-modal');
    const nextLevelButton = document.getElementById('next-level-button');

    // Функция для обновления отображения очков
    function updateScore() {
        document.getElementById('score-value').textContent = score;
    }

    // Функция для показа модального окна
    function showCongratulations() {
        modal.style.display = 'flex'; // Показываем модальное окно
        clearInterval(timerInterval); // Останавливаем таймер
    }

    nextLevelButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    const retryModal = document.getElementById('retry-modal');
    const currentScoreElement = document.getElementById('current-score');
    const restartButton = document.getElementById('restart-button');
    const menuButton = document.getElementById('menu-button');

    // Функция показа модального окна для неправильного ответа или истечения времени
    function showRetryModal() {
        currentScoreElement.textContent = score; // Отображаем текущий счет
        retryModal.style.display = 'flex'; // Показываем модальное окно
    }

    // Обработчики кнопок модального окна
    restartButton.addEventListener('click', () => {
        location.reload(); // Перезагрузка страницы для начала игры заново
    });

    menuButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    const pauseButton = document.getElementById('pause-button');
    const pauseModal = document.getElementById('pause-modal');
    const resumeButton = document.getElementById('resume-button');
    const restartButtonPause = document.getElementById('restart-button-pause');
    const settingsButton = document.getElementById('settings-button');
    const levelsButton = document.getElementById('levels-button');

    // Функция для постановки игры на паузу
    function pauseGame() {
        clearInterval(timerInterval); // Останавливаем таймер
        pauseModal.style.display = 'flex'; // Показываем модальное окно
    }

    // Функция для продолжения игры
    function resumeGame() {
        if (modal.style.display === 'none' || retryModal.style.display === 'none') {
            timerInterval = setInterval(updateTimer, 1000); // Перезапускаем таймер с текущего значения
        }
        pauseModal.style.display = 'none'; // Скрываем модальное окно
    }

    // Обработчик кнопки паузы
    pauseButton.addEventListener('click', pauseGame);

    // Обработчик кнопки "Продолжить игру"
    resumeButton.addEventListener('click', resumeGame);

    // Обработчик кнопки "Начать сначала"
    restartButtonPause.addEventListener('click', () => {
        window.location.reload(); // Перезагружаем страницу
    });

    // Обработчик кнопки "Вернуться к уровням"
    levelsButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');

    // Открыть модальное окно настроек
    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    // Закрыть модальное окно настроек
    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Выбор фона
    document.querySelectorAll('.bg-option').forEach(bg => {
        bg.addEventListener('click', () => {
            document.querySelectorAll('.bg-option').forEach(option => option.classList.remove('selected'));
            bg.classList.add('selected');
            const selectedBackground = getComputedStyle(bg).background;
            document.body.style.background = selectedBackground;
        });
    });

    // Выбор цвета текста
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(option => option.classList.remove('selected'));
            color.classList.add('selected');
            const selectedTextColor = color.getAttribute('data-color');
            document.documentElement.style.setProperty('--text-color', selectedTextColor);
        });
    });

    resetTimer();
});