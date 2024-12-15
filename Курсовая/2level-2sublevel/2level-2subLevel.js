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
    const userScoreElement = document.getElementById('user-score');
    if (userScoreElement) {
        userScoreElement.textContent = userProgress.score;
    } 
    // Получаем данные из localStorage для аватара, фона и цвета текста
    const avatar = localStorage.getItem('avatar') || '../assets/images/base-avatar.png';
    const background = localStorage.getItem('background');

    // Устанавливаем аватар, фон и цвет текста
    document.getElementById('user-avatar').src = avatar;
    document.body.style.background = background;

    // Логика лабиринта
    const maze = [
        ['path', 'wall', 'path', 'path', 'question', 'wall', 'path', 'path', 'question', 'wall', 'path', 'question'],
        ['path', 'wall', 'path', 'wall', 'path', 'wall', 'path', 'wall', 'path', 'wall', 'path', 'wall'],
        ['question', 'path', 'path', 'wall', 'path', 'path', 'question', 'wall', 'path', 'question', 'path', 'wall'],
        ['wall', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'wall', 'wall'],
        ['path', 'path', 'question', 'path', 'path', 'wall', 'path', 'path', 'path', 'wall', 'question', 'wall'],
        ['path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['path', 'path', 'path', 'path', 'path', 'wall', 'question', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['path', 'path', 'question', 'path', 'path', 'wall', 'path', 'path', 'question', 'wall', 'path', 'wall'],
        ['wall', 'wall', 'path', 'wall', 'wall', 'wall', 'path', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['question', 'wall', 'path', 'wall', 'path', 'path', 'path', 'wall', 'path', 'path', 'question', 'path'],
        ['path', 'path', 'question', 'path', 'path', 'wall', 'question', 'wall', 'wall', 'wall', 'wall', 'path'],
    ];

    const questions = [
        {
            question: "Какая часть речи отвечает на вопросы 'кто?' или 'что?'?",
            answers: ["Глагол", "Существительное", "Прилагательное"],
            correctAnswer: "Существительное"
        },
        {
            question: "Какая часть речи обозначает действие или состояние?",
            answers: ["Глагол", "Местоимение", "Числительное"],
            correctAnswer: "Глагол"
        },
        {
            question: "Какая часть речи отвечает на вопросы 'какой?', 'какая?', 'какое?', 'какие?'?",
            answers: ["Прилагательное", "Глагол", "Частица"],
            correctAnswer: "Прилагательное"
        },
        {
            question: "Какая часть речи изменяется по родам, числам и падежам?",
            answers: ["Глагол", "Местоимение", "Существительное"],
            correctAnswer: "Существительное"
        },
        {
            question: "Какой из следующих примеров является наречием?",
            answers: ["бежать", "хорошо", "красивый"],
            correctAnswer: "хорошо"
        },
        {
            question: "Какая часть речи используется для указания на предмет или его признак?",
            answers: ["Местоимение", "Существительное", "Прилагательное"],
            correctAnswer: "Местоимение"
        },
        {
            question: "Какая часть речи служит для связи слов в предложении и не имеет самостоятельного значения?",
            answers: ["Глагол", "Частица", "Междометие"],
            correctAnswer: "Частица"
        },
        {
            question: "Какая часть речи отвечает на вопросы 'где?', 'когда?', 'куда?'?",
            answers: ["Местопримечание", "Предлог", "Наречие"],
            correctAnswer: "Наречие"
        },
        {
            question: "Какая часть речи обозначает действие или состояние, но не имеет вида?",
            answers: ["Глагол несовершенного вида", "Глагол совершенного вида", "Числительное"],
            correctAnswer: "Глагол несовершенного вида"
        },
        {
            question: "Какая часть речи указывает на количество предметов?",
            answers: ["Числительное", "Местоимение", "Глагол"],
            correctAnswer: "Числительное"
        },
        {
            question: "Какая часть речи выражает эмоциональное отношение говорящего?",
            answers: ["Междометие", "Прилагательное", "Наречие"],
            correctAnswer: "Междометие"
        },
        {
            question: "Какая часть речи может быть только в форме множественного числа?",
            answers: ["Существительное", "Числительное", "Местоимение"],
            correctAnswer: "Числительное"
        },
        {
            question: "Какая часть речи указывает на признаки предметов, но не отвечает на вопросы 'какой?', 'какая?', 'какие?'?",
            answers: ["Прилагательное", "Глагол", "Частица"],
            correctAnswer: "Прилагательное"
        },
        {
            question: "Какая часть речи изменяется по лицам, числам и падежам?",
            answers: ["Глагол", "Числительное", "Местоимение"],
            correctAnswer: "Местоимение"
        },
        {
            question: "Какая часть речи употребляется для выражения обстоятельств действия?",
            answers: ["Глагол", "Наречие", "Частица"],
            correctAnswer: "Наречие"
        },
        {
            question: "Определите часть речи слова 'быстро' в предложении: 'Он бегал быстро'.",
            answers: ["Глагол", "Наречие", "Прилагательное"],
            correctAnswer: "Наречие"
        },
        {
            question: "Определите часть речи слова 'сказал' в предложении: 'Она сказала нам правду'.",
            answers: ["Глагол", "Существительное", "Местоимение"],
            correctAnswer: "Глагол"
        },
        {
            question: "Найдите существительное в предложении: 'Мальчик пошел в парк.'",
            answers: ["Мальчик", "пошел", "в"],
            correctAnswer: "Мальчик"
        },
        {
            question: "Найдите прилагательное в предложении: 'Солнце было ярким.'",
            answers: ["Солнце", "было", "ярким"],
            correctAnswer: "ярким"
        },
        {
            question: "Определите часть речи слова 'быть' в предложении: 'Он может быть дома'.",
            answers: ["Глагол", "Местоимение", "Частица"],
            correctAnswer: "Глагол"
        },
        {
            question: "Найдите местоимение в предложении: 'Он не был дома.'",
            answers: ["Он", "не", "дома"],
            correctAnswer: "Он"
        },
        {
            question: "Определите часть речи слова 'сильно' в предложении: 'Она сильно переживала.'",
            answers: ["Глагол", "Наречие", "Прилагательное"],
            correctAnswer: "Наречие"
        },
        {
            question: "Найдите числительное в предложении: 'Я прочитал три книги.'",
            answers: ["Я", "прочитал", "три"],
            correctAnswer: "три"
        },
        {
            question: "Найдите частицу в предложении: 'Он не пришел вовремя.'",
            answers: ["Он", "не", "вовремя"],
            correctAnswer: "не"
        },
        {
            question: "Определите часть речи слова 'красиво' в предложении: 'Она поет красиво.'",
            answers: ["Глагол", "Наречие", "Прилагательное"],
            correctAnswer: "Наречие"
        },
        {
            question: "Найдите междометие в предложении: 'О, как красиво!'",
            answers: ["О", "как", "красиво"],
            correctAnswer: "О"
        }
    ];
    
    let score = 0;
    let timeLeft = 210;
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
        timerInterval = setInterval(updateTimer, 1000);  // Запускаем новый таймер
    }
    
    const mazeContainer = document.getElementById('maze');
    
    let avatarPosition = { x: 0, y: 0 };
    const treasurePosition = { x: 11, y: 11 }; // Позиция сокровища

    // Генерация лабиринта
    maze.forEach((row) => {
        row.forEach((cell) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add(cell);
            mazeContainer.appendChild(cellElement);
        });
    });

    // Создаем элемент аватара
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('avatar');
    avatarElement.style.backgroundImage = `url(${avatar})`;
    mazeContainer.appendChild(avatarElement);

    // Устанавливаем аватар на начальную позицию
    const moveAvatar = (dx, dy) => {
        const newX = avatarPosition.x + dx;
        const newY = avatarPosition.y + dy;

        if (maze[newY] && maze[newY][newX] === 'path' || maze[newY][newX] === 'question') {
            avatarPosition.x = newX;
            avatarPosition.y = newY;
            avatarElement.style.left = avatarPosition.x * 50 + 'px';
            avatarElement.style.top = avatarPosition.y * 50 + 'px';
        }

        if (maze[newY][newX] === 'question') {
            const cellIndex = (newY) * maze[0].length + newX + 2; // Индекс клетки в DOM
            const cellElement = mazeContainer.children[cellIndex]; // Получаем клетку
            showModalQuestion(cellElement);
        }

        // Проверяем достижение клетки с сокровищем
        if (avatarPosition.x === treasurePosition.x && avatarPosition.y === treasurePosition.y) {
            if (score >= 10){
                updateProgress(22, score);
                showModal();
            } else {
                showRetryModal();
            }
        }
    };

    // Обработчик нажатий клавиш для перемещения
    document.addEventListener('keydown', (event) => {
        if (modalQuestion.style.display === 'none') {
            if (event.key === 'ArrowUp') {
                moveAvatar(0, -1);
            } else if (event.key === 'ArrowDown') {
                moveAvatar(0, 1);
            } else if (event.key === 'ArrowLeft') {
                moveAvatar(-1, 0);
            } else if (event.key === 'ArrowRight') {
                moveAvatar(1, 0);
            }
        }  
    });
    
    function reverseWords(wordsArray) {
        return wordsArray.map(word => word.split('').reverse().join(''));
    }

    function reverseWord(word) {
        return word.split('').reverse().join('');
    }

    const modal = document.getElementById('modal');
    const nextLevelButton = document.getElementById('next-level-button');

    const modalQuestion = document.getElementById('modalQuestion');
    modalQuestion.style.display = 'none';
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const closeModalButton = document.getElementById('close-modal');

    // Функция для показа модального окна с вопросом
    const showModalQuestion = (cellElement) => {
        // Выбираем случайный вопрос
        const question = getRandomTask(questions);

        // Отображаем вопрос
        questionText.textContent = question.question;

        const letters = ['a', 'b', 'c'];

        // Очистим предыдущие варианты ответов
        answerOptions.innerHTML = '';

        let shuffledOptions = shuffle(reverseWords([...question.answers]));

        // Для хранения соответствия буквы и ответа
        const answerMapping = {};

        // Добавляем новые варианты ответов
        shuffledOptions.forEach((answer, index) => {
            const answerBlock = document.createElement('div');
            const answerLetter = letters[index]; // Получаем букву (a, b, c)
            answerBlock.textContent = `${answerLetter}. ${answer}`;
            answerBlock.className = 'answer-block';

            // Сохраняем соответствие буквы и ответа
            answerMapping[answerLetter] = answer;

            answerBlock.onclick = () => {
                checkAnswer(answer, question.correctAnswer, answerBlock, cellElement);
                removeKeyboardListener(); // Убираем обработку клавиш
            };

            answerOptions.appendChild(answerBlock);
        });

        // Показываем модальное окно
        modalQuestion.style.display = 'flex';

        // Функция для обработки нажатия клавиш
        const handleKeyPress = (event) => {
            const pressedKey = event.key.toLowerCase(); // Получаем нажатую клавишу в нижнем регистре
            if (answerMapping[pressedKey]) {
                const selectedAnswer = answerMapping[pressedKey];

                // Находим соответствующий answerBlock
                const answerBlocks = document.querySelectorAll('.answer-block');
                const selectedBlock = Array.from(answerBlocks).find(block =>
                    block.textContent.startsWith(`${pressedKey}.`)
                );

                if (selectedBlock) {
                    checkAnswer(selectedAnswer, question.correctAnswer, selectedBlock, cellElement);
                    removeKeyboardListener(); // Убираем обработку клавиш
                }
            }
        };

        // Добавляем обработчик нажатий клавиш
        const addKeyboardListener = () => {
            document.addEventListener('keydown', handleKeyPress);
        };

        // Убираем обработчик нажатий
        const removeKeyboardListener = () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

        // Включаем обработку клавиш
        addKeyboardListener();
    };

    // Массив для хранения использованных индексов заданий
    let usedTasks = [];

    // Функция для получения случайного не использованного задания
    function getRandomTask(tasksArray) {
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

    // Функция для случайного перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Функция для проверки ответа
    const checkAnswer = (selectedAnswer, correctAnswer, listItem, cellElement) => {
        cellElement.classList.remove('correct-answer'); // Убираем класс вопроса
        cellElement.classList.remove('incorrect-answer'); // Убираем класс вопроса
        if (selectedAnswer === reverseWord(correctAnswer)) {
            listItem.classList.add('correct'); // Подсвечиваем правильный ответ
            cellElement.classList.remove('question'); // Убираем класс вопроса
            cellElement.classList.add('correct-answer'); // Добавляем класс для галочки
            score += 1; // Увеличиваем счет
            updateScore();
        } else {
            listItem.classList.add('incorrect'); // Подсвечиваем неправильный ответ
            cellElement.classList.remove('question'); // Убираем класс вопроса
            cellElement.classList.add('incorrect-answer'); // Добавляем класс для крестика
            score -= 1; // Увеличиваем счет
            updateScore();
        }

        // Отключаем возможность выбирать другие ответы после выбора
        const allOptions = answerOptions.getElementsByTagName('li');
        for (let option of allOptions) {
            option.onclick = null; // Убираем обработчик
        }
        // Убираем модальное окно через 1 секунду
        setTimeout(() => {
            modalQuestion.style.display = 'none';
        }, 1000);
    };

    // Переменные для кнопки паузы и модального окна
    const pauseModal = document.getElementById('pause-modal');
    const pauseButton = document.getElementById('pause-button');
    const resumeButton = document.getElementById('resume-button');
    const restartButtonPause = document.getElementById('restart-button-pause');
    const settingsButton = document.getElementById('settings-button');
    const levelsButton = document.getElementById('levels-button');

    // Функция для постановки игры на паузу
    function pauseGame() {
        clearInterval(timerInterval); // Останавливаем таймер
        pauseModal.style.display = 'flex'; // Показываем модальное окно
    }

    // Обработчик кнопки паузы
    pauseButton.addEventListener('click', pauseGame);

    // Функция для продолжения игры
    function resumeGame() {
        if (modal.style.display === 'none' || retryModal.style.display === 'none') {
            timerInterval = setInterval(updateTimer, 1000); // Перезапускаем таймер с текущего значения
        }
        pauseModal.style.display = 'none'; // Скрываем модальное окно
    }

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

    const retryModal = document.getElementById('retry-modal');
    const restartButton = document.getElementById('restart-button');
    const menuButton = document.getElementById('menu-button');
    const currentScoreElement = document.getElementById('current-score');
    const currentScoreBadElement = document.getElementById('current-score-bad');
    const currentTimeElement = document.getElementById('current-time');
    const currentTimeBadElement = document.getElementById('current-time-bad');

    // Функция показа модального окна для неправильного ответа или истечения времени
    const showRetryModal = () => {
        currentScoreBadElement.textContent = score; // Отображаем текущий счет
        currentTimeBadElement.textContent = timeLeft;
        retryModal.style.display = 'flex'; // Показываем модальное окно
        clearInterval(timerInterval); // Останавливаем таймер
    }
    // Обработчики кнопок модального окна
    restartButton.addEventListener('click', () => {
        location.reload(); // Перезагрузка страницы для начала игры заново
    });

    menuButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    // Показ модального окна
    const showModal = () => {
        currentScoreElement.textContent = score; // Отображаем текущий счет
        currentTimeElement.textContent = timeLeft; // Отображаем текущий счет
        modal.style.display = 'flex';
        clearInterval(timerInterval); // Останавливаем таймер
    };

    // Обработчик для кнопки "Перейти к уровням"
    nextLevelButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html';
    });

    // Устанавливаем начальную позицию аватара
    avatarElement.style.left = avatarPosition.x * 50 + 'px';
    avatarElement.style.top = avatarPosition.y * 50 + 'px';

    resetTimer();
});
