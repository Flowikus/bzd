/**
 * Скрипт для SPA-сайта по БЖД программистов
 * Реализует навигацию по секциям, управление стрелками и интерактивный тест.
 */

// Порядок следования страниц-секций на сайте
const sections = ['home', 'info', 'facts', 'rules', 'test'];
let currentSectionIndex = 0;

// Элементы управления навигацией
const navLinks = document.querySelectorAll('.nav-link');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// --- БЛОК 1: SPA НАВИГАЦИЯ И ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ---

/**
 * Переключает активную секцию сайта по её индексу в массиве
 * @param {number} index - Индекс целевой секции
 */
function navigateToSection(index) {
    if (index < 0 || index >= sections.length) return;
    
    currentSectionIndex = index;
    const targetId = sections[currentSectionIndex];

    // Переключаем видимость секций (display: block/none через CSS класс active)
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');

    // Обновляем визуальный статус ссылок в верхнем меню навигации
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
        }
    });

    // Управляем прозрачностью стрелок на краях сайта (первая и последняя страницы)
    prevBtn.style.opacity = currentSectionIndex === 0 ? '0.3' : '1';
    prevBtn.style.cursor = currentSectionIndex === 0 ? 'default' : 'pointer';
    
    nextBtn.style.opacity = currentSectionIndex === sections.length - 1 ? '0.3' : '1';
    nextBtn.style.cursor = currentSectionIndex === sections.length - 1 ? 'default' : 'pointer';

    // Комфортный плавный скролл наверх при переключении вкладки
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Привязка обработчиков клика к ссылкам в верхнем меню
navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection(idx);
    });
});

// Навигация с помощью нижних стрелочек управления
prevBtn.addEventListener('click', () => {
    if (currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSectionIndex < sections.length - 1) {
        navigateToSection(currentSectionIndex + 1);
    }
});


// --- БЛОК 2: ИНТЕРАКТИВНЫЙ ТЕСТ ПО БЖД (10 ВОПРОСОВ) ---

// Расширенная база данных вопросов, вариантов ответов и медицинских обоснований
const quizData = [
    {
        question: "На каком расстоянии от глаз должен находиться монитор компьютера по стандартам эргономики?",
        options: ["20-30 см", "50-70 см", "100-120 см"],
        correct: 1,
        explanation: "Оптимальное расстояние — 50-70 см (длина вытянутой руки). Ближнее расположение перенапрягает мышцы хрусталика, а дальнее заставляет сутулиться и всматриваться."
    },
    {
        question: "Какая частота моргания считается нормальной, и как она меняется при чтении кода с экрана?",
        options: ["В норме 10 раз/мин, падает до 8", "В норме 20 раз/мин, падает до 4-6", "В норме 5 раз/мин, возрастает до 15"],
        correct: 1,
        explanation: "Из-за высокой концентрации и светящегося экрана частота моргания падает в 3-4 раза. Это приводит к быстрому пересыханию слезной пленки и Компьютерному зрительному синдрому."
    },
    {
        question: "Что из перечисленного является главной причиной развития синдрома запястного канала (туннельного синдрома)?",
        options: ["Длительный фокус на мелких шрифтах", "Хронический изгиб кисти и монотонная работа мышью", "Слишком высокая температура в помещении"],
        correct: 1,
        explanation: "Постоянное неестественное положение запястья пережимает срединный нерв в костном канале, вызывая онемение пальцев и боли."
    },
    {
        question: "Как расшифровывается популярное офтальмологическое правило профилактики '20-20-20'?",
        options: ["Каждые 20 мин на 20 сек смотреть вдаль на 20 футов (6 метров)", "Раз в 20 часов кодить 20 минут в 20-градусном наклоне", "Каждые 20 дней делать перерыв на 20 часов от 20 гаджетов"],
        correct: 0,
        explanation: "Каждые 20 минут переводите взгляд на 20 секунд на объект в 6 метрах (20 футах) от вас. Это полностью расслабляет цилиарную мышцу глаза."
    },
    {
        question: "Каким должен быть идеальный угол сгибания в локтевых и коленных суставах при сидении за столом?",
        options: ["Около 45 градусов (острый угол)", "Около 90-100 градусов (прямой угол)", "Около 150 градусов (тупой угол)"],
        correct: 1,
        explanation: "Правило прямых углов минимизирует нагрузку на суставы, предотвращает пережатие вен под коленями и сохраняет нормальное кровообращение."
    },
    {
        question: "Где должен располагаться верхний край или верхняя треть монитора?",
        options: ["Строго на уровне линии глаз или чуть ниже", "На 20-30 см выше уровня глаз", "На уровне подбородка"],
        correct: 0,
        explanation: "Экран должен стоять так, чтобы вы смотрели немного сверху вниз. Это снижает нагрузку на шею и позволяет векам прикрывать большую часть роговицы, снижая испарение слезы."
    },
    {
        question: "Полезно ли постоянно использовать тёмную тему (Dark Mode) в коде в течение всего дня?",
        options: ["Да, она всегда полезнее для глаз, чем светлая", "Нет, при ярком дневном свете она может увеличивать нагрузку на зрачок", "Темная тема никак не влияет на утомляемость глаз"],
        correct: 1,
        explanation: "При ярком свете темная тема заставляет зрачки расширяться, что слегка размывает текст и утомляет глаза. Ее нужно включать в условиях вечернего или слабого освещения."
    },
    {
        question: "Какое опасное застойное явление вызывает многочасовое статичное сидение без перерывов?",
        options: ["Нарушение оттока лимфы в области черепа", "Застой крови в венах малого таза и нижних конечностей", "Деградация мышечных волокон бицепса"],
        correct: 1,
        explanation: "Без сокращения икроножных и бедренных мышц кровь не может эффективно подниматься к сердцу, что провоцирует варикоз и другие застойные патологии."
    },
    {
        question: "Каковы оптимальные параметры микроклимата для рабочего места программиста?",
        options: ["Температура 15-18°C, влажность 20%", "Температура 22-24°C, влажность 40-60%", "Температура 28-30°C, влажность 80%"],
        correct: 1,
        explanation: "Это оптимальная зона комфорта для умственной деятельности. Более низкая влажность сушит слизистые оболочки глаз и дыхательных путей."
    },
    {
        question: "Какая разминка для шеи является наиболее безопасной во время микроперерывов?",
        options: ["Быстрые круговые вращения головой с максимальной амплитудой", "Плавные наклоны головы к плечам и легкие кивательные движения", "Интенсивные запрокидывания головы назад до упора"],
        correct: 1,
        explanation: "Резкие круговые вращения и сильные запрокидывания шеи назад могут травмировать позвонки и пережать позвоночные артерии. Движения должны быть только плавными."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswerIndices = []; // Массив для отслеживания номеров вопросов, где допущены ошибки

/**
 * Обновляет состояние верхнего индикатора прогресса теста
 */
function updateProgressBar() {
    const progressFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    
    // Рассчитываем процент пройденного пути
    const percent = (currentQuestionIndex / quizData.length) * 100;
    
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${quizData.length}`;
}

/**
 * Рендерит текущий вопрос и варианты ответов на экран
 */
function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    updateProgressBar();
    
    const questionEl = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const feedbackBox = document.getElementById('feedback-box');
    
    // Скрываем панель разбора предыдущего ответа
    feedbackBox.classList.add('hidden');
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuiz.question;
    optionsContainer.innerHTML = '';
    
    // Генерируем кнопки для вариантов ответов
    currentQuiz.options.forEach((option, idx) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.id = `opt-${idx}`;
        button.disabled = false;
        button.addEventListener('click', () => checkAnswer(idx));
        optionsContainer.appendChild(button);
    });
}

/**
 * Проверяет выбранный пользователем ответ, подсвечивает кнопки и выводит разбор
 * @param {number} selectedIndex - Индекс выбранного пользователем ответа
 */
function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackStatus = document.getElementById('feedback-status');
    const feedbackText = document.getElementById('feedback-text');
    const buttons = document.querySelectorAll('.option-btn');
    
    // Запрещаем повторные клики по кнопкам ответов в текущем вопросе
    buttons.forEach(btn => btn.disabled = true);
    
    // Всегда мягко подсвечиваем зеленым цветом правильный ответ
    const correctBtn = document.getElementById(`opt-${currentQuiz.correct}`);
    correctBtn.style.backgroundColor = '#d4edda';
    correctBtn.style.borderColor = '#c3e6cb';
    correctBtn.style.color = '#155724';
    correctBtn.style.fontWeight = 'bold';
    
    let isCorrect = selectedIndex === currentQuiz.correct;
    
    if (isCorrect) {
        score++;
        feedbackStatus.textContent = "✔ Правильно!";
        feedbackStatus.style.color = "#155724";
    } else {
        // Если допущена ошибка, подсвечиваем выбранный вариант красным
        const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
        selectedBtn.style.backgroundColor = '#f8d7da';
        selectedBtn.style.borderColor = '#f5c6cb';
        selectedBtn.style.color = '#721c24';
        
        feedbackStatus.textContent = "❌ Неправильно";
        feedbackStatus.style.color = "#721c24";
        
        // Запоминаем индекс ошибочного вопроса для формирования итогового отчета
        wrongAnswerIndices.push(currentQuestionIndex);
    }
    
    // Загружаем научно-медицинский разбор из базы данных
    feedbackText.textContent = currentQuiz.explanation;
    feedbackBox.classList.remove('hidden');
}

/**
 * Переходит к рендерингу следующего вопроса
 */
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

/**
 * Скрывает интерфейс вопросов и выводит итоговые результаты с персональным листом советов
 */
function showResults() {
    document.getElementById('question-box').classList.add('hidden');
    document.querySelector('.quiz-progress-wrapper').classList.add('hidden');
    
    const resultBox = document.getElementById('result-box');
    const scoreBadge = document.getElementById('score-badge-val');
    const resultText = document.getElementById('result-text');
    const recList = document.getElementById('recommendations-list');
    
    resultBox.classList.remove('hidden');
    scoreBadge.textContent = `${score} / ${quizData.length}`;
    
    // Очищаем старый список рекомендаций, если тест запускается повторно
    recList.innerHTML = '';
    
    // Кастомизация итогового вердикта по баллам
    if (score === quizData.length) {
        resultText.textContent = "Идеальный результат! Вы эталонный эргономичный программист. Ваши знания БЖД защищают ваше здоровье на все 100%.";
        const li = document.createElement('li');
        li.textContent = "Отличная работа! Продолжайте в том же духе и делитесь правилами эргономики с коллегами по команде.";
        recList.appendChild(li);
    } else if (score >= 7) {
        resultText.textContent = "Хороший результат! Вы отлично ориентируетесь в правилах охраны труда, но допустили несколько досадных промахов.";
        generateRecommendations(recList);
    } else {
        resultText.textContent = "Вам стоит немедленно пересмотреть свои компьютерные привычки! Наблюдается высокий риск ускоренного развития профессиональных заболеваний.";
        generateRecommendations(recList);
    }
}

/**
 * Генерирует точечные медицинские рекомендации на основе допущенных ошибок
 * @param {HTMLElement} container - UL элемент списка рекомендаций
 */
function generateRecommendations(container) {
    // Карта соответствия: Индекс проваленного вопроса -> Текст точечного совета
    const recommendationsMap = {
        0: "Обратите внимание на положение монитора: отодвиньте его дальше, примерно на длину вытянутой руки (50-70 см).",
        1: "Приобретите качественные увлажняющие капли для глаз или настольный увлажнитель воздуха, чтобы нейтрализовать синдром 'сухого глаза'.",
        2: "Начните использовать эргономический коврик с гелевым валиком под запястье или вертикальную мышь для защиты срединного нерва.",
        3: "Поставьте таймер на смартфоне на каждые 20 минут, чтобы разгружать зрение по офтальмологическому правилу '20-20-20'.",
        4: "Отрегулируйте высоту газлифта вашего кресла так, чтобы стопы ровно стояли на полу, а углы в суставах составляли 90-100 градусов.",
        5: "Опустите монитор чуть ниже: линия вашего взгляда должна падать на экран слегка сверху вниз, разгружая мышцы шеи.",
        6: "Не кодите с темной темой (Dark Mode) в солнечный день напротив открытого окна — всегда подстраивайте тему интерфейса под освещение.",
        7: "Каждые 60 минут прерывайте сессию написания кода и вставайте со стула, чтобы ликвидировать опасный застой крови в глубоких венах.",
        8: "Регулярно проветривайте рабочую комнату и следите, чтобы относительная влажность воздуха не падала ниже нормативных 40%.",
        9: "Делайте разминку шейного отдела исключительно плавно. Навсегда откажитесь от резких круговых вращений головы и сильных запрокидываний."
    };

    wrongAnswerIndices.forEach(idx => {
        if (recommendationsMap[idx]) {
            const li = document.createElement('li');
            li.textContent = recommendationsMap[idx];
            container.appendChild(li);
        }
    });
}

/**
 * Сбрасывает состояние теста и запускает его с первого вопроса
 */
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    wrongAnswerIndices = [];
    document.getElementById('result-box').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    document.querySelector('.quiz-progress-wrapper').classList.remove('hidden');
    loadQuestion();
}


// --- БЛОК 3: ИНИЦИАЛИЗАЦИЯ ПРИ ЗАПУСКЕ САЙТА ---

// Навигация с клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (currentSectionIndex < sections.length - 1) {
            navigateToSection(currentSectionIndex + 1);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (currentSectionIndex > 0) {
            navigateToSection(currentSectionIndex - 1);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Переводим пользователя на стартовую страницу (Главная)
    navigateToSection(0);
    // Готовим к запуску интерактивный тест
    loadQuestion();
});
