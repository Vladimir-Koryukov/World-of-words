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
        ['path', 'wall', 'wall', 'path', 'path', 'path', 'wall', 'path', 'path', 'path', 'wall', 'path', 'path', 'path', 'path'],
        ['path', 'wall', 'wall', 'path', 'wall', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'path'],
        ['question', 'path', 'path', 'question', 'path', 'path', 'wall', 'path', 'wall', 'question', 'path', 'path', 'wall', 'wall', 'path'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'path'],
        ['path', 'question', 'path', 'path', 'wall', 'path', 'path', 'path', 'wall', 'path', 'wall', 'path', 'path', 'path', 'question'],
        ['wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall'],
        ['path', 'path', 'wall', 'question', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'wall', 'wall', 'wall', 'path'],
        ['path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'path', 'question', 'path', 'path'],
        ['question', 'path', 'path', 'path', 'wall', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'path', 'wall', 'wall'],
        ['path', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'wall'],
        ['path', 'wall', 'path', 'question', 'wall', 'path', 'wall', 'path', 'path', 'path', 'path', 'path', 'question', 'path', 'path'],
        ['path', 'wall', 'path', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'path'],
        ['path', 'wall', 'path', 'path', 'wall', 'path', 'wall', 'path', 'path', 'wall', 'question', 'path', 'path', 'path', 'path'],
        ['path', 'wall', 'wall', 'wall', 'wall', 'path', 'wall', 'wall', 'path', 'wall', 'path', 'wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'path', 'path', 'question', 'wall', 'path', 'path', 'wall', 'path', 'path', 'path', 'question', 'path']
    ];

    const questions = [
        {
            question: "Найдите в тексте слово описывающее хрупкие керамические изделия (чашки, блюдца, чайник и тд.): 'Человек соприкасается с искусством каждый день не только в музеях. С самого рождения и на протяжении всей жизни люди погружены в волшебный и таинственный мир искусства. Здания, интерьер квартиры, одежда и ювелирные украшения – всё это может быть произведениями искусства. Но может и не быть. Однако, не каждую картину, статую, песню и каждый фарфоровый сервиз считают шедеврами.'",
            answers: ["Глагол", "Существительное", "Прилагательное"],
            correctAnswer: "Фарфоровый"
        },
        {
            question: "Найдите в тексте слово, обозначающее место, где что-либо рождается, появляется, начинает своё распространение: 'Книга – великий хранитель и двигатель человеческой культуры. Книгу ничем нельзя заменить. Издавна ее называют источником мудрости. И действительно, сложный философский текст можно передать только через книгу. Читатель сам владеет текстом. Он может читать быстрее или медленнее, поверхностно проглядывать его или внимательно перечитывать, возвращаясь к уже прочитанному месту, или заглянуть в конец книги. Читатель, в отличие от слушателя или зрителя, абсолютно свободен.' ",
            answers: ["Глагол", "Местоимение", "Числительное"],
            correctAnswer: "Источником"
        },
        {
            question: "Найдите в тексте слово, называющее бьющиеся о берег волны: 'В умении любоваться природой заключается один из секретов постижения красоты. Если человека привести на берег моря, показать ему катящиеся валы прибоя, а через минуту увести от моря подальше, то это одно. Если же человек просидит на берегу несколько часов или проживет несколько дней, то это совсем другое.'",
            answers: ["Прилагательное", "Глагол", "Частица"],
            correctAnswer: "Прибоя"
        },
        {
            question: "Найдите в тексте слово, являющееся фамилией известного писателя 20 века: 'Но память человека со временем ослабевает, из нее по крупицам уходит сначала второстепенное, менее значимое и яркое, а затем и существенное. К тому же все меньше становится ветеранов, тех, кто прошел войну и мог бы рассказать о ней. Если в документах и произведениях искусства не будут отражены самопожертвование и стойкость народа, то горький опыт прошлых лет забудется. А этого нельзя допустить' ",
            answers: ["Глагол", "Местоимение", "Существительное"],
            correctAnswer: "Горький"
        },
        {
            question: "Найдите в тексте слово, включающее в себя три корня: 'Иметь семью и детей так же необходимо и естественно, как необходимо и естественно трудиться. Семья издавна скреплялась нравственным авторитетом отца, который традиционно считался главой. Отца дети уважали и слушались. Он занимался сельхозработами, строительством, заготовкой леса и дров. Всю тяжесть крестьянского труда с ним разделяли взрослые сыновья.'",
            answers: ["бежать", "хорошо", "красивый"],
            correctAnswer: "Сельхозработами"
        },
        {
            question: "Для какой части речи правдиво следующее определение '- служебное слово, выражающее отношение существительного или местоимения к другим словам в предложении'",
            answers: ["Местоимение", "Существительное", "Прилагательное"],
            correctAnswer: "Предлог"
        },
        {
            question: "Какая часть речи служит для связи слов в предложении и не имеет самостоятельного значения?",
            answers: ["Глагол", "Частица", "Междометие"],
            correctAnswer: "Частица"
        },
        {
            question: "Для какой части речи правдиво следующее определение '- служебная часть речи, с помощью которой связывают между собой простые предложения в составе сложного или однородные члены предложения.",
            answers: ["Местопримечание", "Предлог", "Наречие"],
            correctAnswer: "Союз"
        },
        {
            question: "Найдите в тексте самое длинное слово: 'На улице было тихо, только изредка слышался шум машин. Я решил выйти на прогулку и вдохнуть свежего воздуха. Мороз приятно щипал щеки, напоминая о скором наступлении зимы.'",
            answers: ["Глагол несовершенного вида", "Глагол совершенного вида", "Числительное"],
            correctAnswer: "Наступлении"
        },
        {
            question: "Найдите глагол во 2 предложении текста: 'Кошка свернулась клубком на мягком пледе у камина. Её шерсть блестела в свете огня, создавая ощущение тепла и уюта. За окном шёл мелкий дождь, но дома было так приятно и спокойно.'",
            answers: ["Числительное", "Местоимение", "Глагол"],
            correctAnswer: "блестела"
        },
        {
            question: "Найдите в тексте деепричастие: 'Река лениво текла между зелёных берегов. Солнце отражалось в воде, создавая золотистые блики. Вдалеке слышались голоса детей, играющих в прятки.'",
            answers: ["Междометие", "Прилагательное", "Наречие"],
            correctAnswer: "создавая"
        },
        {
            question: "Найдите в тексте самое длинное слово: 'На кухне стоял аромат свежеиспечённого хлеба. Я достал из духовки горячую буханку и осторожно положил её на стол. Тёплый запах сразу наполнил весь дом, вызывая ощущение голода.' Из сколько букв оно состоит?",
            answers: ["Существительное", "Числительное", "Местоимение"],
            correctAnswer: "16"
        },
        {
            question: "Сколько слов из 5 букв в тексте: 'В парке летали яркие бабочки, порхающие между цветущих кустов. Дети смеялись и запускали воздушных змеев. В это время я сидел на лавочке и наслаждался моментом спокойствия.'",
            answers: ["Прилагательное", "Глагол", "Частица"],
            correctAnswer: "6"
        },
        {
            question: "Кто нарушал тишину ночи в этом тексте: 'Вечер принес с собой прохладу и ясное небо, усыпанное звёздами. Где-то вдали кричала сова, нарушая тишину ночи. Мне казалось, что я могу рассмотреть каждую звезду на этом бесконечном небосклоне.'",
            answers: ["Глагол", "Числительное", "Местоимение"],
            correctAnswer: "Сова"
        },
        {
            question: "Найдите причастие в 3 предложении: 'Песок приятно хрустел под ногами, когда я шёл вдоль берега моря. Волны мягко накатывались на берег, шепча свои тайны. Вдали виднелся корабль, медленно исчезающий за горизонтом.'",
            answers: ["Глагол", "Наречие", "Частица"],
            correctAnswer: "исчезающий"
        },
        {
            question: "Какая часть речи у 1 слова в этом тексте: 'Утром лес выглядел как в сказке: лёгкий туман окутывал деревья. Сквозь густую листву пробивались солнечные лучи, рисуя причудливые узоры на земле. Где-то неподалёку раздавалось пение птиц, придающее лесу ещё больше жизни.'",
            answers: ["Глагол", "Наречие", "Прилагательное"],
            correctAnswer: "Существительное"
        },
        {
            question: "Что является эпитетом в 1 предложении этого текста: 'Я открыл книгу и сразу погрузился в её удивительный мир. С каждой страницей история становилась всё интереснее и захватывала меня полностью. Я не заметил, как за окном стемнело, а время словно остановилось.'",
            answers: ["Глагол", "Существительное", "Местоимение"],
            correctAnswer: "удивительный"
        }
    ];
    
    let score = 0;
    let timeLeft = 300;
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
    const treasurePosition = { x: 14, y: 14 }; // Позиция сокровища

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
            avatarElement.style.left = avatarPosition.x * 40 + 'px';
            avatarElement.style.top = avatarPosition.y * 40 + 'px';
        }

        if (maze[newY][newX] === 'question') {
            const cellIndex = (newY) * maze[0].length + newX + 2; // Индекс клетки в DOM
            const cellElement = mazeContainer.children[cellIndex]; // Получаем клетку
            showModalQuestion(cellElement);
        }

        // Проверяем достижение клетки с сокровищем
        if (avatarPosition.x === treasurePosition.x && avatarPosition.y === treasurePosition.y) {
            if (score >= 15){
                showModal();
                updateProgress(23, score);
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

        // Очистим поле ввода и сообщение
        const userAnswerInput = document.getElementById('user-answer');
        const feedbackMessage = document.getElementById('feedback-message');
        userAnswerInput.value = '';
        feedbackMessage.textContent = '';

        // Функция проверки ответа
        const handleCheckAnswer = () => {
            const userAnswer = userAnswerInput.value.trim();

            // Проверяем, если пользователь ничего не ввёл
            if (userAnswer === '') {
                feedbackMessage.textContent = 'Введите ваш ответ!';
                feedbackMessage.style.color = '#dc3545'; // Красный текст
                return;
            }

            // Проверяем правильность ответа
            checkAnswer(userAnswer, question.correctAnswer, cellElement);
        };

        // Добавляем обработчики событий
        const checkAnswerBtn = document.getElementById('check-answer-btn');
        checkAnswerBtn.onclick = handleCheckAnswer;

        userAnswerInput.onkeypress = (event) => {
            if (event.key === 'Enter') {
                handleCheckAnswer();
            }
        };

        // Показываем модальное окно
        modalQuestion.style.display = 'flex';
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
    const checkAnswer = (userAnswer, correctAnswer, cellElement) => {
        // Сбрасываем классы ячейки
        cellElement.classList.remove('correct-answer', 'incorrect-answer');
    
        const feedbackMessage = document.getElementById('feedback-message');
    
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            // Если ответ правильный
            cellElement.classList.remove('question'); // Убираем класс вопроса
            cellElement.classList.add('correct-answer'); // Добавляем класс для галочки
            feedbackMessage.textContent = 'Верно!';
            feedbackMessage.style.color = '#28a745'; // Зелёный текст
            score += 1; // Увеличиваем счет
        } else {
            // Если ответ неправильный
            cellElement.classList.remove('question'); // Убираем класс вопроса
            cellElement.classList.add('incorrect-answer'); // Добавляем класс для крестика
            feedbackMessage.textContent = `Неверно! Правильный ответ: ${correctAnswer}`;
            feedbackMessage.style.color = '#dc3545'; // Красный текст
            score -= 1; // Уменьшаем счет
        }
    
        updateScore();
    
        // Закрываем модальное окно через 1 секунду
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
    avatarElement.style.left = avatarPosition.x * 40 + 'px';
    avatarElement.style.top = avatarPosition.y * 40 + 'px';

    resetTimer();
});
