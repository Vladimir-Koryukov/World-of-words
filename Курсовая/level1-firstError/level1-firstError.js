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

    // Список заданий
    const tasks = [
        {
            word: 'Овца',
            pair: 'Ягненок',
            options: ['Теленок', 'Индюшонок', 'Поросенок', 'Корова', 'Индюк', 'Кабан', 'Петух', 'Собака']
          },
          {
            word: 'Жираф',
            pair: 'Теленок',
            options: ['Козленок', 'Бегемот', 'Ягненок', 'Жирафик', 'Лев', 'Зебра', 'Жеребенок', 'Носорог']
          },
          {
            word: 'Мода',
            pair: 'Сода',
            options: ['Пирог', 'Покрывало', 'Сонет', 'Барабан', 'Выдра', 'Трава', 'Школьник', 'Урок']
          },
          {
            word: 'Банк',
            pair: 'Танк',
            options: ['Язык', 'Бигуди', 'Штопор', 'Крыша', 'Ведро', 'Мотив', 'Перо', 'Шляпа']
          },
          {
            word: 'Фельдшер',
            pair: 'Фельдшерица',
            options: ['Повар', 'Медсестра', 'Врач', 'Банкир', 'Строитель', 'Писатель', 'Шляпник', 'Инженер']
          },
          {
            word: 'Шлем',
            pair: 'Перчатки',
            options: ['Молоко', 'Шкаф', 'Планшет', 'Телефон', 'Картинка', 'Тетрадь', 'Молния', 'Нога']
          },
          {
            word: 'Мышь',
            pair: 'Клавиатура',
            options: ['Молоко', 'Пенал', 'Газета', 'Театр', 'Шкаф', 'Тетрадь', 'Автомобиль', 'Клевета']
          },
          {
            word: 'Театр',
            pair: 'Спектакль',
            options: ['Газета', 'Стол', 'Туфли', 'Картинка', 'Ручка', 'Телефон', 'Шкаф', 'Край']
          },
          {
            word: 'Критик',
            pair: 'Критикесса',
            options: ['Поэт', 'Писатель', 'Сантехник', 'Клоун', 'Стоматолог', 'Секретарь', 'Рабочий', 'Переводчик']
          },
          {
            word: 'Великобритания',
            pair: 'Чай',
            options: ['Шапка', 'Холодильник', 'Книга', 'Матрас', 'Дверь', 'Выход', 'Печаль', 'Пуля']
          },
          {
            word: 'Америка',
            pair: 'Статуя',
            options: ['Пистолет', 'Небо', 'Жизнь', 'Поле', 'Цветок', 'Сцена', 'Премьера', 'Бочка']
          },
          {
            word: 'Даша',
            pair: 'Путешественница',
            options: ['НЛО', 'Борщ', 'Природа', 'Любовь', 'Кремль', 'Арбуз', 'Цыпленок', 'Чашка']
          },
          {
            word: 'Пирог',
            pair: 'Яблоки',
            options: ['Праздник', 'Форма', 'Пицца', 'Микроволновка', 'Дверь', 'Выход', 'Заяц', 'Пуля']
          }
    ];

    const imageTasks = [
        {
            image: '../assets/images/dog1.png',  // Путь к картинке
            correctAnswer: 'Собака',
            options: ['Кошка', 'Мышь', 'Попугай', 'Лев', 'Тигр', 'Змея', 'Птица', 'Черепаха']
        },
        {
            image: '../assets/images/car.png',  // Путь к картинке
            correctAnswer: 'Автомобиль',
            options: ['Мотоцикл', 'Поезд', 'Самолёт', 'Корабль', 'Велосипед', 'Лодка', 'Трамвай', 'Автобус']
        },
        {
            image: '../assets/images/guitar.png',  // Путь к картинке
            correctAnswer: 'Гитара',
            options: ['Барабан', 'Флейта', 'Тарелки', 'Гармонь', 'Скрипка', 'Кларнет', 'Пианино', 'Балалайка']
        },
        {
            image: '../assets/images/sun.png',  // Путь к картинке
            correctAnswer: 'Солнце',
            options: ['Луна', 'Метеорит', 'Облако', 'Гроза', 'Дождь', 'Молния', 'Ветер', 'Туман']
        },
        {
            image: '../assets/images/mountain.png',  // Путь к картинке
            correctAnswer: 'Гора',
            options: ['Река', 'Лес', 'Долина', 'Озеро', 'Пещера', 'Поле', 'Пустыня', 'Плато']
        },
        {
            image: '../assets/images/book.png',  // Путь к картинке
            correctAnswer: 'Книга',
            options: ['Журнал', 'Газета', 'Тетрадь', 'Ручка', 'Блокнот', 'Дневник', 'Листок', 'Письмо']
        },
        {
            image: '../assets/images/milk.png',  // Путь к картинке
            correctAnswer: 'Молоко',
            options: ['Сок', 'Кофе', 'Чай', 'Вода', 'Компот', 'Какао', 'Пиво', 'Напиток']
        },
        {
            image: '../assets/images/pizza.png',  // Путь к картинке
            correctAnswer: 'Пицца',
            options: ['Суши', 'Бургер', 'Гамбургер', 'Шаурма', 'Хот-дог', 'Салат', 'Торт', 'Роллы']
        },
        {
            image: '../assets/images/leaf.png',  // Путь к картинке
            correctAnswer: 'Лист',
            options: ['Цветок', 'Плод', 'Корень', 'Стебель', 'Семена', 'Корзина', 'Растение', 'Дерево']
        },
        {
            image: '../assets/images/tractor.png',  // Путь к картинке
            correctAnswer: 'Трактор',
            options: ['Автомобиль', 'Мотоцикл', 'Самосвал', 'Грузовик', 'Минивэн', 'Фургон', 'Скутер', 'Карета']
        }
    ];

    // Массив для хранения использованных индексов заданий
    let usedTasks = [];
    const allQuestions = tasks.concat(imageTasks);

    // Переменная для хранения количества очков
    let score = 0;

    // Функция для обновления отображения очков
    function updateScore() {
        document.getElementById('score-value').textContent = score;
    }

    // Таймер
    let timeLeft = 0;
    const timerElement = document.getElementById('time-left');
    let timerInterval;

    // Обработка таймера
    function updateTimer() {
        timeLeft += 1;
        timerElement.textContent = timeLeft;
    }

    // Функция для сброса таймера на 30 секунд
    function resetTimer() {
        clearInterval(timerInterval);  // Останавливаем старый таймер
        timerInterval = setInterval(updateTimer, 1000);  // Запускаем новый таймер
    }

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

    // Отображение задания
    function displayTask(task) {
        const wordBank = document.getElementById('word-bank');
        wordBank.innerHTML = '';  // Очищаем старые варианты

        let shuffledOptions = shuffle([...task.options]);

        if (task.word){
            document.getElementById('task-word').textContent = 'Подберите пару к слову ' + task.word;
            shuffledOptions.push(task.pair);
        }        
        else if (task.image){
            const taskWordElement = document.getElementById('task-word');
            // Очистить task-word от текста (если был) перед добавлением изображения
            taskWordElement.textContent = 'Подберите пару к картинке';

            
            // Создаем элемент img и добавляем его в task-word
            const img = document.createElement('img');
            img.src = task.image; // Путь к изображению
            img.alt = 'Image Task'; // Атрибут alt для доступности
            img.style.maxWidth = '80%'; // Ограничиваем размер изображения, если нужно
            img.style.maxHeight = '200px'; // Ограничиваем размер изображения, если нужно
            taskWordElement.appendChild(img);
            shuffledOptions.push(task.correctAnswer);
        }    

        shuffledOptions = shuffle(shuffledOptions);

        shuffledOptions.forEach(word => {
            let wordBlock = document.createElement('div');
            wordBlock.classList.add('word-block');
            wordBlock.textContent = word;
            if (task.word){
                wordBlock.addEventListener('click', () => handleWordClick(word, wordBlock, task.pair));
            }            
            else if (task.image){
                wordBlock.addEventListener('click', () => handleWordClick(word, wordBlock, task.correctAnswer));
            }  
            wordBank.appendChild(wordBlock);
        });
        taskWordElement.textContent = '';
    }

    // Функция для случайного перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Обработка неправильного ответа
    function handleWordClick(word, wordBlock, correctPair) {
        if (word === correctPair) {
            wordBlock.classList.add('correct');
            score += 1; // Увеличиваем счет
            updateScore();
            setTimeout(nextTask, 500); // Переход к следующему заданию
        } else {
            updateProgress(0, score);
            wordBlock.classList.add('incorrect');
            clearInterval(timerInterval); // Останавливаем таймер
            setTimeout(showRetryModal, 500); // Показываем модальное окно
        }
    }

        // Переход к следующему заданию
    function nextTask() {
        let task;
        task = getRandomTask(allQuestions);
        displayTask(task);
    }

    const retryModal = document.getElementById('retry-modal');
    const currentScoreElement = document.getElementById('current-score');
    const currentTimeElement = document.getElementById('current-time');
    const restartButton = document.getElementById('restart-button');
    const menuButton = document.getElementById('menu-button');

    // Функция показа модального окна для неправильного ответа или истечения времени
    function showRetryModal() {
        currentScoreElement.textContent = score; // Отображаем текущий счет
        currentTimeElement.textContent = timeLeft; // Отображаем текущий счет
        retryModal.style.display = 'flex'; // Показываем модальное окно
    }

    // Обработчики кнопок модального окна
    restartButton.addEventListener('click', () => {
        location.reload(); // Перезагрузка страницы для начала игры заново
    });

    menuButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    // Переменные для кнопки паузы и модального окна
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
        if (retryModal.style.display !== 'flex') {
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

    menuButton.addEventListener('click', () => {
        window.location.href = '../levels/levels.html'; // Переход на страницу уровней
    });

    // Запуск таймера сразу при загрузке страницы
    resetTimer();
    nextTask();
});
