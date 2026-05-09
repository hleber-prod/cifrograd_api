import { useEffect, useMemo, useState } from "react";
import homeIcon from "./assets/sidebar-icons/home.png";
import profileIcon from "./assets/sidebar-icons/profile.png";
import leaderboardIcon from "./assets/sidebar-icons/leader-bord.png";
import achievementsIcon from "./assets/sidebar-icons/achievment.png";
import shopIcon from "./assets/sidebar-icons/shop.png";
import tasksIcon from "./assets/sidebar-icons/tasks.png";
import adminIcon from "./assets/sidebar-icons/admin.png";
import authBannerImage from "./assets/sidebar-icons/fon.png";
import module1HeroCat from "./assets/module1/module-1-part-1/hero-cat.png";
import module1Comic from "./assets/module1/module-1-part-1/comix.png";
import module1Start from "./assets/module1/module-1-part-1/start.png";
import module1Part2Comic from "./assets/module1/module-1-part-2/comix-2.png";
import module1Part3Comic from "./assets/module1/module-1-part-3/comix3.png";
import module1FrontbarHero from "./assets/module1/frontbar-hero1.png";
import module2StartComic from "./assets/module2/start-comix.png";
import module2FrontbarHero from "./assets/module2/frontbar-hero2.png";
import module2Part1Comic from "./assets/module2/part1/comix.png";
import module2Part2Comic from "./assets/module2/part2/comix2.png";
import module2Part3Comic from "./assets/module2/part3/comix3.png";
import module3StartComic from "./assets/module3/start-comix.png";
import module3FrontbarHero from "./assets/module3/frontbar-hero.png";
import module3Part1Comic from "./assets/module3/part1/comix.png";
import module3Part2Comic from "./assets/module3/part2/comix.png";
import module3Part3Comic from "./assets/module3/part3/comix.png";
import module4StartComic from "./assets/module4/start-comix.png";
import module4FrontbarHero from "./assets/module4/frontbar-hero.png";
import module4Part1Comic from "./assets/module4/part1/comix1.png";
import module4Part2Comic from "./assets/module4/part2/comix2.png";
import module4Part3Comic from "./assets/module4/part3/comix3.png";

const API_URL = import.meta.env.VITE_API_URL || "";
const TOKEN_KEY = "access_token";
const MIN_PASSWORD_LENGTH = 8;
const BRAND_NAME = "ЦифроГрад";
const TASKS_ROUTE = "/tasks";
const SAFETY_MODULE_SLUG = "safe-internet";
const FILE_LAB_MODULE_SLUG = "file-lab";
const SMART_SEARCH_MODULE_SLUG = "smart-search";
const DIGITAL_ETHICS_MODULE_SLUG = "digital-ethics";
const USER_AVATAR_STORAGE_KEY = "user_avatar_map";
const USER_ACHIEVEMENT_DATES_KEY = "user_achievement_dates";
const USER_AVATAR_MODULES = import.meta.glob("./assets/user-icons/*.png", {
  eager: true,
  import: "default",
});
const USER_AVATAR_OPTIONS = Object.entries(USER_AVATAR_MODULES)
  .map(([path, src]) => {
    const fileName = path.split("/").pop()?.replace(".png", "") || "avatar";
    return {
      id: fileName,
      label: fileName.replace(/-/g, " "),
      src,
    };
  })
  .sort((left, right) => left.label.localeCompare(right.label));
const ACHIEVEMENT_IMAGE_MODULES = import.meta.glob("./assets/achievments-logo/*.png", {
  eager: true,
  import: "default",
});
const ACHIEVEMENT_IMAGES = Object.fromEntries(
  Object.entries(ACHIEVEMENT_IMAGE_MODULES).map(([path, src]) => [
    path.split("/").pop()?.replace(".png", "") || "",
    src,
  ]),
);
const MODULE_IMAGE_MODULES = import.meta.glob("./assets/modules/*.png", {
  eager: true,
  import: "default",
});
const MODULE_IMAGES = Object.fromEntries(
  Object.entries(MODULE_IMAGE_MODULES).map(([path, src]) => [
    path.split("/").pop()?.replace(".png", "") || "",
    src,
  ]),
);
const ENHANCED_MODULE_START_IMAGES = {
  [SAFETY_MODULE_SLUG]: module1Start,
  [FILE_LAB_MODULE_SLUG]: module2StartComic,
  [SMART_SEARCH_MODULE_SLUG]: module3StartComic,
  [DIGITAL_ETHICS_MODULE_SLUG]: module4StartComic,
};
const ENHANCED_MODULE_HERO_IMAGES = {
  [SAFETY_MODULE_SLUG]: module1FrontbarHero,
  [FILE_LAB_MODULE_SLUG]: module2FrontbarHero,
  [SMART_SEARCH_MODULE_SLUG]: module3FrontbarHero,
  [DIGITAL_ETHICS_MODULE_SLUG]: module4FrontbarHero,
};
const ACHIEVEMENT_CARD_DEFS = [
  {
    code: "module_1_guard",
    imageKey: "module1",
    accent: "blue",
    title: "Первый дозор",
    description: "Ты завершил первый модуль и стал настоящим помощником цифрового города.",
    rewardPoints: 100,
    modulesRequired: 1,
    dateLabel: "12 мая 2024",
  },
  {
    code: "module_2_detective",
    imageKey: "module2",
    accent: "green",
    title: "Детектив поиска",
    description: "Ты завершил второй модуль и научился лучше ориентироваться в цифровых заданиях.",
    rewardPoints: 200,
    modulesRequired: 2,
    dateLabel: "15 мая 2024",
  },
  {
    code: "module_3_guardian",
    imageKey: "module3",
    accent: "purple",
    title: "Хранитель уважения",
    description: "Ты завершил третий модуль и стал увереннее в цифровом общении и правилах сети.",
    rewardPoints: 300,
    modulesRequired: 3,
    dateLabel: "18 мая 2024",
  },
  {
    code: "module_4_defender",
    imageKey: "module4",
    accent: "gold",
    title: "Защитник цифрового города",
    description: "Ты прошёл все четыре модуля и стал настоящим защитником ЦифроГрада.",
    rewardPoints: 400,
    modulesRequired: 4,
    dateLabel: "22 мая 2024",
  },
];

const ENHANCED_MODULES = {
  [SAFETY_MODULE_SLUG]: {
    parts: [
      {
        title: "Опасности в интернете",
        id: 1,
        introTitle: "В интернете не всё безопасно!",
        introText: "Иногда в интернете приходят странные сообщения.",
        introBullets: [
          "просят пароль",
          "обещают приз",
          "присылают подозрительные файлы",
        ],
        introFooter: "Важно уметь понять: опасно это или безопасно.",
        warmupTitle: "Нажми на опасный предмет",
        warmupItems: ["🎁 «Вы выиграли приз»", "📩 «Сообщение от учителя»", "📎 «Неизвестный файл»"],
        warmupCorrect: 2,
        warmupSuccess: "Верно! Это может быть опасно.",
        gameTitle: "Опасно или безопасно",
        gameDescription:
          "Посмотри на ситуацию и реши, можно ли ей доверять. За каждое верное решение ты получаешь очко внимательности.",
        gameType: "danger-safe",
        scenarios: [
          {
            sender: "Незнакомец_2024",
            message: "Привет! Ты не против, если я скину тебе файл? Он очень смешной",
            attachment: "funny_video.exe",
            correct: "danger",
            explanation: "Файлы с окончанием .exe могут быть вирусами. Не открывай их от незнакомцев!",
          },
          {
            sender: "Одноклассник Артём",
            message: "Ты домашку по математике сделал? Скинь, пожалуйста",
            correct: "safe",
            explanation: "Это сообщение безопасно. Не нужно его отмечать.",
          },
          {
            sender: "Подруга мамы",
            message: "Привет, я подруга твоей мамы. Она просила передать тебе ссылку, перейди обязательно",
            link: "bonus-priz-now.ru",
            correct: "danger",
            explanation: "Незнакомцы могут притворяться знакомыми. Если мама хочет что-то сказать — она скажет сама.",
          },
          {
            sender: "Друг Петя",
            message: "Идёшь гулять в пять?",
            correct: "safe",
            explanation: "Это сообщение безопасно. Не нужно его отмечать.",
          },
          {
            sender: "Игрок_Pro77",
            message: "Слушай, у меня проблема. Можешь одолжить свой аккаунт на час? Очень надо",
            correct: "danger",
            explanation: "Аккаунт — это твои личные данные. Никому его не давай, даже если очень просят.",
          },
        ],
      },
      {
        id: 2,
        title: "Надёжный пароль",
        introTitle: "Пароль — это ключ от твоего аккаунта",
        introText: "Хороший пароль должен:",
        introBullets: [
          "быть длинным",
          "содержать буквы",
          "содержать цифры",
          "содержать символы",
        ],
        warmupTitle: "Какой пароль лучше?",
        warmupItems: ["12345", "кот", "K0t!"],
        warmupCorrect: 2,
        warmupSuccess: "Правильно! Этот пароль сложнее угадать.",
        warmupFooter: "Переход к игре: Создай самый сильный пароль!",
        warmupButtonLabel: "Собрать пароль",
        gameTitle: "Собери пароль",
        gameDescription:
          "Введи пароль и проверь, насколько он надёжный. Чем лучше правило выполнено, тем сильнее защита аккаунта.",
        gameType: "password-builder",
      },
      {
        id: 3,
        title: "Антивирус и обновления",
        introTitle: "Защити своё устройство",
        introText: "Чтобы устройство было безопасным:",
        introBullets: [
          "устанавливай обновления",
          "используй антивирус",
          "не открывай подозрительные файлы",
        ],
        warmupTitle: "Что нужно сделать?",
        warmupQuestion: "Появилось обновление системы",
        warmupItems: ["Установить", "Удалить", "Игнорировать"],
        warmupCorrect: 0,
        warmupSuccess: "Верно! Обновления делают устройство безопаснее.",
        warmupFooter: "Переход к игре: Останови угрозы и защити компьютер!",
        warmupButtonLabel: "Начать защиту",
        gameTitle: "Защити компьютер",
        gameDescription:
          "Перетащи файлы в правильный ящик и реши, какие можно открыть, а какие лучше проверить.",
        gameType: "computer-defense",
        scenarios: [
          {
            name: "урок_5_математика.pdf",
            icon: "📄",
            target: "safe",
            explanation: "Документы и картинки обычно безопасны. Но если файл пришёл от незнакомца — лучше проверить антивирусом.",
          },
          {
            name: "фото_лето.jpg",
            icon: "🖼️",
            target: "safe",
            explanation: "Документы и картинки обычно безопасны. Но если файл пришёл от незнакомца — лучше проверить антивирусом.",
          },
          {
            name: "игра_бесплатно.exe",
            icon: "⚙️",
            target: "suspicious",
            explanation: "Файлы с расширением .exe — это программы. Не запускай их, если ты не уверен в источнике. Это могут быть вирусы.",
          },
          {
            name: "скидка_50%.scr",
            icon: "⚠️",
            target: "suspicious",
            explanation: ".scr — обычно файлы заставок, но вирусы часто маскируются под них. Всегда проверяй антивирусом.",
          },
          {
            name: "расписание.docx",
            icon: "📝",
            target: "safe",
            explanation: "Документы и картинки обычно безопасны. Но если файл пришёл от незнакомца — лучше проверить антивирусом.",
          },
          {
            name: "установка_чита.msi",
            icon: "⚙️",
            target: "suspicious",
            explanation: ".msi — установщики программ. Устанавливай только то, что скачал с официального сайта.",
          },
          {
            name: "реферат_по_биологии.doc",
            icon: "📝",
            target: "safe",
            explanation: "Документы и картинки обычно безопасны. Но если файл пришёл от незнакомца — лучше проверить антивирусом.",
          },
          {
            name: "поздравление_с_днем_рождения.exe",
            icon: "⚠️",
            target: "suspicious",
            explanation: "Файлы с расширением .exe — это программы. Не запускай их, если ты не уверен в источнике. Это могут быть вирусы.",
          },
        ],
      },
    ],
    finalTest: [
      {
        question: "Можно ли открывать файл от незнакомого человека?",
        options: ["Да, если файл выглядит красиво", "Нет, сначала нужно проверить отправителя", "Да, если открыть быстро"],
        correctIndex: 1,
      },
      {
        question: "Какой пароль самый надёжный?",
        options: ["masha2015", "123456", "A!кот123"],
        correctIndex: 2,
      },
      {
        question: "Зачем нужен антивирус?",
        options: ["Чтобы украшать экран", "Чтобы искать и останавливать вредные программы", "Чтобы удалять учебные файлы"],
        correctIndex: 1,
      },
      {
        question: "Нужно ли обновлять программы?",
        options: ["Да, обновления помогают закрывать уязвимости", "Нет, обновления всегда мешают", "Только если хочется сменить цвет"],
        correctIndex: 0,
      },
      {
        question: "Что делать с подозрительной ссылкой?",
        options: ["Сразу открыть", "Переслать друзьям", "Не открывать и сообщить взрослому или учителю"],
        correctIndex: 2,
      },
    ],
  },
  [FILE_LAB_MODULE_SLUG]: {
    parts: [
      {
        id: 1,
        title: "Папки помогают не теряться",
        introTitle: "В цифровом архиве нужен порядок",
        introText: "Файлы проще найти, когда они лежат по понятным папкам.",
        introBullets: [
          "учебные документы держи отдельно",
          "рисунки и фото складывай в свои папки",
          "проекты лучше хранить по темам",
        ],
        introFooter: "Так архив не превращается в одну большую кучу файлов.",
        learnText: "как раскладывать файлы по папкам и быстро находить нужное",
        learnIcon: "📁",
        warmupTitle: "Где лучше хранить файл math_homework.pdf?",
        warmupItems: ["В папке Учёба", "На рабочем столе среди всех файлов", "В папке Музыка"],
        warmupCorrect: 0,
        warmupSuccess: "Верно! Учебный файл лучше положить в учебную папку.",
        warmupFooter: "Теперь потренируем порядок в архиве.",
        warmupButtonLabel: "Разобрать архив",
        gameTitle: "Папки спасают",
        gameDescription: "Помоги Лайку навести порядок: перетащи каждый файл в нужную папку.",
        gameType: "folder-sort",
        files: [
          { id: "cat-photo", name: "Фото кота", type: "photo", icon: "🖼️", targetFolder: "photos" },
          { id: "homework", name: "Домашка.docx", type: "document", icon: "📄", targetFolder: "documents" },
          { id: "game", name: "Игра.exe", type: "game", icon: "🎮", targetFolder: "games" },
          { id: "music", name: "Музыка.mp3", type: "music", icon: "🎵", targetFolder: "music" },
        ],
        folders: [
          { id: "photos", name: "Фото", icon: "📁" },
          { id: "documents", name: "Документы", icon: "📁" },
          { id: "games", name: "Игры", icon: "📁" },
          { id: "music", name: "Музыка", icon: "📁" },
        ],
      },
      {
        id: 2,
        title: "Давай понятные имена",
        introTitle: "Имя файла должно объяснять, что внутри",
        introText: "Хорошее название помогает понять тему файла ещё до открытия.",
        introBullets: [
          "используй тему работы",
          "добавляй дату или класс, если это полезно",
          "избегай названий вроде final-final-123",
        ],
        introFooter: "Понятные имена экономят время тебе и тем, кто работает рядом.",
        learnText: "как выбирать названия файлов, по которым сразу понятно содержимое",
        learnIcon: "✏️",
        warmupTitle: "Какое имя лучше для проекта по математике?",
        warmupItems: ["новый документ", "math_project_april.pdf", "111"],
        warmupCorrect: 1,
        warmupSuccess: "Правильно! Такое имя сразу говорит, что это за файл.",
        warmupFooter: "Теперь закрепим правило на маленьком задании.",
        warmupButtonLabel: "Проверить имя",
        gameTitle: "Давай понятные имена",
        gameDescription: "Выбери название, по которому файл легко найти и понять без открытия.",
        gameType: "filename-quiz",
        rounds: [
          {
            situation: "Проект по математике за апрель",
            options: ["111", "новый документ", "math_project_april.pdf"],
            correctIndex: 2,
            explanation: "В хорошем имени есть тема, тип работы и время: математика, проект, апрель.",
          },
          {
            situation: "Домашка по геометрии за 6 класс",
            options: ["файл1", "домашка", "геометрия_6класс_домашка.docx"],
            correctIndex: 2,
            explanation: "Такое имя сразу объясняет предмет, класс и что это домашняя работа.",
          },
          {
            situation: "Презентация про космос",
            options: ["презентация_final_final", "новая презентация", "космос_презентация_май.pptx"],
            correctIndex: 2,
            explanation: "Название с темой, типом файла и месяцем проще найти среди других презентаций.",
          },
        ],
      },
      {
        id: 3,
        title: "Смотри на расширение",
        introTitle: "Расширение подсказывает тип файла",
        introText: "Окончание имени помогает понять, чем открыть файл и что в нём может быть.",
        introBullets: [
          ".pdf часто используют для документов",
          ".png и .jpg обычно картинки",
          ".docx открывается в текстовом редакторе",
        ],
        introFooter: "Если расширение странное, лучше спросить взрослого или учителя.",
        learnText: "как по расширению понимать тип файла и выбирать подходящее действие",
        learnIcon: "🔎",
        warmupTitle: "Какой файл скорее всего презентация?",
        warmupItems: ["space_project.pptx", "notes.pdf", "poster.png"],
        warmupCorrect: 0,
        warmupSuccess: "Верно! .pptx обычно означает презентацию со слайдами.",
        warmupFooter: "Осталось потренироваться с типами файлов.",
        warmupButtonLabel: "Узнать тип",
        gameTitle: "Файловая таможня",
        gameDescription: "Проверь расширение файла и отправь посылку в правильный отдел.",
        gameType: "file-customs",
        rounds: [
          {
            fileName: "poster.png",
            question: "Куда отправим файл?",
            options: ["Галерея", "Музыка", "Осторожно"],
            correctIndex: 0,
            explanation: ".png — это картинка, ей место в Галерее.",
            scannerVerdict: "Безопасный тип: картинка",
          },
          {
            fileName: "notes.pdf",
            question: "Куда отправим файл?",
            options: ["Документы", "Музыка", "Галерея"],
            correctIndex: 0,
            explanation: ".pdf — это документ для просмотра.",
            scannerVerdict: "Это документ",
          },
          {
            fileName: "space_project.pptx",
            question: "Куда отправим файл?",
            options: ["Презентации", "Документы", "Галерея"],
            correctIndex: 0,
            explanation: ".pptx — это презентация со слайдами.",
            scannerVerdict: "Это презентация",
          },
          {
            fileName: "melody.mp3",
            question: "Куда отправим файл?",
            options: ["Музыка", "Документы", "Презентации"],
            correctIndex: 0,
            explanation: ".mp3 — это аудиофайл.",
            scannerVerdict: "Безопасный тип: аудио",
          },
          {
            fileName: "prize.exe",
            question: "Куда отправим файл?",
            options: ["Галерея", "Осторожно", "Документы"],
            correctIndex: 1,
            explanation: ".exe может запускать программу. Если файл незнакомый, лучше спросить взрослого.",
            scannerVerdict: "Осторожно: запускаемый файл",
          },
        ],
      },
    ],
    finalTest: [
      {
        question: "Зачем нужны папки?",
        options: ["Чтобы файлы было проще хранить и находить", "Чтобы компьютер работал без интернета", "Чтобы удалить все документы"],
        correctIndex: 0,
      },
      {
        question: "Какое имя файла самое понятное?",
        options: ["111", "project_history_may.pdf", "новый новый файл"],
        correctIndex: 1,
      },
      {
        question: "Что обычно означает расширение .png?",
        options: ["Картинка", "Пароль", "Папка"],
        correctIndex: 0,
      },
      {
        question: "Почему имя final-final-123.pdf неудобное?",
        options: ["Неясно, что внутри файла", "Оно слишком короткое для компьютера", "Такой файл нельзя открыть"],
        correctIndex: 0,
      },
      {
        question: "Что делать, если расширение файла выглядит странно?",
        options: ["Сразу открыть", "Спросить взрослого или учителя", "Переименовать в картинку"],
        correctIndex: 1,
      },
    ],
  },
  [SMART_SEARCH_MODULE_SLUG]: {
    parts: [
      {
        id: 1,
        title: "Используй точные слова",
        introTitle: "Точный запрос быстрее приводит к ответу",
        introText: "Чем понятнее вопрос, тем меньше лишних страниц покажет поиск.",
        introBullets: [
          "добавляй тему запроса",
          "пиши, для кого нужен ответ",
          "убирай слишком общие слова",
        ],
        introFooter: "Например: «почему листья меняют цвет осенью для детей» точнее, чем просто «листья».",
        learnText: "как составлять запрос так, чтобы поиск понимал задачу",
        learnIcon: "🔎",
        warmupTitle: "Какой запрос точнее?",
        warmupItems: ["планеты", "планеты солнечной системы для детей", "интересное"],
        warmupCorrect: 1,
        warmupSuccess: "Верно! В запросе есть тема и понятно, для кого нужен материал.",
        warmupFooter: "Теперь закрепим это в мини-игре.",
        warmupButtonLabel: "Подобрать запрос",
        gameTitle: "Очисти запрос",
        gameDescription: "Убери лишние слова из запроса, чтобы поиск понял задачу.",
        gameType: "clean-query",
        rounds: [
          {
            words: [
              { text: "планеты", useful: true },
              { text: "интересное", useful: false },
              { text: "быстро", useful: false },
              { text: "солнечной", useful: true },
              { text: "системы", useful: true },
              { text: "для", useful: true },
              { text: "детей", useful: true },
            ],
          },
          {
            words: [
              { text: "вулканы", useful: true },
              { text: "круто", useful: false },
              { text: "срочно", useful: false },
              { text: "для", useful: true },
              { text: "доклада", useful: true },
              { text: "5", useful: true },
              { text: "класс", useful: true },
            ],
          },
          {
            words: [
              { text: "динозавры", useful: true },
              { text: "очень", useful: false },
              { text: "разное", useful: false },
              { text: "виды", useful: true },
              { text: "для", useful: true },
              { text: "проекта", useful: true },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Проверяй, кто написал",
        introTitle: "Источник помогает понять, можно ли доверять ответу",
        introText: "Перед тем как верить странице, посмотри, кто её написал и когда.",
        introBullets: [
          "ищи автора или организацию",
          "проверяй дату публикации",
          "осторожно относись к неизвестным сайтам",
        ],
        introFooter: "Надёжный источник обычно не прячется и объясняет, откуда взялась информация.",
        learnText: "как замечать автора, дату и признаки надёжного источника",
        learnIcon: "🧭",
        warmupTitle: "Какому источнику проще доверять?",
        warmupItems: ["Сайт музея с автором и датой", "Анонимный пост без даты", "Картинка без подписи"],
        warmupCorrect: 0,
        warmupSuccess: "Правильно! Автор и дата помогают проверить информацию.",
        warmupFooter: "Теперь потренируем проверку источника.",
        warmupButtonLabel: "Проверить источник",
        gameTitle: "Можно ли доверять?",
        gameDescription: "Посмотри на карточку сайта и реши, можно ли доверять источнику.",
        gameType: "source-check",
        rounds: [
          {
            siteName: "museum.ru",
            title: "Почему листья меняют цвет",
            text: "Осенью листья становятся жёлтыми и красными, потому что в них меняется количество красящих веществ.",
            author: "Анна Иванова",
            date: "12.10.2024",
          },
        ],
      },
      {
        id: 3,
        title: "Сравнивай несколько ответов",
        introTitle: "Первый ответ не всегда самый точный",
        introText: "Если тема важная, полезно сверить информацию в нескольких местах.",
        introBullets: [
          "открой несколько источников",
          "сравни, совпадают ли факты",
          "выбирай ответ, который подтверждают разные места",
        ],
        introFooter: "Так ты меньше рискуешь поверить случайной ошибке.",
        learnText: "как сравнивать ответы и находить совпадающие факты",
        learnIcon: "📚",
        warmupTitle: "Что делать, если ответы на сайтах отличаются?",
        warmupItems: ["Сравнить несколько надёжных источников", "Взять первый ответ", "Закрыть поиск"],
        warmupCorrect: 0,
        warmupSuccess: "Верно! Сравнение помогает найти более точный ответ.",
        warmupFooter: "Осталось потренироваться в финальной мини-игре.",
        warmupButtonLabel: "Сравнить ответы",
        gameTitle: "Собери правду",
        gameDescription: "Сравни ответы с разных сайтов и собери общий вывод из совпадающих фактов.",
        gameQuestion: "Ты нашёл странный факт. Что лучше сделать дальше?",
        gameItems: ["Проверить его ещё в двух источниках", "Сразу рассказать всем", "Не смотреть автора"],
        gameCorrect: 0,
        gameSuccess: "Да. Несколько источников помогают отличить факт от ошибки.",
        gameHint: "Лучший шаг — проверить информацию ещё раз.",
        gameType: "build-truth",
      },
    ],
    finalTest: [
      {
        question: "Какой запрос самый точный?",
        options: ["планеты солнечной системы для детей", "интересное", "сайт"],
        correctIndex: 0,
      },
      {
        question: "Что помогает проверить источник?",
        options: ["Автор и дата", "Яркий фон", "Длинная ссылка"],
        correctIndex: 0,
      },
      {
        question: "Что делать, если информация важная?",
        options: ["Сравнить несколько источников", "Верить первому ответу", "Искать только картинки"],
        correctIndex: 0,
      },
    ],
  },
  [DIGITAL_ETHICS_MODULE_SLUG]: {
    parts: [
      {
        id: 1,
        title: "Пиши так, как говорил бы лично",
        introTitle: "За экраном тоже человек",
        introText: "В сети важно писать спокойно и уважительно, даже если ты не согласен.",
        introBullets: [
          "не обзывай и не высмеивай",
          "объясняй свою мысль без грубости",
          "перед отправкой представь, что говоришь это вслух",
        ],
        introFooter: "Доброе сообщение помогает решить спор, а не разжечь его сильнее.",
        learnText: "как выбирать уважительный тон в переписке",
        learnIcon: "💬",
        warmupTitle: "Какой ответ лучше отправить в чат?",
        warmupItems: [
          "Ты ничего не понимаешь!",
          "Я думаю иначе. Давай спокойно разберёмся.",
          "Ха-ха, какой глупый ответ.",
        ],
        warmupCorrect: 1,
        warmupSuccess: "Верно! Такой ответ не обижает и помогает продолжить разговор.",
        warmupFooter: "Теперь потренируем цифровую вежливость.",
        warmupButtonLabel: "Выбрать тон",
        gameTitle: "Исправь сообщение",
        gameDescription: "Замени резкие слова и собери уважительный ответ.",
        gameType: "fix-message",
      },
      {
        id: 2,
        title: "Уважай авторов",
        introTitle: "У каждой картинки и идеи есть автор",
        introText: "Если берёшь чужую работу, важно указать источник и спросить разрешение, когда это нужно.",
        introBullets: [
          "не выдавай чужую работу за свою",
          "сохраняй имя автора или ссылку",
          "используй материалы только там, где это разрешено",
        ],
        introFooter: "Так ты показываешь уважение к чужому труду.",
        learnText: "как честно использовать чужие картинки, тексты и идеи",
        learnIcon: "✍️",
        warmupTitle: "Что честнее сделать с чужой картинкой?",
        warmupItems: [
          "Вставить без подписи",
          "Подписать автора или источник",
          "Сказать, что нарисовал сам",
        ],
        warmupCorrect: 1,
        warmupSuccess: "Правильно! Источник помогает уважать автора.",
        warmupFooter: "Теперь проверим, как поступить с чужой работой.",
        warmupButtonLabel: "Проверить авторство",
        gameTitle: "Украли или указали?",
        gameDescription: "Проверь посты как цифровой детектив и найди, где честно указан автор.",
        gameType: "content-detective",
      },
      {
        id: 3,
        title: "Тролли в интернете",
        introTitle: "Тролль хочет поссорить людей",
        introText: "В сети иногда пишут резкие сообщения специально, чтобы разозлить других. Важно не отвечать грубо и сохранять спокойный тон.",
        introBullets: [
          "не отвечай троллю обидой на обиду",
          "говори спокойно, если хочешь объяснить свою мысль",
          "если переписка становится неприятной, остановись и попроси помощи",
        ],
        introFooter: "Спокойный ответ помогает не попасться на провокацию.",
        learnText: "как узнавать провокации и отвечать без грубости",
        learnIcon: "🧠",
        warmupTitle: "Что сделать перед отправкой спорного сообщения?",
        warmupItems: [
          "Отправить сразу",
          "Подумать, может ли оно кого-то обидеть",
          "Добавить ещё больше резких слов",
        ],
        warmupCorrect: 1,
        warmupSuccess: "Верно! Пауза перед отправкой часто спасает от ошибки.",
        warmupFooter: "Осталось пройти финальную проверку этики.",
        warmupButtonLabel: "Принять решение",
        gameTitle: "Затуши чат",
        gameDescription: "Успокой шумный чат: игнорируй провокации или блокируй токсичные сообщения.",
        gameType: "calm-chat",
      },
    ],
    finalTest: [
      {
        question: "Как лучше спорить в сети?",
        options: ["Спокойно и уважительно", "Обзываться", "Писать только капсом"],
        correctIndex: 0,
      },
      {
        question: "Что важно сделать, если используешь чужую картинку?",
        options: ["Указать автора или источник", "Стереть подпись", "Сказать, что это твоя работа"],
        correctIndex: 0,
      },
      {
        question: "Что делать перед отправкой обидного мема?",
        options: ["Не пересылать", "Отправить всем", "Добавить смешную подпись"],
        correctIndex: 0,
      },
    ],
  },
};

const emptyAuthForm = {
  email: "",
  display_name: "",
  password: "",
};


function getPath() {
  return window.location.pathname || "/";
}


function parseRoute(pathname) {
  const moduleGameMatch = pathname.match(/^\/modules\/([^/]+)\/parts\/(\d+)\/game$/);
  if (moduleGameMatch) {
    return {
      page: "module_game",
      slug: moduleGameMatch[1],
      part: Number(moduleGameMatch[2]),
    };
  }

  const modulePartMatch = pathname.match(/^\/modules\/([^/]+)\/parts\/(\d+)$/);
  if (modulePartMatch) {
    return {
      page: "module_part",
      slug: modulePartMatch[1],
      part: Number(modulePartMatch[2]),
    };
  }

  if (pathname.startsWith("/modules/") && pathname.endsWith("/test")) {
    return {
      page: "module_test",
      slug: pathname.replace("/modules/", "").replace("/test", ""),
      part: null,
    };
  }

  if (pathname.startsWith("/modules/")) {
    return { page: "module", slug: pathname.replace("/modules/", ""), part: null };
  }

  if (pathname === "/profile") {
    return { page: "profile", slug: "", part: null };
  }

  if (pathname === "/leaderboard") {
    return { page: "leaderboard", slug: "", part: null };
  }

  if (pathname === "/achievements") {
    return { page: "achievements", slug: "", part: null };
  }

  if (pathname === "/shop") {
    return { page: "shop", slug: "", part: null };
  }

  if (pathname === "/tasks") {
    return { page: "tasks", slug: "", part: null };
  }

  if (pathname === "/admin") {
    return { page: "admin", slug: "", part: null };
  }

  return { page: "academy", slug: "", part: null };
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function QueryCompareIntro({ onContinue }) {
  const [selectedQuery, setSelectedQuery] = useState("");
  const cards = [
    {
      id: "bad",
      query: "планеты",
      label: "Общий запрос",
      bullets: ["слишком общий", "поиск не понимает задачу"],
      comment: "Запрос слишком общий",
    },
    {
      id: "good",
      query: "планеты солнечной системы для детей",
      label: "Точный запрос",
      bullets: ["понятная тема", "понятно для кого"],
      comment: "Отлично! Такой запрос даст лучший результат",
    },
  ];
  const selectedCard = cards.find((card) => card.id === selectedQuery);

  return (
    <article className="panel query-compare-card">
      <div className="query-compare-head">
        <div>
          <h3>Сравни запросы</h3>
          <p>Нажми на карточки и посмотри, какой запрос понятнее для поиска.</p>
        </div>
        <span aria-hidden="true">🔎</span>
      </div>

      <div className="query-compare-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={selectedQuery === card.id ? "query-card query-card-active" : "query-card"}
            type="button"
            onClick={() => setSelectedQuery(card.id)}
            aria-pressed={selectedQuery === card.id}
          >
            <span className="query-card-inner">
              <span className="query-card-face query-card-front">
                <span className="query-card-label">{card.label}</span>
                <strong>{card.query}</strong>
                <span className="query-card-flip-hint">Нажми, чтобы перевернуть</span>
              </span>
              <span className="query-card-face query-card-back">
                <span className="query-card-label">Характеристика</span>
                <strong>{card.comment}</strong>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </span>
            </span>
          </button>
        ))}
      </div>

      {selectedCard ? (
        <div className={selectedCard.id === "good" ? "query-cat-comment success" : "query-cat-comment"}>
          <span aria-hidden="true">🐱</span>
          <strong>{selectedCard.comment}</strong>
        </div>
      ) : null}

      <button className="primary-button query-continue-button" type="button" onClick={onContinue}>
        Дальше
      </button>
    </article>
  );
}

function CleanQueryGame({ rounds, onComplete }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [removedWords, setRemovedWords] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [lastMistakeIndex, setLastMistakeIndex] = useState(null);
  const [score, setScore] = useState(0);
  const currentRound = rounds[currentRoundIndex] || null;

  if (!currentRound) {
    return null;
  }

  const visibleWords = currentRound.words.filter((_, index) => !removedWords.includes(index));
  const roundPassed = visibleWords.every((word) => word.useful);
  const isLastRound = currentRoundIndex === rounds.length - 1;
  const progress = `${currentRoundIndex + (roundPassed ? 1 : 0)}/${rounds.length}`;

  const handleWordClick = (wordIndex) => {
    if (roundPassed || removedWords.includes(wordIndex)) {
      return;
    }

    const word = currentRound.words[wordIndex];
    if (word.useful) {
      setFeedback("Это слово полезное, верни его");
      setLastMistakeIndex(wordIndex);
      setScore((current) => Math.max(0, current - 5));
      return;
    }

    setRemovedWords((current) => [...current, wordIndex]);
    setFeedback("Отлично, это лишнее слово");
    setLastMistakeIndex(null);
    setScore((current) => current + 10);
  };

  const goNext = () => {
    if (isLastRound) {
      onComplete();
      return;
    }

    setCurrentRoundIndex((current) => current + 1);
    setRemovedWords([]);
    setFeedback("");
    setLastMistakeIndex(null);
  };

  return (
    <div className="search-rescue-game">
      <div className="search-rescue-head">
        <div>
          <h3>Очисти запрос</h3>
          <p>Нажимай на лишние слова. Полезные слова должны остаться в строке.</p>
        </div>
        <div className="search-rescue-stats">
          <span>Прогресс: {progress}</span>
          <span>Очки: {score}</span>
        </div>
      </div>

      <section className={roundPassed ? "search-box search-box-clear" : "search-box search-box-chaos"}>
        <span aria-hidden="true">🔎</span>
        {visibleWords.map((word) => (
          <em key={`${word.text}-${word.useful}`}>{word.text}</em>
        ))}
      </section>

      <div className="search-word-grid">
        {currentRound.words.map((word, index) => {
          const removed = removedWords.includes(index);
          const className = [
            "search-word-chip",
            removed ? "search-word-chip-removed" : "",
            lastMistakeIndex === index ? "search-word-chip-wrong" : "",
          ].filter(Boolean).join(" ");

          return (
            <button
              key={word.text}
              className={className}
              type="button"
              onClick={() => handleWordClick(index)}
              disabled={removed || roundPassed}
            >
              {word.text}
            </button>
          );
        })}
      </div>

      <section className={roundPassed ? "search-results search-results-good" : "search-results search-results-chaos"}>
        <h4>{roundPassed ? "Супер! Запрос стал точным" : "Запрос ещё шумит"}</h4>
        <div>
          {(roundPassed
            ? ["Точная тема", "Понятно для кого", "Меньше лишних результатов"]
            : ["Слишком много лишнего", "Поиск путается", "Нужна очистка"]
          ).map((result) => (
            <article key={result}>{result}</article>
          ))}
        </div>
      </section>

      {feedback || roundPassed ? (
        <div className={roundPassed || feedback.startsWith("Отлично") ? "search-rescue-feedback success" : "search-rescue-feedback error"}>
          <span aria-hidden="true">🐱</span>
          <div>
            <strong>{roundPassed ? "Супер! Запрос стал точным" : feedback}</strong>
            <p>{roundPassed ? "Теперь поиск лучше понимает задачу." : "Продолжай очищать запрос."}</p>
          </div>
        </div>
      ) : null}

      <div className="search-rescue-actions">
        {roundPassed ? (
          <button className="primary-button" type="button" onClick={goNext}>
            {isLastRound ? "Завершить" : "Дальше"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function HighlightSourceInteractive({ rounds, onComplete, showContinue = true }) {
  const [highlightedItems, setHighlightedItems] = useState({});
  const source = rounds[0] || null;

  if (!source) {
    return null;
  }

  const selectedCount = ["author", "date"].filter((item) => highlightedItems[item]).length;
  const feedback =
    selectedCount === 2
      ? "Отлично! Это делает источник надёжным"
      : selectedCount === 1
        ? "Почти! Проверь ещё"
        : "";

  const handleImportantClick = (item) => {
    setHighlightedItems((current) => ({
      ...current,
      [item]: true,
    }));
  };

  const getMetaClassName = (item) => {
    return highlightedItems[item]
      ? "highlight-source-meta highlight-source-meta-active"
      : "highlight-source-meta";
  };

  return (
    <div className="highlight-source-game">
      <h3>Что важно проверить?</h3>

      <article className="highlight-source-card">
        <div className="highlight-source-site">
          <span aria-hidden="true">🌐</span>
          <strong>{source.siteName}</strong>
        </div>

        <h4>{source.title}</h4>
        <p>{source.text}</p>

        <div className="highlight-source-grid">
          <button
            className={getMetaClassName("author")}
            type="button"
            onClick={() => handleImportantClick("author")}
          >
            <span>Автор</span>
            <strong>{source.author}</strong>
          </button>
          <button
            className={getMetaClassName("date")}
            type="button"
            onClick={() => handleImportantClick("date")}
          >
            <span>Дата</span>
            <strong>{source.date}</strong>
          </button>
        </div>
      </article>

      {feedback ? (
        <div className={selectedCount === 2 ? "highlight-source-feedback success" : "highlight-source-feedback"}>
          <strong>{feedback}</strong>
        </div>
      ) : null}

      <div className="highlight-source-actions">
        {showContinue && selectedCount === 2 ? (
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ToneFeelGame({ onComplete }) {
  const steps = [
    {
      situation: "Ты не согласен с другом",
      message: "Ты ничего не понимаешь!",
      question: "Как это звучит?",
      correctTone: "bad",
      feedback: "Это звучит обидно 😔",
      toneClass: "bad",
    },
    {
      prompt: "А как сказать лучше?",
      message: "Я думаю иначе. Давай спокойно разберёмся",
      question: "Как это звучит?",
      correctTone: "good",
      feedback: "Отлично! Это уважительный тон 👍",
      toneClass: "good",
    },
  ];
  const options = [
    { id: "good", label: "😊 Добро" },
    { id: "neutral", label: "😐 Нейтрально" },
    { id: "bad", label: "😡 Обидно" },
  ];
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const step = steps[stepIndex];
  const selectedTone = answers[stepIndex];
  const isCorrect = selectedTone === step.correctTone;

  const handleAnswer = (toneId) => {
    setAnswers((current) => ({
      ...current,
      [stepIndex]: toneId,
    }));
  };

  const getOptionClassName = (toneId) => {
    const isSelected = selectedTone === toneId;

    return [
      "tone-feel-option",
      isSelected && toneId === step.correctTone ? "tone-feel-option-correct" : "",
      isSelected && toneId !== step.correctTone ? "tone-feel-option-wrong" : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="tone-feel-game">
      <div className="tone-feel-head">
        <span className="tone-feel-progress">Шаг {stepIndex + 1}/2</span>
      </div>

      <div className="tone-feel-title">
        <h3>Как это звучит?</h3>
        {step.situation ? <p>{step.situation}</p> : null}
        {step.prompt ? <p>{step.prompt}</p> : null}
      </div>

      <article className={`tone-feel-message ${isCorrect ? `tone-feel-message-${step.toneClass}` : ""}`}>
        <span className="tone-feel-emoji" aria-hidden="true">
          {step.toneClass === "bad" ? "😡" : "😊"}
        </span>
        <p>«{step.message}»</p>
      </article>

      <div className="tone-feel-question">{step.question}</div>

      <div className="tone-feel-options">
        {options.map((option) => (
          <button
            key={option.id}
            className={getOptionClassName(option.id)}
            type="button"
            onClick={() => handleAnswer(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedTone ? (
        <div className={isCorrect ? "tone-feel-feedback success" : "tone-feel-feedback"}>
          <strong>{isCorrect ? step.feedback : "Попробуй ещё раз. Прислушайся к тону сообщения."}</strong>
        </div>
      ) : null}

      {isCorrect ? (
        <div className="tone-feel-actions">
          {stepIndex === 0 ? (
            <button className="primary-button" type="button" onClick={() => setStepIndex(1)}>
              Дальше
            </button>
          ) : (
            <button className="primary-button" type="button" onClick={onComplete}>
              Продолжить
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function FixMessageGame({ onComplete }) {
  const [replacements, setReplacements] = useState({
    subject: false,
    phrase: false,
  });
  const [respectText, setRespectText] = useState("");

  const baseSubject = replacements.subject ? "Я думаю" : "Ты";
  const basePhrase = replacements.phrase ? "иначе" : "ничего не понимаешь";
  const coreMessage = `${baseSubject} ${basePhrase}`;
  const fixedCore = replacements.subject && replacements.phrase;
  const finalMessage = respectText ? `${coreMessage}. ${respectText}` : coreMessage;
  const isComplete = finalMessage === "Я думаю иначе. Давай спокойно разберёмся";
  const respectOptions = [
    "Давай спокойно разберёмся",
    "Объясню свою мысль",
    "Давай обсудим",
  ];

  const handleReplacement = (key) => {
    setReplacements((current) => ({
      ...current,
      [key]: true,
    }));
  };

  return (
    <div className="fix-message-game">
      <div className="fix-message-title">
        <h3>Исправь сообщение</h3>
        <p>Ты не согласен с другом</p>
      </div>

      <article className={isComplete ? "fix-message-bubble fixed" : "fix-message-bubble"}>
        <span>{fixedCore ? "Вежливее" : "Резкое сообщение"}</span>
        <p>«{finalMessage}»</p>
      </article>

      <div className="fix-message-task">
        <strong>{fixedCore ? "Добавь уважение" : "Сделай сообщение вежливым"}</strong>
      </div>

      <div className="fix-message-replacements">
        <button
          className={replacements.subject ? "fix-message-chip active" : "fix-message-chip"}
          type="button"
          onClick={() => handleReplacement("subject")}
          disabled={replacements.subject}
        >
          "Ты" → "Я думаю"
        </button>
        <button
          className={replacements.phrase ? "fix-message-chip active" : "fix-message-chip"}
          type="button"
          onClick={() => handleReplacement("phrase")}
          disabled={replacements.phrase}
        >
          "ничего не понимаешь" → "иначе"
        </button>
      </div>

      {fixedCore ? (
        <div className="fix-message-respect">
          {respectOptions.map((option) => (
            <button
              key={option}
              className={respectText === option ? "fix-message-respect-option active" : "fix-message-respect-option"}
              type="button"
              onClick={() => setRespectText(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {isComplete ? (
        <div className="fix-message-result">
          <strong>Отлично! Это уважительный ответ 👍</strong>
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function BuildPostInteractive({ onComplete }) {
  const chips = [
    { id: "author-ivan", label: "Иван Петров", field: "author", correct: true },
    { id: "source-ivan", label: "@ivan_art", field: "source", correct: true },
    { id: "source-google", label: "google", field: "source", correct: false },
    { id: "author-mine", label: "моё", field: "author", correct: false },
    { id: "author-unknown", label: "неизвестно", field: "author", correct: false },
  ];
  const fields = [
    { id: "author", label: "Автор", placeholder: "пусто" },
    { id: "source", label: "Источник", placeholder: "пусто" },
  ];
  const [postFields, setPostFields] = useState({
    author: "",
    source: "",
  });
  const [lastMovedField, setLastMovedField] = useState("");

  const bothFilled = Boolean(postFields.author && postFields.source);
  const isCorrect = postFields.author === "Иван Петров" && postFields.source === "@ivan_art";
  const feedback = bothFilled
    ? isCorrect
      ? "Отлично! Теперь автор указан 👍"
      : "Здесь не хватает автора или источник неверный"
    : "";

  const handleChipClick = (chip) => {
    setPostFields((current) => ({
      ...current,
      [chip.field]: chip.label,
    }));
    setLastMovedField(chip.field);
  };

  const getFieldClassName = (fieldId) => {
    return [
      "build-post-field",
      lastMovedField === fieldId ? "build-post-field-pop" : "",
      bothFilled && isCorrect ? "build-post-field-correct" : "",
      bothFilled && !isCorrect ? "build-post-field-wrong" : "",
    ].filter(Boolean).join(" ");
  };

  const getChipClassName = (chip) => {
    const isSelected = postFields[chip.field] === chip.label;

    return [
      "build-post-chip",
      isSelected && chip.correct ? "build-post-chip-correct" : "",
      isSelected && !chip.correct ? "build-post-chip-wrong" : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="build-post-interactive">
      <div className="build-post-title">
        <h3>Собери честный пост</h3>
        <p>Добавь автора и источник, чтобы пост был честным.</p>
      </div>

      <article className="build-post-card">
        <div className="build-post-image" aria-hidden="true">
          <span>🎨</span>
        </div>
        <p className="build-post-text">Смотрите, что я нашёл!</p>

        <div className="build-post-fields">
          {fields.map((field) => (
            <div className={getFieldClassName(field.id)} key={field.id}>
              <span>{field.label}</span>
              <strong>{postFields[field.id] || field.placeholder}</strong>
            </div>
          ))}
        </div>
      </article>

      <div className="build-post-chip-list" aria-label="Элементы поста">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className={getChipClassName(chip)}
            type="button"
            onClick={() => handleChipClick(chip)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {feedback ? (
        <div className={isCorrect ? "build-post-feedback success" : "build-post-feedback error"}>
          <strong>{feedback}</strong>
        </div>
      ) : null}

      {isCorrect ? (
        <div className="build-post-actions">
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ContentDetectiveGame({ onComplete }) {
  const posts = [
    {
      id: "honest-sky",
      image: "🌅",
      text: "Нашёл красивый рисунок заката",
      author: "Автор: Иван Петров",
      trueAuthor: "Иван Петров",
      stolen: false,
    },
    {
      id: "stolen-cat",
      image: "🐱",
      text: "Смотрите, какую картинку я сделал!",
      author: "",
      trueAuthor: "Анна Смирнова",
      stolen: true,
    },
    {
      id: "honest-space",
      image: "🚀",
      text: "Космический постер для проекта",
      author: "Автор: @space_kid",
      trueAuthor: "@space_kid",
      stolen: false,
    },
  ];
  const [selectedPostId, setSelectedPostId] = useState(posts[0].id);
  const [answers, setAnswers] = useState({});

  const selectedPost = posts.find((post) => post.id === selectedPostId) || posts[0];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === posts.length;
  const allCorrect = posts.every((post) => answers[post.id]?.correct);

  const handleDecision = (decision) => {
    const correct = selectedPost.stolen ? decision === "stolen" : decision === "ok";
    setAnswers((current) => ({
      ...current,
      [selectedPost.id]: {
        decision,
        correct,
      },
    }));
  };

  const getPostClassName = (post) => {
    const answer = answers[post.id];

    return [
      "content-detective-post",
      selectedPostId === post.id ? "content-detective-post-selected" : "",
      answer?.correct ? "content-detective-post-correct" : "",
      answer && !answer.correct ? "content-detective-post-wrong" : "",
    ].filter(Boolean).join(" ");
  };

  const getStampLabel = (post) => {
    const answer = answers[post.id];
    if (!answer?.correct) {
      return "";
    }

    return post.stolen ? "УКРАЛИ" : "ЧЕСТНО";
  };

  return (
    <div className="content-detective-game">
      <div className="content-detective-head">
        <div>
          <h3>Украли или указали?</h3>
          <p>Ты цифровой детектив. Проверь, указан ли автор у каждого поста.</p>
        </div>
        <span>Проверено: {answeredCount}/{posts.length}</span>
      </div>

      <div className="content-detective-grid">
        {posts.map((post) => {
          const answer = answers[post.id];
          const stampLabel = getStampLabel(post);

          return (
            <article
              key={post.id}
              className={getPostClassName(post)}
              onClick={() => setSelectedPostId(post.id)}
            >
              {stampLabel ? <div className={post.stolen ? "detective-stamp stolen" : "detective-stamp honest"}>{stampLabel}</div> : null}
              <div className="content-detective-image" aria-hidden="true">
                <span>{post.image}</span>
              </div>
              <p>{post.text}</p>
              <div className={post.author ? "content-detective-author" : "content-detective-author empty"}>
                {post.author || "Автор не указан"}
              </div>

              {answer && !answer.correct ? (
                <div className="content-detective-real-author">
                  <span aria-hidden="true">💬</span>
                  <strong>Это моя работа…</strong>
                  <small>Настоящий автор: {post.trueAuthor}</small>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="content-detective-decision">
        <strong>Пост выбран. Что скажешь?</strong>
        <div>
          <button type="button" onClick={() => handleDecision("stolen")}>
            Украли
          </button>
          <button type="button" onClick={() => handleDecision("ok")}>
            Ок
          </button>
        </div>
      </div>

      {answers[selectedPost.id] && !answers[selectedPost.id].correct ? (
        <div className="content-detective-feedback error">
          У автора нет подписи
        </div>
      ) : null}

      {answers[selectedPost.id]?.correct ? (
        <div className="content-detective-feedback success">
          Верно! Детективная проверка прошла успешно.
        </div>
      ) : null}

      {allAnswered && allCorrect ? (
        <div className="content-detective-finish">
          <strong>Отлично! Все посты проверены честно.</strong>
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function TrollGame({ onComplete }) {
  const messages = [
    "Ты вообще глупый",
    "Ответь, если не боишься",
  ];
  const [trollPower, setTrollPower] = useState(50);
  const [lastAction, setLastAction] = useState("");

  const trollGone = trollPower <= 0;
  const trollScale = trollGone ? 0 : 0.7 + trollPower / 100;

  const handleReply = () => {
    setTrollPower((current) => Math.min(100, current + 25));
    setLastAction("reply");
  };

  const handleIgnore = () => {
    setTrollPower((current) => Math.max(0, current - 35));
    setLastAction("ignore");
  };

  return (
    <div className="troll-game">
      <div className="troll-game-head">
        <h3>Не корми тролля</h3>
        <p>Провокации становятся слабее, когда ты не отвечаешь на них.</p>
      </div>

      <div className="troll-power">
        <div>
          <strong>Сила тролля</strong>
          <span>{trollPower}%</span>
        </div>
        <div className="troll-power-track" aria-hidden="true">
          <div className="troll-power-fill" style={{ width: `${trollPower}%` }} />
        </div>
      </div>

      <div className="troll-stage">
        <div className={trollGone ? "troll-character troll-character-gone" : "troll-character"} style={{ transform: `scale(${trollScale})` }} aria-hidden="true">
          <span className="troll-face">😈</span>
        </div>

        <div className={trollGone ? "troll-chat troll-chat-faded" : "troll-chat"}>
          {messages.map((message) => (
            <div className="troll-bubble" key={message}>{message}</div>
          ))}
        </div>
      </div>

      {lastAction ? (
        <div className={lastAction === "ignore" ? "troll-feedback success" : "troll-feedback warning"}>
          {lastAction === "ignore"
            ? "Хорошо! Без ответа провокация теряет силу."
            : "Тролль стал сильнее, потому что получил реакцию."}
        </div>
      ) : null}

      <div className="troll-actions">
        <button type="button" onClick={handleReply} disabled={trollGone}>
          Ответить
        </button>
        <button type="button" onClick={handleIgnore} disabled={trollGone}>
          Игнорировать
        </button>
      </div>

      {trollGone ? (
        <div className="troll-finish">
          <strong>Тролль исчез. Ты не повёлся на провокацию!</strong>
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CalmChatGame({ onComplete }) {
  const toxicMessages = [
    "Ты вообще глупый",
    "Ответь, если не боишься",
    "Хаха 😂",
  ];
  const maxNoise = 10;
  const [noise, setNoise] = useState(6);
  const [visibleMessages, setVisibleMessages] = useState(toxicMessages);
  const [lastAction, setLastAction] = useState("");

  const isWin = noise <= 0;
  const isLose = noise >= maxNoise;
  const trollScale = isWin ? 0 : 0.85 + noise / 12;

  const handleAction = (action) => {
    if (isWin || isLose) {
      return;
    }

    if (action === "reply") {
      setNoise((current) => Math.min(maxNoise, current + 2));
      setLastAction("reply");
      return;
    }

    if (action === "ignore") {
      setNoise((current) => Math.max(0, current - 1));
      setLastAction("ignore");
      return;
    }

    setNoise((current) => Math.max(0, current - 3));
    setVisibleMessages([]);
    setLastAction("block");
  };

  const resetGame = () => {
    setNoise(6);
    setVisibleMessages(toxicMessages);
    setLastAction("");
  };

  return (
    <div className="calm-chat-game">
      <div className="calm-chat-head">
        <div>
          <h3>Затуши чат</h3>
          <p>Выбери действие, которое снижает шум и не кормит провокацию.</p>
        </div>
        <span>{noise}/{maxNoise}</span>
      </div>

      <div className="calm-noise">
        <strong>Уровень шума</strong>
        <div className="calm-noise-track" aria-hidden="true">
          <div className="calm-noise-fill" style={{ width: `${(noise / maxNoise) * 100}%` }} />
        </div>
      </div>

      <div className="calm-chat-stage">
        <div className={isWin ? "calm-troll calm-troll-gone" : "calm-troll"} style={{ transform: `scale(${trollScale})` }} aria-hidden="true">
          😈
        </div>

        <div className={visibleMessages.length ? "calm-message-list" : "calm-message-list calm-message-list-faded"}>
          {visibleMessages.length ? (
            visibleMessages.map((message) => (
              <div className="calm-chat-bubble" key={message}>{message}</div>
            ))
          ) : (
            <div className="calm-chat-empty">Сообщения скрыты</div>
          )}
        </div>
      </div>

      {lastAction ? (
        <div className={`calm-chat-feedback calm-chat-feedback-${lastAction}`}>
          {lastAction === "reply"
            ? "Шум вырос: провокация получила ответ."
            : lastAction === "ignore"
              ? "Шум стал тише: ты не дал реакции."
              : "Токсичные сообщения скрыты, шум быстро падает."}
        </div>
      ) : null}

      <div className="calm-chat-actions">
        <button type="button" onClick={() => handleAction("reply")} disabled={isWin || isLose}>
          Ответить
        </button>
        <button type="button" onClick={() => handleAction("ignore")} disabled={isWin || isLose}>
          Игнор
        </button>
        <button type="button" onClick={() => handleAction("block")} disabled={isWin || isLose}>
          Блок
        </button>
      </div>

      {isLose ? (
        <div className="calm-chat-result error">
          <strong>Шум стал слишком высоким. Попробуй не отвечать на провокации.</strong>
          <button className="ghost-button" type="button" onClick={resetGame}>
            Начать заново
          </button>
        </div>
      ) : null}

      {isWin ? (
        <div className="calm-chat-result success">
          <strong>Чат успокоен! Ты не повёлся на провокацию.</strong>
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ConnectFactsInteractive({ onComplete }) {
  const leftFacts = [
    { id: "cold", text: "Осенью холодно, поэтому листья меняют цвет" },
    { id: "light", text: "Становится меньше света" },
  ];
  const rightFacts = [
    { id: "cold-weather", text: "Осенью холодно" },
    { id: "cold", text: "Листья меняют цвет из-за холода" },
  ];
  const [selectedLeftId, setSelectedLeftId] = useState("");
  const [matchedId, setMatchedId] = useState("");
  const [errorIds, setErrorIds] = useState({ left: "", right: "" });

  const handleLeftClick = (factId) => {
    if (matchedId) {
      return;
    }

    setSelectedLeftId(factId);
    setErrorIds({ left: "", right: "" });
  };

  const handleRightClick = (factId) => {
    if (!selectedLeftId || matchedId) {
      return;
    }

    if (selectedLeftId === factId) {
      setMatchedId(factId);
      setErrorIds({ left: "", right: "" });
      return;
    }

    setErrorIds({ left: selectedLeftId, right: factId });
    window.setTimeout(() => {
      setErrorIds({ left: "", right: "" });
    }, 420);
  };

  const getFactClassName = (side, factId) => {
    const isMatched = matchedId === factId;
    const isSelected = side === "left" && selectedLeftId === factId && !matchedId;
    const isError = errorIds[side] === factId;

    return [
      "connect-fact-item",
      isMatched ? "connect-fact-item-correct" : "",
      isSelected ? "connect-fact-item-selected" : "",
      isError ? "connect-fact-item-error" : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="connect-facts-game">
      <h3>Соедини похожие факты</h3>

      <div className="connect-facts-board">
        <article className="connect-facts-card">
          <span>Сайт 1</span>
          <div className="connect-facts-list">
            {leftFacts.map((fact) => (
              <button
                key={fact.id}
                className={getFactClassName("left", fact.id)}
                type="button"
                onClick={() => handleLeftClick(fact.id)}
              >
                {fact.text}
              </button>
            ))}
          </div>
        </article>

        <div className={matchedId ? "connect-facts-line connect-facts-line-visible" : "connect-facts-line"} aria-hidden="true" />

        <article className="connect-facts-card">
          <span>Сайт 2</span>
          <div className="connect-facts-list">
            {rightFacts.map((fact) => (
              <button
                key={fact.text}
                className={getFactClassName("right", fact.id)}
                type="button"
                onClick={() => handleRightClick(fact.id)}
              >
                {fact.text}
              </button>
            ))}
          </div>
        </article>
      </div>

      {matchedId ? (
        <>
          <div className="connect-facts-feedback">
            <strong>Отлично! Эти факты похожи и говорят об одном и том же</strong>
          </div>
          <div className="connect-facts-actions">
            <button className="primary-button" type="button" onClick={onComplete}>
              Продолжить
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function BuildTruthGame({ onComplete }) {
  const siteAnswers = [
    {
      site: "Сайт 1",
      text: "Листья меняют цвет из-за холода и уменьшения света",
    },
    {
      site: "Сайт 2",
      text: "Осенью становится меньше света, поэтому листья меняют цвет",
    },
    {
      site: "Сайт 3",
      text: "Листья меняют цвет, потому что деревья устают",
    },
  ];
  const facts = [
    { id: "light", text: "Из-за уменьшения света", correct: true },
    { id: "cold", text: "Из-за холода", correct: true },
    { id: "tired", text: "Потому что деревья устают", correct: false },
    { id: "random", text: "Просто так", correct: false },
  ];
  const [selectedFacts, setSelectedFacts] = useState([]);
  const [message, setMessage] = useState("");

  const selectedCorrectFacts = facts.filter((fact) => fact.correct && selectedFacts.includes(fact.id));
  const correctCount = selectedCorrectFacts.length;
  const score = selectedFacts.reduce((total, factId) => {
    const fact = facts.find((item) => item.id === factId);
    if (!fact) {
      return total;
    }

    return total + (fact.correct ? 10 : -5);
  }, 0);
  const finalScore = Math.max(0, Math.min(20, score));
  const isComplete = correctCount === 2;

  const handleFactClick = (fact) => {
    if (selectedFacts.includes(fact.id)) {
      return;
    }

    const nextSelectedFacts = [...selectedFacts, fact.id];
    const nextCorrectCount = facts.filter((item) => item.correct && nextSelectedFacts.includes(item.id)).length;
    setSelectedFacts(nextSelectedFacts);

    if (!fact.correct) {
      setMessage("Этот факт не подтверждается другими источниками");
      return;
    }

    if (nextCorrectCount === 2) {
      setMessage("Отлично! Ты сравнил ответы и нашёл совпадающие факты");
      return;
    }

    setMessage("Верно! Этот факт повторяется в ответах сайтов");
  };

  const getFactClassName = (fact) => {
    const isSelected = selectedFacts.includes(fact.id);

    return [
      "truth-fact-chip",
      isSelected && fact.correct ? "truth-fact-chip-correct" : "",
      isSelected && !fact.correct ? "truth-fact-chip-wrong" : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="build-truth-game">
      <div className="truth-game-head">
        <span className="truth-game-badge">Мини-игра</span>
        <div className="truth-game-stats">
          <span>Прогресс: {correctCount}/2</span>
          <span>Очки: {finalScore}/20</span>
        </div>
      </div>

      <div className="truth-game-title">
        <h3>Собери правду</h3>
        <p>Почему листья меняют цвет осенью?</p>
      </div>

      <div className="truth-site-grid">
        {siteAnswers.map((answer) => (
          <article className="truth-site-card" key={answer.site}>
            <span>{answer.site}</span>
            <p>{answer.text}</p>
          </article>
        ))}
      </div>

      <div className="truth-builder-card">
        <div>
          <span>Собери правильный вывод</span>
          <h4>
            {selectedCorrectFacts.length
              ? selectedCorrectFacts.map((fact) => fact.text).join(" + ")
              : "Выбери факты, которые повторяются в нескольких источниках"}
          </h4>
        </div>
        {isComplete ? (
          <p className="truth-final-text">Листья меняют цвет осенью из-за уменьшения света и холода</p>
        ) : null}
      </div>

      <div className="truth-facts">
        {facts.map((fact) => (
          <button
            key={fact.id}
            className={getFactClassName(fact)}
            type="button"
            onClick={() => handleFactClick(fact)}
          >
            {fact.text}
          </button>
        ))}
      </div>

      {message ? (
        <div className={isComplete ? "truth-message truth-message-success" : "truth-message"}>
          {message}
        </div>
      ) : null}

      {isComplete ? (
        <div className="truth-actions">
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      ) : null}
    </div>
  );
}

function TrustSourceGame({ onComplete }) {
  const rounds = [
    {
      site: "museum.ru",
      title: "Почему листья меняют цвет",
      author: "Анна Иванова",
      date: "12.10.2024",
      correct: "trust",
    },
    {
      site: "super-info123.ru",
      title: "Секретные факты обо всём",
      author: "",
      date: "",
      correct: "distrust",
    },
    {
      site: "blog.ru",
      title: "Как найти ответ для доклада",
      author: "Илья Петров",
      date: "",
      correct: "distrust",
    },
  ];
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentRound = rounds[currentRoundIndex];
  const answered = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === currentRound.correct;
  const progressPercent = Math.round(((currentRoundIndex + (answered ? 1 : 0)) / rounds.length) * 100);

  const chooseAnswer = (answer) => {
    if (answered) {
      return;
    }

    setSelectedAnswer(answer);
    if (answer === currentRound.correct) {
      setScore((current) => current + 1);
    }
  };

  const goNext = () => {
    if (currentRoundIndex >= rounds.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentRoundIndex((current) => current + 1);
    setSelectedAnswer("");
  };

  const restart = () => {
    setCurrentRoundIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  const getAnswerClassName = (answer) => {
    if (!answered) {
      return answer === "trust" ? "trust-source-choice trust-source-choice-trust" : "trust-source-choice trust-source-choice-distrust";
    }

    if (answer === currentRound.correct) {
      return "trust-source-choice trust-source-choice-correct";
    }

    if (answer === selectedAnswer) {
      return "trust-source-choice trust-source-choice-wrong";
    }

    return "trust-source-choice trust-source-choice-muted";
  };

  if (finished) {
    const perfectScore = score === rounds.length;

    return (
      <div className="trust-source-game trust-source-finish">
        <h3>{perfectScore ? "Отлично!" : "Почти!"}</h3>
        <p>{perfectScore ? "Теперь ты умеешь проверять источники" : "Пройди ещё раз и попробуй найти все надёжные источники"}</p>
        <div className="trust-source-score">Очки: {score} из {rounds.length}</div>
        <div className="trust-source-finish-actions">
          <button className="ghost-button" type="button" onClick={restart}>
            Сыграть ещё
          </button>
          <button className="primary-button" type="button" onClick={onComplete}>
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trust-source-game">
      <div className="trust-source-top">
        <strong>{currentRoundIndex + 1} / {rounds.length}</strong>
        <div className="trust-source-progress" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="trust-source-board">
        <article className={answered ? `trust-source-card trust-source-card-${currentRound.correct}` : "trust-source-card"}>
          <div className="trust-source-site">
            <span aria-hidden="true">🌐</span>
            <span>{currentRound.site}</span>
          </div>
          <h3>{currentRound.title}</h3>
          <div className="trust-source-meta">
            <div>
              <span>Автор:</span>
              <strong>{currentRound.author || "нет"}</strong>
            </div>
            <div>
              <span>Дата:</span>
              <strong>{currentRound.date || "нет"}</strong>
            </div>
          </div>
        </article>

        <div className="trust-source-decision">
          <div>
            <h3>Можно ли доверять?</h3>
            <p>Проверь автора и дату, потом выбери один вариант.</p>
          </div>

          <div className="trust-source-actions">
            <button
              className={getAnswerClassName("trust")}
              type="button"
              onClick={() => chooseAnswer("trust")}
            >
              🟢 Можно доверять
            </button>
            <button
              className={getAnswerClassName("distrust")}
              type="button"
              onClick={() => chooseAnswer("distrust")}
            >
              🔴 Не доверяю
            </button>
          </div>

          {answered ? (
            <div className="trust-source-feedback">
              <strong>{currentRound.correct === "trust" ? "Хороший источник!" : "Будь осторожен"}</strong>
              <p>
                {currentRound.correct === "trust"
                  ? "Есть автор и дата — можно доверять"
                  : "Нет автора или даты — лучше не доверять"}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {answered ? (
        <button className="primary-button trust-source-next" type="button" onClick={goNext}>
          Следующий сайт
        </button>
      ) : null}
    </div>
  );
}

function FileNamesMiniGame({
  rounds,
  currentRoundIndex,
  answers,
  onAnswer,
  onNext,
  onRestart,
  onContinue,
  continueLabel = "Перейти к следующей части",
}) {
  const currentRound = rounds[currentRoundIndex] || null;
  const currentAnswer = answers[currentRoundIndex];
  const answered = currentAnswer !== undefined;
  const answeredCount = Math.min(Object.keys(answers).length, rounds.length);
  const score = rounds.reduce((sum, round, index) => sum + (answers[index] === round.correctIndex ? 10 : 0), 0);
  const complete = rounds.length > 0 && rounds.every((_, index) => answers[index] !== undefined) && currentRoundIndex >= rounds.length - 1;
  const progressPercent = rounds.length ? Math.round((answeredCount / rounds.length) * 100) : 0;

  return (
    <div className="filename-quiz-game">
      <div className="filename-quiz-head">
        <div className="filename-quiz-title">
          <span className="filename-quiz-star" aria-hidden="true">⭐</span>
          <div>
            <h3>Давай понятные имена</h3>
            <p>Выбери название, которое поможет быстро найти файл.</p>
          </div>
        </div>
        <div className="folder-sort-stats" aria-label="Статистика игры">
          <span>Очки: {score}</span>
          <span>Прогресс: {answeredCount}/{rounds.length}</span>
        </div>
      </div>

      <div className="filename-progress" aria-hidden="true">
        <div className="filename-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="filename-cat-tip">
        <span aria-hidden="true">🐱</span>
        <div>
          <strong>Совет от кота</strong>
          <p>Хорошее имя файла говорит, что внутри: тема, работа и дата помогают найти его быстрее.</p>
        </div>
      </div>

      {currentRound ? (
        <article className="filename-question-card">
          <div className="filename-situation">
            <span className="filename-icon-bubble" aria-hidden="true">🔎</span>
            <div>
              <span>Ситуация</span>
              <strong>{currentRound.situation}</strong>
            </div>
          </div>

          <div className="filename-options">
            {currentRound.options.map((option, index) => {
              const isCorrect = index === currentRound.correctIndex;
              const isSelected = currentAnswer === index;
              const className = [
                "filename-option-card",
                answered && isCorrect ? "filename-option-correct" : "",
                answered && isSelected && !isCorrect ? "filename-option-wrong" : "",
              ].filter(Boolean).join(" ");

              return (
                <button
                  key={option}
                  className={className}
                  type="button"
                  onClick={() => onAnswer(index)}
                  disabled={answered}
                >
                  <span className="filename-option-icon" aria-hidden="true">📄</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {answered ? (
            <div
              className={
                currentAnswer === currentRound.correctIndex
                  ? "filename-explanation filename-explanation-success"
                  : "filename-explanation filename-explanation-error"
              }
            >
              <span aria-hidden="true">📁</span>
              <div>
                <strong>
                  {currentAnswer === currentRound.correctIndex
                    ? "Супер! Такое имя легко найти"
                    : "Почти! Посмотри, какое имя понятнее"}
                </strong>
                <p>{currentRound.explanation}</p>
              </div>
            </div>
          ) : null}
        </article>
      ) : null}

      {complete ? (
        <div className="filename-victory-card">
          <span aria-hidden="true">⭐</span>
          <div>
            <strong>Отлично! Теперь твои файлы легко найти</strong>
            <p>Твой результат: {score} из 30 очков.</p>
          </div>
          <div className="filename-victory-actions">
            <button className="ghost-button" type="button" onClick={onRestart}>
              Сыграть еще раз
            </button>
            <button className="primary-button" type="button" onClick={onContinue}>
              {continueLabel}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="primary-button filename-next-button"
          type="button"
          onClick={onNext}
          disabled={!answered}
        >
          Следующий вопрос
        </button>
      )}
    </div>
  );
}

function FileCustomsGame({ rounds, onComplete, continueLabel = "Перейти к следующей части" }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const currentRound = rounds[currentRoundIndex] || null;
  const currentAnswer = answers[currentRoundIndex];
  const answered = currentAnswer !== undefined;
  const answeredCount = Math.min(Object.keys(answers).length, rounds.length);
  const correctCount = rounds.reduce((sum, round, index) => sum + (answers[index] === round.correctIndex ? 1 : 0), 0);
  const complete = rounds.length > 0 && answeredCount === rounds.length && currentRoundIndex >= rounds.length - 1;
  const progressPercent = rounds.length ? Math.round((answeredCount / rounds.length) * 100) : 0;
  const title = score <= 20 ? "Новичок таможни" : score <= 40 ? "Файловый инспектор" : "Мастер расширений";

  const splitFileName = (fileName) => {
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex === -1) {
      return { name: fileName, extension: "" };
    }

    return {
      name: fileName.slice(0, dotIndex),
      extension: fileName.slice(dotIndex),
    };
  };

  const resetGame = () => {
    setCurrentRoundIndex(0);
    setAnswers({});
    setScore(0);
    setStreak(0);
    setBestStreak(0);
  };

  const handleAnswer = (answerIndex) => {
    if (!currentRound || answered) {
      return;
    }

    const isCorrect = answerIndex === currentRound.correctIndex;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const bonus = isCorrect && nextStreak > 0 && nextStreak % 2 === 0 ? 5 : 0;

    setAnswers((current) => ({
      ...current,
      [currentRoundIndex]: answerIndex,
    }));
    setStreak(nextStreak);
    setBestStreak((current) => Math.max(current, nextStreak));
    if (isCorrect) {
      setScore((current) => current + 10 + bonus);
    }
  };

  const handleNext = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex((current) => current + 1);
    }
  };

  if (!currentRound) {
    return null;
  }

  const fileParts = splitFileName(currentRound.fileName);
  const currentExtension = fileParts.extension || "без расширения";

  return (
    <div className="file-customs-game">
      <div className="file-customs-top">
        <div className="file-customs-title">
          <span aria-hidden="true">🛃</span>
          <div>
            <h3>Файловая таможня</h3>
            <p>Кот проверяет файлы-посылки и отправляет их в правильный отдел.</p>
          </div>
        </div>
        <div className="file-customs-stats" aria-label="Статистика игры">
          <span>Прогресс: {answeredCount}/{rounds.length}</span>
          <span>Очки: {score}</span>
          <span>Серия: {streak}</span>
        </div>
      </div>

      <div className="file-customs-progress" aria-hidden="true">
        <div className="file-customs-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {complete ? (
        <section className="file-customs-finish">
          <span aria-hidden="true">⭐</span>
          <h3>Файловая таможня пройдена!</h3>
          <p>Ты научился смотреть на расширение и отправлять файлы в правильный отдел.</p>
          <div className="file-customs-result-grid">
            <div>
              <small>Итоговые очки</small>
              <strong>{score}</strong>
            </div>
            <div>
              <small>Правильные ответы</small>
              <strong>{correctCount}/{rounds.length}</strong>
            </div>
            <div>
              <small>Звание</small>
              <strong>{title}</strong>
            </div>
          </div>
          <div className="filename-victory-actions">
            <button className="ghost-button" type="button" onClick={resetGame}>
              Пройти еще раз
            </button>
            <button className="primary-button" type="button" onClick={onComplete}>
              {continueLabel}
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="file-customs-parcel">
            <div className="file-customs-cat">
              <span aria-hidden="true">🐱</span>
              <div>
                <strong>Кот на посту</strong>
                <p>{answered ? "Проверка завершена. Смотрим объяснение." : "Сначала найди расширение после точки."}</p>
              </div>
            </div>

            <div className="file-customs-card">
              <span className="file-customs-icon" aria-hidden="true">📦</span>
              <div className="file-customs-name" aria-label={`Файл ${currentRound.fileName}`}>
                <span>{fileParts.name}</span>
                <mark>{fileParts.extension}</mark>
              </div>
              <div className="file-customs-scanner">
                <span aria-hidden="true">🔎</span>
                <strong>Сканер: {currentExtension} найден</strong>
              </div>
              {answered ? <div className="file-customs-verdict">{currentRound.scannerVerdict}</div> : null}
            </div>
          </section>

          <section className="file-customs-question">
            <h4>{currentRound.question}</h4>
            <div className="file-customs-options">
              {currentRound.options.map((option, index) => {
                const isCorrect = index === currentRound.correctIndex;
                const isSelected = currentAnswer === index;
                const className = [
                  "file-customs-option",
                  answered && isCorrect ? "file-customs-option-correct" : "",
                  answered && isSelected && !isCorrect ? "file-customs-option-wrong" : "",
                ].filter(Boolean).join(" ");

                return (
                  <button
                    key={option}
                    className={className}
                    type="button"
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <span aria-hidden="true">{option === "Осторожно" ? "⚠️" : option === "Музыка" ? "🎵" : option === "Галерея" ? "🖼️" : option === "Презентации" ? "📊" : "📁"}</span>
                    <strong>{option}</strong>
                  </button>
                );
              })}
            </div>
          </section>

          {answered ? (
            <section
              className={
                currentAnswer === currentRound.correctIndex
                  ? "file-customs-feedback file-customs-feedback-success"
                  : "file-customs-feedback file-customs-feedback-error"
              }
            >
              <span aria-hidden="true">🐱</span>
              <div>
                <strong>
                  {currentAnswer === currentRound.correctIndex
                    ? "Верно! Файл прошёл таможню"
                    : "Почти! Таможня нашла лучший отдел"}
                </strong>
                <p>{currentRound.explanation}</p>
                {currentAnswer === currentRound.correctIndex && streak > 0 && streak % 2 === 0 ? (
                  <small>Бонус за серию: +5 очков</small>
                ) : null}
              </div>
            </section>
          ) : null}

          <button
            className="primary-button file-customs-next"
            type="button"
            onClick={handleNext}
            disabled={!answered}
          >
            Следующий файл
          </button>
        </>
      )}
    </div>
  );
}


export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [route, setRoute] = useState(() => parseRoute(getPath()));
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuthForm);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [modules, setModules] = useState([]);
  const [profile, setProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userAvatarMap, setUserAvatarMap] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_AVATAR_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [achievementDateMap, setAchievementDateMap] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_ACHIEVEMENT_DATES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminForm, setAdminForm] = useState(emptyAuthForm);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [challengeResult, setChallengeResult] = useState(null);
  const [dashboardError, setDashboardError] = useState("");
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [moduleStarted, setModuleStarted] = useState(false);
  const [currentLessonStep, setCurrentLessonStep] = useState(0);
  const [dangerAnswers, setDangerAnswers] = useState({});
  const [dangerMisses, setDangerMisses] = useState({});
  const [dangerFeedback, setDangerFeedback] = useState({
    tone: "neutral",
    text: "Нажимай только на опасные сообщения и объясняй себе, почему они подозрительны.",
  });
  const [dangerToast, setDangerToast] = useState("");
  const [dangerWarning, setDangerWarning] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [defenseAnswers, setDefenseAnswers] = useState({});
  const [defenseFeedback, setDefenseFeedback] = useState({
    tone: "neutral",
    text: "Разложи файлы по двум ящикам и следи за их расширениями.",
  });
  const [defenseToast, setDefenseToast] = useState("");
  const [draggedDefenseIndex, setDraggedDefenseIndex] = useState(null);
  const [selectedDefenseIndex, setSelectedDefenseIndex] = useState(null);
  const [activeDropzone, setActiveDropzone] = useState("");
  const [finalTestAnswers, setFinalTestAnswers] = useState({});
  const [finalQuestionIndex, setFinalQuestionIndex] = useState(0);
  const [partWarmups, setPartWarmups] = useState({});
  const [choiceGameAnswers, setChoiceGameAnswers] = useState({});
  const [folderSortAnswers, setFolderSortAnswers] = useState({});
  const [draggedFolderFileId, setDraggedFolderFileId] = useState("");
  const [selectedFolderFileId, setSelectedFolderFileId] = useState("");
  const [activeFolderId, setActiveFolderId] = useState("");
  const [shakingFolderId, setShakingFolderId] = useState("");
  const [folderSortHint, setFolderSortHint] = useState("");
  const [filenameQuizRound, setFilenameQuizRound] = useState(0);
  const [filenameQuizAnswers, setFilenameQuizAnswers] = useState({});
  const [achievementNotice, setAchievementNotice] = useState(null);

  const isRegisterMode = authMode === "register";
  const achievementMap = useMemo(
    () => new Map((profile?.achievements || []).map((achievement) => [achievement.code, achievement])),
    [profile?.achievements],
  );
  const unlockedAchievements = useMemo(
    () => (profile?.achievements || []).filter((achievement) => achievement.unlocked),
    [profile?.achievements],
  );

  
  useEffect(() => {
    if (!profile?.email || !unlockedAchievements.length) {
      return;
    }

    const userDates = achievementDateMap[profile.email] || {};
    let changed = false;
    const nextUserDates = { ...userDates };

    unlockedAchievements.forEach((achievement) => {
      if (!nextUserDates[achievement.code]) {
        nextUserDates[achievement.code] = getTodayLabel();
        changed = true;
      }
    });

    if (!changed) {
      return;
    }

    const nextMap = {
      ...achievementDateMap,
      [profile.email]: nextUserDates,
    };
    setAchievementDateMap(nextMap);
    localStorage.setItem(USER_ACHIEVEMENT_DATES_KEY, JSON.stringify(nextMap));
  }, [achievementDateMap, profile?.email, unlockedAchievements]);
  const isPasswordTooShort =
    isRegisterMode &&
    authForm.password.length > 0 &&
    authForm.password.length < MIN_PASSWORD_LENGTH;

  const selectedModule = useMemo(
    () => modules.find((module) => module.slug === route.slug) || null,
    [modules, route.slug],
  );
  const firstName = profile?.display_name?.split(" ")[0] || "друг";
  const selectedAvatarId = profile?.email ? userAvatarMap[profile.email] : "";
  const selectedAvatar =
    USER_AVATAR_OPTIONS.find((avatar) => avatar.id === selectedAvatarId) || null;
  const enhancedModule = selectedModule ? ENHANCED_MODULES[selectedModule.slug] || null : null;
  const currentEnhancedPart =
    enhancedModule && route.part
      ? enhancedModule.parts.find((part) => part.id === route.part) || null
      : null;

  useEffect(() => {
    function handlePopState() {
      setRoute(parseRoute(getPath()));
      setSelectedAnswer(null);
      setChallengeResult(null);
      setDashboardError("");
      setModuleStarted(false);
      setCurrentLessonStep(0);
      setDangerAnswers({});
      setDangerMisses({});
      setDangerFeedback({
        tone: "neutral",
        text: "Нажимай только на опасные сообщения и объясняй себе, почему они подозрительны.",
      });
      setDangerToast("");
      setDangerWarning("");
      setPasswordInput("");
      setDefenseAnswers({});
      setDefenseFeedback({
        tone: "neutral",
        text: "Разложи файлы по двум ящикам и следи за их расширениями.",
      });
      setDefenseToast("");
      setDraggedDefenseIndex(null);
      setSelectedDefenseIndex(null);
      setActiveDropzone("");
      setFinalTestAnswers({});
      setFinalQuestionIndex(0);
      setPartWarmups({});
      setChoiceGameAnswers({});
      setFolderSortAnswers({});
      setDraggedFolderFileId("");
      setSelectedFolderFileId("");
      setActiveFolderId("");
      setShakingFolderId("");
      setFolderSortHint("");
      setFilenameQuizRound(0);
      setFilenameQuizAnswers({});
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigateTo(pathname) {
    window.history.pushState({}, "", pathname);
    setRoute(parseRoute(pathname));
    setSelectedAnswer(null);
    setChallengeResult(null);
    setDashboardError("");
    setModuleStarted(false);
    setCurrentLessonStep(0);
    setDangerAnswers({});
    setDangerMisses({});
    setDangerFeedback({
      tone: "neutral",
      text: "Нажимай только на опасные сообщения и объясняй себе, почему они подозрительны.",
    });
    setDangerToast("");
    setDangerWarning("");
    setPasswordInput("");
    setDefenseAnswers({});
    setDefenseFeedback({
      tone: "neutral",
      text: "Разложи файлы по двум ящикам и следи за их расширениями.",
    });
    setDefenseToast("");
    setDraggedDefenseIndex(null);
    setSelectedDefenseIndex(null);
    setActiveDropzone("");
    setFinalTestAnswers({});
    setFinalQuestionIndex(0);
    setPartWarmups({});
    setChoiceGameAnswers({});
    setFolderSortAnswers({});
    setDraggedFolderFileId("");
    setSelectedFolderFileId("");
    setActiveFolderId("");
    setShakingFolderId("");
    setFolderSortHint("");
    setFilenameQuizRound(0);
    setFilenameQuizAnswers({});
  }

  async function apiFetch(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      setToken("");
      throw new Error("Сессия завершилась. Войди снова.");
    }

    return response;
  }

  function getApiErrorMessage(data, fallbackMessage) {
    if (typeof data?.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data?.detail)) {
      const passwordError = data.detail.find((item) => item.loc?.includes("password"));
      if (passwordError) {
        return `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов.`;
      }

      const nameError = data.detail.find((item) => item.loc?.includes("display_name"));
      if (nameError) {
        return "Имя ученика должно содержать минимум 2 символа.";
      }
    }

    return fallbackMessage;
  }

  async function loadDashboard() {
    if (!token) {
      setModules([]);
      setProfile(null);
      setLeaderboard([]);
      return;
    }

    setDashboardLoading(true);
    setDashboardError("");

    try {
      const [modulesResponse, profileResponse, leaderboardResponse] = await Promise.all([
        apiFetch("/academy/modules"),
        apiFetch("/academy/profile"),
        apiFetch("/academy/leaderboard"),
      ]);

      const [modulesData, profileData, leaderboardData] = await Promise.all([
        modulesResponse.json(),
        profileResponse.json(),
        leaderboardResponse.json(),
      ]);

      setModules(modulesData);
      setProfile(profileData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      setDashboardError(error.message);
    } finally {
      setDashboardLoading(false);
    }
  }

  async function loadAdminData() {
    if (!token || !profile?.is_admin) {
      setAdminUsers([]);
      return;
    }

    setAdminLoading(true);
    setAdminError("");

    try {
      const response = await apiFetch("/academy/admin/users-progress");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Не удалось загрузить данные админки"));
      }
      setAdminUsers(data);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setAdminLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [token]);

  useEffect(() => {
    localStorage.setItem(USER_AVATAR_STORAGE_KEY, JSON.stringify(userAvatarMap));
  }, [userAvatarMap]);

  useEffect(() => {
    if (route.page === "admin" && profile?.is_admin) {
      loadAdminData();
    }
  }, [route.page, profile?.is_admin]);

  useEffect(() => {
    if (
      (route.page === "module" ||
        route.page === "module_part" ||
        route.page === "module_game" ||
        route.page === "module_test") &&
      route.slug &&
      !selectedModule &&
      modules.length > 0
    ) {
      navigateTo("/academy");
    }
  }, [route.page, route.slug, selectedModule, modules]);

  useEffect(() => {
    if (route.page === "module_test" && selectedModule && enhancedModule) {
      navigateTo(`/modules/${selectedModule.slug}`);
    }
  }, [route.page, selectedModule, enhancedModule]);

  useEffect(() => {
    if (!dangerToast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setDangerToast("");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [dangerToast]);

  useEffect(() => {
    if (!achievementNotice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setAchievementNotice(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [achievementNotice]);

  useEffect(() => {
    if (!defenseToast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setDefenseToast("");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [defenseToast]);

  useEffect(() => {
    if (!selectedModule) {
      setModuleStarted(false);
      setCurrentLessonStep(0);
      return;
    }

    if (route.page === "module_test") {
      setModuleStarted(true);
      setCurrentLessonStep(selectedModule.lesson_steps.length - 1);
      return;
    }

    setModuleStarted(Boolean(selectedModule.progress?.completed));
    setCurrentLessonStep(0);
  }, [selectedModule, route.page]);

  function handleAuthChange(event) {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  }

  function handleAdminFormChange(event) {
    const { name, value } = event.target;
    setAdminForm((current) => ({ ...current, [name]: value }));
  }

  function handleAvatarSelect(avatarId) {
    if (!profile?.email) {
      return;
    }

    setUserAvatarMap((current) => ({
      ...current,
      [profile.email]: avatarId,
    }));
    setAvatarPickerOpen(false);
  }

  function getAvatarByEmail(email) {
    const avatarId = userAvatarMap[email];
    return USER_AVATAR_OPTIONS.find((avatar) => avatar.id === avatarId) || null;
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthError("");
    setAuthMessage("");
    setAuthForm(emptyAuthForm);
    setAvatarPickerOpen(false);
    setChallengeResult(null);
    setSelectedAnswer(null);
    navigateTo("/academy");
  }

  async function handleRegister(event) {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");

    if (authForm.password.length < MIN_PASSWORD_LENGTH) {
      setAuthError(`Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов.`);
      setAuthLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authForm),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(getApiErrorMessage(data, "Не удалось зарегистрироваться"));
      }

      setAuthMode("login");
      setAuthMessage("Регистрация прошла успешно. Теперь войди и начни свое путешествие по ЦифроГраду.");
      setAuthForm(emptyAuthForm);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authForm.email,
          password: authForm.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(getApiErrorMessage(data, "Не удалось войти"));
      }

      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.access_token);
      setToken(data.access_token);
      setAuthForm(emptyAuthForm);
      navigateTo("/academy");
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleAdminCreateUser(event) {
    event.preventDefault();
    setAdminError("");
    setAdminMessage("");

    try {
      const response = await apiFetch("/auth/admin/users", {
        method: "POST",
        body: JSON.stringify(adminForm),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Не удалось создать пользователя"));
      }

      setAdminMessage(`Пользователь ${data.display_name} создан.`);
      setAdminForm(emptyAuthForm);
      await loadAdminData();
    } catch (error) {
      setAdminError(error.message);
    }
  }

  async function handleAdminDeleteUser(userId, displayName) {
    const confirmed = window.confirm(`Удалить пользователя ${displayName}?`);
    if (!confirmed) {
      return;
    }

    setAdminError("");
    setAdminMessage("");

    try {
      const response = await apiFetch(`/academy/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(getApiErrorMessage(data, "Не удалось удалить пользователя"));
      }

      setAdminMessage(`Пользователь ${displayName} удалён.`);
      await loadAdminData();
    } catch (error) {
      setAdminError(error.message);
    }
  }

  async function handleSubmitChallenge() {
    if (!selectedModule) {
      return;
    }

    if (selectedAnswer === null) {
      setDashboardError("Выбери ответ перед отправкой теста.");
      return;
    }

    setDashboardError("");

    try {
      const response = await apiFetch(`/academy/modules/${selectedModule.slug}/submit`, {
        method: "POST",
        body: JSON.stringify({ selected_index: selectedAnswer }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Не удалось сохранить результат"));
      }

      setChallengeResult(data);
      if (data.unlocked_achievements?.length) {
        const todayLabel = getTodayLabel();
        if (authForm.email || profile?.email) {
          const currentEmail = profile?.email || authForm.email;
          const userDates = achievementDateMap[currentEmail] || {};
          const nextUserDates = { ...userDates };
          data.unlocked_achievements.forEach((item) => {
            nextUserDates[item.code] = todayLabel;
          });
          const nextMap = {
            ...achievementDateMap,
            [currentEmail]: nextUserDates,
          };
          setAchievementDateMap(nextMap);
          localStorage.setItem(USER_ACHIEVEMENT_DATES_KEY, JSON.stringify(nextMap));
        }
        setAchievementNotice({
          date: todayLabel,
          items: data.unlocked_achievements,
        });
      }
      await loadDashboard();
      if (data.correct) {
        navigateTo(TASKS_ROUTE);
      }
    } catch (error) {
      setDashboardError(error.message);
    }
  }

  function handleStartModule() {
    setModuleStarted(true);
    setCurrentLessonStep(0);
  }

  function handleAdvanceLessonStep() {
    if (!selectedModule) {
      return;
    }

    if (currentLessonStep >= selectedModule.lesson_steps.length - 1) {
      navigateTo(`/modules/${selectedModule.slug}/test`);
      return;
    }

    setCurrentLessonStep((current) => Math.min(current + 1, selectedModule.lesson_steps.length - 1));
  }

  function getAnswerClassName(index) {
    if (!challengeResult) {
      return selectedAnswer === index ? "answer-card active" : "answer-card";
    }

    if (index === selectedModule?.minigame.correct_index) {
      return "answer-card answer-correct";
    }

    if (index === selectedAnswer && !challengeResult.correct) {
      return "answer-card answer-wrong";
    }

    return selectedAnswer === index ? "answer-card active" : "answer-card";
  }

  function getEnhancedPartStatus(partId) {
    if (route.page === "module_test") {
      return "done";
    }
    if (!route.part) {
      return "pending";
    }
    if (partId < route.part) {
      return "done";
    }
    if (partId === route.part) {
      return "current";
    }
    return "pending";
  }

  function handleWarmupAnswer(partId, answerIndex) {
    setPartWarmups((current) => ({
      ...current,
      [partId]: answerIndex,
    }));
  }

  function getPasswordStrength() {
    const password = passwordInput.trim();
    const hasLetters = /[A-Za-zА-Яа-я]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecial = /[!@#$%]/.test(password);
    const onlyDigits = /^\d+$/.test(password);
    const onlyLetters = /^[A-Za-zА-Яа-я]+$/.test(password);

    if (!password) {
      return { label: "Введи пароль, чтобы проверить силу", tone: "empty", fill: 0 };
    }

    if (password.length >= 8 && hasLetters && hasDigits && hasSpecial) {
      return { label: "Отлично 🛡", tone: "strong", fill: 100 };
    }

    if (password.length >= 6 && password.length <= 7 && hasLetters && hasDigits) {
      return { label: "Хорошо 👍", tone: "medium", fill: 66 };
    }

    if (password.length < 6 || onlyDigits || onlyLetters) {
      return { label: "Слабый 👎", tone: "weak", fill: 33 };
    }

    return { label: "Слабый 👎", tone: "weak", fill: 33 };
  }

  function handleDangerChoice(scenario, index, choice) {
    if (dangerAnswers[index]) {
      setDangerToast("Это сообщение уже отмечено.");
      return;
    }

    setDangerWarning("");

    if (choice === scenario.correct) {
      setDangerAnswers((current) => ({
        ...current,
        [index]: choice,
      }));
      setDangerMisses((current) => {
        const next = { ...current };
        delete next[index];
        return next;
      });
      setDangerFeedback({
        tone: choice === "danger" ? "success" : "neutral",
        text: scenario.explanation,
      });
      setDangerToast(choice === "danger" ? "Верно! Ты нашёл опасное сообщение." : "Верно! Это безопасное сообщение.");
      return;
    }

    setDangerMisses((current) => ({
      ...current,
      [index]: true,
    }));
    setDangerFeedback({
      tone: "warning",
      text: `Неверно. Попробуй ещё раз. ${scenario.explanation}`,
    });
    setDangerWarning(
      choice === "danger"
        ? "Неверно: это сообщение не выглядит опасным. Попробуй ещё раз."
        : "Неверно: здесь есть признак опасности. Попробуй ещё раз."
    );
  }

  function handleDangerNext(nextPath, dangerScore, totalScenarios) {
    if (dangerScore < totalScenarios) {
      setDangerWarning("Сначала правильно разбери все сообщения.");
      return;
    }

    setDangerWarning("");
    navigateTo(nextPath);
  }

  function getEnhancedGameNextPath(partId = currentEnhancedPart?.id) {
    if (!selectedModule || !enhancedModule || !partId) {
      return "/academy";
    }

    if (selectedModule.slug === FILE_LAB_MODULE_SLUG && partId < enhancedModule.parts.length) {
      return `/modules/${selectedModule.slug}/parts/${partId + 1}/game`;
    }

    return partId === enhancedModule.parts.length
      ? TASKS_ROUTE
      : `/modules/${selectedModule.slug}/parts/${partId + 1}`;
  }

  async function completeEnhancedModule(redirectPath = TASKS_ROUTE) {
    if (!selectedModule) {
      return;
    }

    setDashboardError("");

    try {
      const response = await apiFetch(`/academy/modules/${selectedModule.slug}/submit`, {
        method: "POST",
        body: JSON.stringify({ selected_index: selectedModule.minigame.correct_index }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Не удалось сохранить результат"));
      }

      setChallengeResult({
        ...data,
        explanation: "Модуль завершён!",
      });
      if (data.unlocked_achievements?.length) {
        const todayLabel = getTodayLabel();
        if (profile?.email) {
          const userDates = achievementDateMap[profile.email] || {};
          const nextUserDates = { ...userDates };
          data.unlocked_achievements.forEach((item) => {
            nextUserDates[item.code] = todayLabel;
          });
          const nextMap = {
            ...achievementDateMap,
            [profile.email]: nextUserDates,
          };
          setAchievementDateMap(nextMap);
          localStorage.setItem(USER_ACHIEVEMENT_DATES_KEY, JSON.stringify(nextMap));
        }
        setAchievementNotice({
          date: todayLabel,
          items: data.unlocked_achievements,
        });
      }
      await loadDashboard();
      navigateTo(redirectPath);
    } catch (error) {
      setDashboardError(error.message);
    }
  }

  function handleFilenameQuizAnswer(answerIndex) {
    const currentRound = currentEnhancedPart?.rounds?.[filenameQuizRound];
    if (!currentRound || filenameQuizAnswers[filenameQuizRound] !== undefined) {
      return;
    }

    setFilenameQuizAnswers((current) => ({
      ...current,
      [filenameQuizRound]: answerIndex,
    }));
  }

  function handleFilenameQuizNext(nextPath) {
    const totalRounds = currentEnhancedPart?.rounds?.length || 0;
    if (filenameQuizRound < totalRounds - 1) {
      setFilenameQuizRound((current) => current + 1);
      return;
    }

    navigateTo(nextPath);
  }

  function sortDefenseFile(fileIndex, targetBucket) {
    if (!currentEnhancedPart?.scenarios?.[fileIndex]) {
      return;
    }

    const file = currentEnhancedPart.scenarios[fileIndex];
    if (defenseAnswers[fileIndex]) {
      setDefenseToast("Этот файл уже отсортирован.");
      return;
    }

    setActiveDropzone("");
    setDraggedDefenseIndex(null);
    setSelectedDefenseIndex(null);

    if (file.target === targetBucket) {
      setDefenseAnswers((current) => ({
        ...current,
        [fileIndex]: targetBucket,
      }));
      setDefenseFeedback({
        tone: "success",
        text: file.explanation,
      });
      return;
    }

    setDefenseFeedback({
      tone: "error",
      text:
        targetBucket === "safe"
          ? "Этот файл выглядит подозрительно. Его лучше не открывать сразу."
          : "Этот файл можно открыть. Попробуй ещё раз и выбери другой ящик.",
    });
    setDefenseToast(
      targetBucket === "safe"
        ? "Этот файл подозрительный. Попробуй ещё раз."
        : "Этот файл безопасен. Попробуй ещё раз.",
    );
  }

  function sortFolderFile(fileId, folderId) {
    const file = currentEnhancedPart?.files?.find((item) => item.id === fileId);
    if (!file || folderSortAnswers[fileId]) {
      return;
    }

    setDraggedFolderFileId("");
    setSelectedFolderFileId("");
    setActiveFolderId("");

    if (file.targetFolder === folderId) {
      const nextAnswers = {
        ...folderSortAnswers,
        [fileId]: folderId,
      };
      const totalFiles = currentEnhancedPart.files?.length || 0;
      const isComplete = totalFiles > 0 && Object.keys(nextAnswers).length >= totalFiles;

      setFolderSortAnswers((current) => ({
        ...current,
        [fileId]: folderId,
      }));
      setFolderSortHint("");

      return;
    }

    setFolderSortHint("Попробуй еще раз");
    setShakingFolderId(folderId);
    window.setTimeout(() => {
      setShakingFolderId((current) => (current === folderId ? "" : current));
    }, 420);
  }

  async function handleFinishEnhancedTest() {
    if (!selectedModule || !enhancedModule) {
      return;
    }

    const score = enhancedModule.finalTest.reduce(
      (sum, question, index) => sum + (finalTestAnswers[index] === question.correctIndex ? 1 : 0),
      0,
    );

    if (score < enhancedModule.finalTest.length) {
      setChallengeResult({
        correct: false,
        explanation: `У тебя ${score} правильных ответов из ${enhancedModule.finalTest.length}. Попробуй ещё раз, ты молодец!`,
      });
      return;
    }

    setDashboardError("");

    try {
      const response = await apiFetch(`/academy/modules/${selectedModule.slug}/submit`, {
        method: "POST",
        body: JSON.stringify({ selected_index: selectedModule.minigame.correct_index }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Не удалось сохранить результат"));
      }

      setChallengeResult({
        ...data,
        explanation: `Отличная работа! У тебя ${score} правильных ответов из ${enhancedModule.finalTest.length}.`,
      });
      if (data.unlocked_achievements?.length) {
        const todayLabel = getTodayLabel();
        if (profile?.email) {
          const userDates = achievementDateMap[profile.email] || {};
          const nextUserDates = { ...userDates };
          data.unlocked_achievements.forEach((item) => {
            nextUserDates[item.code] = todayLabel;
          });
          const nextMap = {
            ...achievementDateMap,
            [profile.email]: nextUserDates,
          };
          setAchievementDateMap(nextMap);
          localStorage.setItem(USER_ACHIEVEMENT_DATES_KEY, JSON.stringify(nextMap));
        }
        setAchievementNotice({
          date: todayLabel,
          items: data.unlocked_achievements,
        });
      }
      await loadDashboard();
      navigateTo(TASKS_ROUTE);
    } catch (error) {
      setDashboardError(error.message);
    }
  }

  function renderAuthScreen() {
    return (
      <section className="auth-layout">
        <div className="panel auth-panel">
          <div className="switcher">
            <button
              className={authMode === "login" ? "switch-button active" : "switch-button"}
              type="button"
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
                setAuthMessage("");
              }}
            >
              Войти
            </button>
            <button
              className={authMode === "register" ? "switch-button active" : "switch-button"}
              type="button"
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
                setAuthMessage("");
              }}
            >
              Регистрация
            </button>
          </div>

          <form className="form" onSubmit={authMode === "login" ? handleLogin : handleRegister}>
            {isRegisterMode ? (
              <label>
                <span>Имя ученика</span>
                <input
                  name="display_name"
                  value={authForm.display_name}
                  onChange={handleAuthChange}
                  placeholder="Например, Миша"
                />
              </label>
            ) : null}

            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={authForm.email}
                onChange={handleAuthChange}
                placeholder="hero@example.com"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={authForm.password}
                onChange={handleAuthChange}
                placeholder={`Минимум ${MIN_PASSWORD_LENGTH} символов`}
              />
              {isRegisterMode ? (
                <small className={isPasswordTooShort ? "field-hint field-hint-error" : "field-hint"}>
                  Для безопасности пароль должен содержать минимум {MIN_PASSWORD_LENGTH} символов.
                </small>
              ) : null}
            </label>

            <button className="primary-button" disabled={authLoading} type="submit">
              {authLoading
                ? "Подожди..."
                : isRegisterMode
                  ? "Создать профиль"
                  : "Войти в платформу"}
            </button>
          </form>

          {authMessage ? <p className="success">{authMessage}</p> : null}
          {authError ? <p className="error">{authError}</p> : null}
        </div>
      </section>
    );
  }

  function renderTopPanel() {
    return (
      <section className="overview-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Профиль ученика</p>
            <h2>{profile?.display_name}</h2>
          </div>
          <button className="ghost-button" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Уровень</span>
            <strong>{profile?.level_title}</strong>
          </div>
          <div className="stat-card">
            <span>Очки</span>
            <strong>{profile?.total_points ?? 0}</strong>
          </div>
          <div className="stat-card">
            <span>Пройдено тем</span>
            <strong>
              {profile?.completed_modules ?? 0}/{profile?.total_modules ?? 0}
            </strong>
          </div>
        </div>
      </section>
    );
  }

  function renderTopbar() {
    return (
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-building brand-building-blue" />
            <span className="brand-building brand-building-green" />
            <span className="brand-building brand-building-yellow" />
            <span className="brand-building brand-building-purple" />
          </div>
          <div className="brand-block">
            <div className="brand-text">{BRAND_NAME}</div>
            <div className="brand-subtitle">учимся. создаём. понимаем цифровой мир</div>
          </div>
        </div>

        <div className="topbar-user">
          <button className="topbar-user-card" type="button" onClick={() => navigateTo("/profile")}>
            <div className="sidebar-avatar topbar-avatar">
              {selectedAvatar ? (
                <img className="user-avatar-image" src={selectedAvatar.src} alt="" aria-hidden="true" />
              ) : (
                firstName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="topbar-user-copy">
              <strong>{profile?.display_name}</strong>
              <span>{profile?.total_points ?? 0} очков</span>
            </div>
          </button>
          <button className="topbar-logout" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </header>
    );
  }

  function renderSidebar() {
    const menuItems = [
      {
        label: "Главная",
        path: "/academy",
        active: route.page === "academy",
        iconSrc: homeIcon,
      },
      {
        label: "Профиль",
        path: "/profile",
        active: route.page === "profile",
        iconSrc: profileIcon,
      },
      {
        label: "Таблица лидеров",
        path: "/leaderboard",
        active: route.page === "leaderboard",
        iconSrc: leaderboardIcon,
      },
      {
        label: "Достижения",
        path: "/achievements",
        active: route.page === "achievements",
        iconSrc: achievementsIcon,
      },
      {
        label: "Магазин",
        path: "/shop",
        active: route.page === "shop",
        iconSrc: shopIcon,
      },
      {
        label: "Задания",
        path: "/tasks",
        active:
          route.page === "tasks" ||
          route.page === "module" ||
          route.page === "module_part" ||
          route.page === "module_game" ||
          route.page === "module_test",
        iconSrc: tasksIcon,
      },
    ];

    if (profile?.is_admin) {
      menuItems.push({
        label: "Админка",
        path: "/admin",
        active: route.page === "admin",
        iconSrc: adminIcon,
      });
    }

    return (
      <aside className="sidebar-panel" aria-label="Отделы академии">
        <nav className="side-nav">
          {menuItems.map((item) => (
            <button
              className={item.active ? "side-nav-button active" : "side-nav-button"}
              key={item.path}
              type="button"
              onClick={() => navigateTo(item.path)}
            >
              <img className="side-nav-icon-image" src={item.iconSrc} alt="" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" aria-hidden="true" />

      </aside>
    );
  }

  function renderAcademyHome() {
    const availableCoursesImage = ACHIEVEMENT_IMAGES["start-graduate"];
    const completedCoursesImage = ACHIEVEMENT_IMAGES["start-achievment"];
    const routeLeftImage = ACHIEVEMENT_IMAGES["hero-left"];
    const routeRightImage = ACHIEVEMENT_IMAGES["hero-right"];

    return (
      <section className="academy-home dashboard-home">
        <article className="panel city-banner">
          <div className="city-banner-copy">
            <p className="eyebrow">Добро пожаловать</p>
            <h2>Выбери курс и отправляйся исследовать цифровой мир вместе с ЦифроГрадом</h2>
            <p>
              Короткие модули, понятные примеры и игровые задания помогают детям уверенно,
              безопасно и с интересом осваивать цифровую грамотность.
            </p>
            <div className="city-badges">
              <span className="city-badge city-badge-safety">Безопасность</span>
              <span className="city-badge city-badge-create">Создание</span>
              <span className="city-badge city-badge-chat">Общение</span>
            </div>
          </div>
          <div className="city-visual" aria-hidden="true">
            <div className="city-sun" />
            <div className="city-cloud city-cloud-a" />
            <div className="city-cloud city-cloud-b" />
            <div className="city-buildings">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </article>

        <div className="home-grid home-grid-stats">
          <article className="panel metric-card">
            {availableCoursesImage ? (
              <img className="metric-card-image" src={availableCoursesImage} alt="" aria-hidden="true" />
            ) : null}
            <div className="metric-card-copy">
              <strong>{modules.length}</strong>
              <span>Курсов доступно</span>
            </div>
          </article>
          <article className="panel metric-card">
            {completedCoursesImage ? (
              <img className="metric-card-image" src={completedCoursesImage} alt="" aria-hidden="true" />
            ) : null}
            <div className="metric-card-copy">
              <strong>{profile?.completed_modules ?? 0}</strong>
              <span>Курсов пройдено</span>
            </div>
          </article>
        </div>

        <article className="panel exchange-banner">
          <div className="exchange-art exchange-art-left" aria-hidden="true">
            {routeLeftImage ? <img src={routeLeftImage} alt="" /> : null}
          </div>
          <div className="exchange-content">
            <strong>Маршрут по ЦифроГраду</strong>
            <p>
              Начни с базовых правил безопасности, потом перейди к общению, поиску информации
              и творческим цифровым проектам.
            </p>
            <button className="exchange-button" type="button" onClick={() => navigateTo("/tasks")}>
              Смотреть курсы
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="exchange-art exchange-art-right" aria-hidden="true">
            {routeRightImage ? <img src={routeRightImage} alt="" /> : null}
          </div>
        </article>
      </section>
    );
  }

  function renderTasksPage() {
    return (
      <section className="academy-home dashboard-home">
        <article className="panel module-tasks-panel">
          <div className="module-tasks-heading">
            <div>
              <h3>Задания</h3>
              <p>Выполняй задания, набирай очки и открывай новые модули</p>
            </div>
            <span className="module-tasks-count">
              <span aria-hidden="true">★</span>
              {modules.length} задания
            </span>
          </div>

          <div className="module-gallery compact-gallery">
            {modules.map((module, index) => (
            <article className="module-portal" key={module.slug}>
              <div className="module-portal-image-wrap" aria-hidden="true">
                <img
                  className="module-portal-image"
                  src={MODULE_IMAGES[String(index + 1)]}
                  alt=""
                />
              </div>

              <div className="module-portal-content">
                <div className="module-topline">
                  <p className="module-zone">{module.city_zone}</p>
                  <span className="module-state">
                    {module.progress?.completed ? "Готово" : "В процессе"}
                  </span>
                </div>
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
                <div className="module-meta">
                  <span className="module-points">
                    <span aria-hidden="true">★</span>
                    {module.reward_points} очков
                  </span>
                  <span className={module.progress?.completed ? "module-progress done" : "module-progress"}>
                    <span aria-hidden="true">{module.progress?.completed ? "✓" : "!"}</span>
                    {module.progress?.completed ? "Пройдено" : "Новая миссия"}
                  </span>
                </div>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => navigateTo(`/modules/${module.slug}`)}
                >
                  Открыть модуль
                </button>
              </div>
            </article>
            ))}
          </div>

          <div className="module-tasks-footer">
            <span aria-hidden="true">♜</span>
            <p>Проходи задания и получай очки — они помогут тебе стать экспертом цифрового мира!</p>
            <span aria-hidden="true">✦</span>
          </div>
        </article>
      </section>
    );
  }

  function renderProfile() {
    return (
      <section className="profile-page">
        <article className="panel profile-hero">
          <div className="profile-hero-main">
            <div className="profile-avatar-stack">
              <div className="profile-avatar-large">
                {selectedAvatar ? (
                  <img className="user-avatar-image large" src={selectedAvatar.src} alt="" aria-hidden="true" />
                ) : (
                  firstName.charAt(0).toUpperCase()
                )}
              </div>
              <button
                className="ghost-button avatar-trigger"
                type="button"
                onClick={() => setAvatarPickerOpen((current) => !current)}
              >
                Выбрать аватарку
              </button>
              {avatarPickerOpen ? (
                <div className="avatar-picker-popover">
                  <div className="avatar-picker-grid compact">
                    {USER_AVATAR_OPTIONS.map((avatar) => (
                      <button
                        key={avatar.id}
                        className={selectedAvatarId === avatar.id ? "avatar-option active" : "avatar-option"}
                        type="button"
                        onClick={() => handleAvatarSelect(avatar.id)}
                      >
                        <img className="avatar-option-image" src={avatar.src} alt={avatar.label} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <p className="eyebrow">Личный кабинет</p>
              <h2>{profile?.display_name}</h2>
              <p className="profile-copy">
                Здесь собраны твои успехи, уровень, баллы и достижения в ЦифроГраде.
              </p>
            </div>
          </div>
          <div className="profile-level-badge">
            <span>Твой уровень</span>
            <strong>{profile?.level_title}</strong>
          </div>
        </article>

        <div className="profile-stats-grid">
          <article className="panel metric-card">
            <strong>{profile?.total_points ?? 0}</strong>
            <span>Баллов</span>
          </article>
          <article className="panel metric-card">
            <strong>{profile?.completed_modules ?? 0}</strong>
            <span>Курсов завершено</span>
          </article>
          <article className="panel metric-card">
            <strong>{profile?.total_modules ?? modules.length}</strong>
            <span>Всего курсов</span>
          </article>
        </div>

        <article className="panel profile-progress">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Прогресс</p>
              <h2>Как ты продвигаешься</h2>
            </div>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.max(
                  8,
                  ((profile?.completed_modules ?? 0) / Math.max(profile?.total_modules ?? modules.length, 1)) *
                    100,
                )}%`,
              }}
            />
          </div>
          <p className="muted">
            Ты прошёл {profile?.completed_modules ?? 0} из {profile?.total_modules ?? modules.length} курсов.
          </p>
        </article>

      </section>
    );
  }

  function renderModulePage() {
    if (!selectedModule) {
      return <p className="muted">Модуль не найден.</p>;
    }

    if (enhancedModule) {
      return (
        <section className="module-page safety-part-page">
          <article
            className={
              selectedModule.slug === SAFETY_MODULE_SLUG
                ? "panel module-overview-card module-overview-card-illustrated module1-overview-card"
                : "panel module-overview-card module-overview-card-illustrated"
            }
          >
            <img
              className={
                selectedModule.slug === SAFETY_MODULE_SLUG
                  ? "module-overview-image module1-overview-image"
                  : "module-overview-image"
              }
              src={getEnhancedModuleStartImage()}
              alt={selectedModule.title}
            />
            <button
              className="primary-button module-overview-start-button"
              type="button"
              onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/1`)}
            >
              Начать модуль
            </button>
          </article>
        </section>
      );
    }

    const step = selectedModule.lesson_steps[currentLessonStep];

    return (
      <section className="module-page">
        <div className="panel module-page-head">
          <button className="ghost-button" type="button" onClick={() => navigateTo("/academy")}>
            Назад к заданиям
          </button>

          <div className="module-page-title">
            <p className="eyebrow">{selectedModule.city_zone}</p>
            <h2>{selectedModule.title}</h2>
            <p className="hero-text">{selectedModule.objective}</p>
          </div>

          <div className="pill">
            {selectedModule.progress?.earned_points ?? 0}/{selectedModule.reward_points} очков
          </div>
        </div>

        {dashboardError ? <p className="inline-note">{dashboardError}</p> : null}

        {!moduleStarted ? (
          <article className="panel module-start-card">
            <div className="module-start-visual" aria-hidden="true">
              <div className="start-badge">Старт</div>
              <div className="start-orb start-orb-blue" />
              <div className="start-orb start-orb-green" />
              <div className="start-orb start-orb-yellow" />
            </div>
            <div className="module-start-copy">
              <p className="eyebrow">Начало прохождения</p>
              <h3>{selectedModule.title}</h3>
              <p>{selectedModule.summary}</p>
              <div className="story-strip">
                {selectedModule.story_frames.map((frame) => (
                  <article className="story-card" key={frame.title}>
                    <h3>{frame.title}</h3>
                    <p>{frame.text}</p>
                  </article>
                ))}
              </div>
              <button className="primary-button" type="button" onClick={handleStartModule}>
                Начать прохождение
              </button>
            </div>
          </article>
        ) : (
          <article className="panel step-screen">
            <div className="step-screen-head">
              <div className={`step-illustration step-illustration-${currentLessonStep % 4}`} aria-hidden="true">
                <span>
                  {currentLessonStep % 4 === 0 ? "🛡️" : currentLessonStep % 4 === 1 ? "💬" : currentLessonStep % 4 === 2 ? "💡" : "💻"}
                </span>
              </div>
              <div>
                <p className="eyebrow">Шаг {currentLessonStep + 1}</p>
                <h3>{step.title}</h3>
              </div>
            </div>
            <p className="step-screen-copy">{step.text}</p>
            <div className="step-progress-row">
              {selectedModule.lesson_steps.map((lessonStep, index) => (
                <span
                  key={lessonStep.title}
                  className={index === currentLessonStep ? "step-progress-dot active" : "step-progress-dot"}
                />
              ))}
            </div>
            <button className="primary-button" type="button" onClick={handleAdvanceLessonStep}>
              {currentLessonStep === selectedModule.lesson_steps.length - 1
                ? "Перейти к тесту"
                : "Продолжить"}
            </button>
          </article>
        )}
      </section>
    );
  }

  function renderEnhancedModuleNav() {
    if (!enhancedModule || !selectedModule) {
      return null;
    }

    return (
      <div className="module-parts-nav">
        {enhancedModule.parts.map((part) => {
          const status = getEnhancedPartStatus(part.id);
          const className =
            status === "current"
              ? "module-part-chip module-part-chip-current"
              : status === "done"
                ? "module-part-chip module-part-chip-done"
                : "module-part-chip";

          return (
            <button
              key={part.id}
              className={className}
              type="button"
              onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/${part.id}`)}
            >
              {part.title}
            </button>
          );
        })}
      </div>
    );
  }

  function getSafetyPartLearnText(part) {
    if (part.learnText) {
      return part.learnText;
    }

    if (part.id === 1) {
      return "как замечать опасные сообщения, ссылки и файлы";
    }

    if (part.id === 2) {
      return "как создавать надёжные пароли и защищать свои данные";
    }

    return "как обновления и антивирус помогают защищать устройство";
  }

  function getEnhancedModuleStartImage() {
    return ENHANCED_MODULE_START_IMAGES[selectedModule?.slug] || module1Start;
  }

  function getEnhancedModuleHeroImage() {
    return ENHANCED_MODULE_HERO_IMAGES[selectedModule?.slug] || module1FrontbarHero;
  }

  function renderSafetyPartHero(part) {
    const learnIcon = part.learnIcon || "🔒";
    const heroMascotClassName =
      selectedModule?.slug === DIGITAL_ETHICS_MODULE_SLUG ? "hero-mascot hero-mascot-compact" : "hero-mascot";

    return (
      <article
        className={
          selectedModule?.slug === SAFETY_MODULE_SLUG
            ? "panel safety-part-hero password-part-hero hero-card password-hero-card enhanced-module-part-hero safety-module-part-hero"
            : "panel safety-part-hero password-part-hero hero-card password-hero-card enhanced-module-part-hero"
        }
      >
        <div className="password-hero-inner">
          <div className="safety-part-hero-copy hero-content">
            <button className="ghost-button back-button" type="button" onClick={() => navigateTo(`/modules/${selectedModule.slug}`)}>
              К обзору модуля
            </button>
            <p className="eyebrow">Часть {part.id}</p>
            <h2>{part.title}</h2>
            <p className="hero-text">{part.introTitle}</p>
            <div className="password-learn-card">
              <span className="password-learn-icon" aria-hidden="true">{learnIcon}</span>
              <div>
                <strong>Ты узнаешь:</strong>
                <p>{getSafetyPartLearnText(part)}</p>
              </div>
            </div>
          </div>

          <div className="safety-part-hero-art hero-visual" aria-hidden="true">
            <span className="visual-bg" />
            <span className="decor decor-lock">🔒</span>
            <span className="decor decor-sparkle">✨</span>
            <span className="decor decor-star">⭐</span>
            <img className={heroMascotClassName} src={getEnhancedModuleHeroImage()} alt="" />
          </div>
        </div>
      </article>
    );
  }

  function renderEnhancedModulePartPage() {
    if (!selectedModule || !enhancedModule || !currentEnhancedPart) {
      return <p className="muted">Часть модуля не найдена.</p>;
    }

    const warmupAnswer = partWarmups[currentEnhancedPart.id];
    const warmupCorrect = warmupAnswer === currentEnhancedPart.warmupCorrect;

    if (selectedModule.slug === SAFETY_MODULE_SLUG && currentEnhancedPart.id === 1) {
      const warmupVisuals = [
        { icon: "🎁", label: "«Вы выиграли приз»" },
        { icon: "✉️", label: "«Сообщение от учителя»" },
        { icon: "📎", label: "«Неизвестный файл»" },
      ];

      return (
        <section className="module-page password-part-page">
          {renderEnhancedModuleNav()}

          {renderSafetyPartHero(currentEnhancedPart)}

          <article className="panel safety-comic-panel">
            <div className="safety-comic-head">
              <h3>{currentEnhancedPart.introTitle}</h3>
              <p>Иногда в интернете происходят странные вещи. Давай посмотрим на примере:</p>
            </div>

            <div className="safety-comic-grid single module1-part-comic-grid">
              <div className="safety-comic-card single module1-part-comic-card">
                <img src={module1Comic} alt="Комикс про опасности в интернете" />
              </div>
            </div>
          </article>

          <article className="panel safety-warmup-panel">
            <h3>{currentEnhancedPart.warmupTitle}</h3>

            <div className="safety-warmup-grid">
              {warmupVisuals.map((item, index) => (
                <button
                  key={item.label}
                  className={warmupAnswer === index ? "safety-warmup-card active" : "safety-warmup-card"}
                  type="button"
                  onClick={() => handleWarmupAnswer(currentEnhancedPart.id, index)}
                >
                  <span className="safety-warmup-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {warmupAnswer !== undefined ? (
              <div className={warmupCorrect ? "safety-feedback success" : "safety-feedback error"}>
                <div>
                  <strong>
                    {warmupCorrect
                      ? currentEnhancedPart.warmupSuccess
                      : "Почти. Подумай ещё раз и выбери более безопасный вариант."}
                  </strong>
                  {warmupCorrect && currentEnhancedPart.warmupFooter ? <p>{currentEnhancedPart.warmupFooter}</p> : null}
                </div>
                <img className="safety-feedback-robot" src={module1HeroCat} alt="" aria-hidden="true" />
              </div>
            ) : null}

            <button
              className="primary-button safety-next-button"
              type="button"
              onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
              disabled={!warmupCorrect}
            >
              {currentEnhancedPart.warmupButtonLabel || "Перейти к мини-игре"}
            </button>
          </article>
        </section>
      );
    }

    if (selectedModule.slug === SAFETY_MODULE_SLUG && currentEnhancedPart.id === 2) {
      return (
        <section className="module-page password-part-page">
          {renderEnhancedModuleNav()}

          {renderSafetyPartHero(currentEnhancedPart)}

          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single module1-part-comic-grid">
              <div className="safety-comic-card single module1-part-comic-card">
                <img src={module1Part2Comic} alt="Комикс про надёжный пароль" />
              </div>
            </div>
          </article>

          <article className="panel password-warmup-card">
            <div className="password-warmup-head">
              <h3>{currentEnhancedPart.warmupTitle}</h3>
              <div className="password-warmup-decor" aria-hidden="true">
                <span className="password-warmup-screen" />
                <span className="password-warmup-shield" />
              </div>
            </div>

            <div className="password-choice-list">
              {currentEnhancedPart.warmupItems.map((item, index) => (
                <button
                  key={item}
                  className={warmupAnswer === index ? "password-choice active" : "password-choice"}
                  type="button"
                  onClick={() => handleWarmupAnswer(currentEnhancedPart.id, index)}
                >
                  <span className="password-choice-radio" aria-hidden="true" />
                  <span>{item}</span>
                </button>
              ))}
            </div>

            <div className={warmupCorrect ? "password-hint-box success" : "password-hint-box"}>
              <strong>{warmupCorrect ? currentEnhancedPart.warmupSuccess : "Подсказка"}</strong>
              <p>
                {warmupCorrect
                  ? currentEnhancedPart.warmupFooter
                  : "Лучший пароль — длинный и содержит буквы, цифры и символы."}
              </p>
            </div>

            <button
              className="primary-button password-part-next-button"
              type="button"
              onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
              disabled={!warmupCorrect}
            >
              {currentEnhancedPart.warmupButtonLabel || "Перейти к мини-игре"}
            </button>
          </article>
        </section>
      );
    }

    return (
      <section className="module-page password-part-page">
        {renderEnhancedModuleNav()}

        {renderSafetyPartHero(currentEnhancedPart)}

        {selectedModule.slug === SAFETY_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single module1-part-comic-grid">
              <div className="safety-comic-card single module1-part-comic-card">
                <img src={module1Part3Comic} alt="Комикс про антивирус и обновления" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === FILE_LAB_MODULE_SLUG && currentEnhancedPart.id === 1 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module2Part1Comic} alt="Комикс про порядок в файлах и папках" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === FILE_LAB_MODULE_SLUG && currentEnhancedPart.id === 2 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module2Part2Comic} alt="Комикс про понятные имена файлов" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === FILE_LAB_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module2Part3Comic} alt="Комикс про расширения файлов" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 1 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module3Part1Comic} alt="Комикс про точные поисковые запросы" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 2 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module3Part2Comic} alt="Комикс про проверку источников" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module3Part3Comic} alt="Комикс про сравнение нескольких ответов" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 1 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module4Part1Comic} alt="Комикс про уважительный тон в переписке" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 2 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module4Part2Comic} alt="Комикс про уважение авторов" />
              </div>
            </div>
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel safety-comic-panel">
            <div className="safety-comic-grid single">
              <div className="safety-comic-card single">
                <img src={module4Part3Comic} alt="Комикс про решение перед отправкой сообщения" />
              </div>
            </div>
          </article>
        ) : (
          <article className="panel enhanced-info-card">
            <div className="enhanced-info-copy">
              <h3>{currentEnhancedPart.introTitle}</h3>
              <p>{currentEnhancedPart.introText}</p>
              <ul className="enhanced-bullet-list">
                {currentEnhancedPart.introBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {currentEnhancedPart.introFooter ? (
                <p className="enhanced-info-footer">{currentEnhancedPart.introFooter}</p>
              ) : null}
            </div>
          </article>
        )}

        {selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 1 ? (
          <QueryCompareIntro
            onContinue={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
          />
        ) : selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 2 ? (
          <article className="panel warmup-card">
            <h3>Подсвети важное</h3>
            <HighlightSourceInteractive
              rounds={currentEnhancedPart.rounds || []}
              onComplete={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
            />
          </article>
        ) : selectedModule.slug === SMART_SEARCH_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel warmup-card">
            <ConnectFactsInteractive
              onComplete={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
            />
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 1 ? (
          <article className="panel warmup-card fitted-activity-panel">
            <ToneFeelGame
              onComplete={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
            />
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 2 ? (
          <article className="panel warmup-card fitted-activity-panel">
            <BuildPostInteractive
              onComplete={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
            />
          </article>
        ) : selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG && currentEnhancedPart.id === 3 ? (
          <article className="panel warmup-card fitted-activity-panel">
            <TrollGame
              onComplete={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
            />
          </article>
        ) : (
          <article className="panel warmup-card">
            <h3>{currentEnhancedPart.warmupTitle}</h3>
            {currentEnhancedPart.warmupQuestion ? (
              <p className="warmup-question">{currentEnhancedPart.warmupQuestion}</p>
            ) : null}

            <div className="warmup-options">
              {currentEnhancedPart.warmupItems.map((item, index) => (
                <button
                  key={item}
                  className={warmupAnswer === index ? "warmup-option active" : "warmup-option"}
                  type="button"
                  onClick={() => handleWarmupAnswer(currentEnhancedPart.id, index)}
                >
                  {item}
                </button>
              ))}
            </div>

            {warmupAnswer !== undefined ? (
              <div className={warmupCorrect ? "result-box success-box" : "result-box error-box"}>
                <strong>
                  {warmupCorrect
                    ? currentEnhancedPart.warmupSuccess
                    : "Почти. Подумай ещё раз и выбери более безопасный вариант."}
                </strong>
                {warmupCorrect && currentEnhancedPart.warmupFooter ? <p>{currentEnhancedPart.warmupFooter}</p> : null}
              </div>
            ) : null}

            <button
              className="primary-button"
              type="button"
              onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}/game`)}
              disabled={!warmupCorrect}
            >
              {currentEnhancedPart.warmupButtonLabel || "Перейти к мини-игре"}
            </button>
          </article>
        )}
      </section>
    );
  }

  function renderEnhancedModuleGamePage() {
    if (!selectedModule || !enhancedModule || !currentEnhancedPart) {
      return <p className="muted">Мини-игра не найдена.</p>;
    }

    const isDangerGame = currentEnhancedPart.gameType === "danger-safe";
    const isPasswordGame = currentEnhancedPart.gameType === "password-builder";
    const isDefenseGame = currentEnhancedPart.gameType === "computer-defense";
    const isChoiceGame = currentEnhancedPart.gameType === "choice-quiz";
    const isFolderSortGame = currentEnhancedPart.gameType === "folder-sort";
    const isFilenameQuizGame = currentEnhancedPart.gameType === "filename-quiz";
    const isFileCustomsGame = currentEnhancedPart.gameType === "file-customs";
    const isCleanQueryGame = currentEnhancedPart.gameType === "clean-query";
    const isSourceCheckGame = currentEnhancedPart.gameType === "source-check";
    const isBuildTruthGame = currentEnhancedPart.gameType === "build-truth";
    const isFixMessageGame = currentEnhancedPart.gameType === "fix-message";
    const isContentDetectiveGame = currentEnhancedPart.gameType === "content-detective";
    const isCalmChatGame = currentEnhancedPart.gameType === "calm-chat";
    const heroMascotClassName =
      selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG ? "hero-mascot hero-mascot-compact" : "hero-mascot";
    const choiceGameAnswer = choiceGameAnswers[currentEnhancedPart.id];
    const choiceGameCorrect = choiceGameAnswer === currentEnhancedPart.gameCorrect;
    const filenameQuizRounds = currentEnhancedPart.rounds || [];
    const filenameQuizCurrentRound = filenameQuizRounds[filenameQuizRound] || null;
    const filenameQuizAnswer = filenameQuizAnswers[filenameQuizRound];
    const filenameQuizAnswered = filenameQuizAnswer !== undefined;
    const filenameQuizScore = filenameQuizRounds.reduce(
      (sum, round, index) => sum + (filenameQuizAnswers[index] === round.correctIndex ? 10 : 0),
      0,
    );
    const filenameQuizComplete =
      filenameQuizRounds.length > 0 &&
      filenameQuizRounds.every((_, index) => filenameQuizAnswers[index] !== undefined) &&
      filenameQuizRound >= filenameQuizRounds.length - 1;
    const folderSortFiles = currentEnhancedPart.files || [];
    const folderSortFolders = currentEnhancedPart.folders || [];
    const placedFolderFiles = folderSortFiles.filter((file) => folderSortAnswers[file.id]);
    const remainingFolderFiles = folderSortFiles.filter((file) => !folderSortAnswers[file.id]);
    const folderSortScore = placedFolderFiles.length * 10;
    const folderSortComplete = folderSortFiles.length > 0 && placedFolderFiles.length === folderSortFiles.length;
    const passwordStrength = getPasswordStrength();
    const dangerTotal = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.filter((scenario) => scenario.correct === "danger").length
      : 0;

    const dangerScore = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.reduce(
          (sum, scenario, index) => sum + (dangerAnswers[index] === scenario.correct ? 1 : 0),
          0,
        )
      : 0;
    const dangerTotalScenarios = currentEnhancedPart.scenarios ? currentEnhancedPart.scenarios.length : 0;
    const dangerFoundCount = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.reduce(
          (sum, scenario, index) => sum + (scenario.correct === "danger" && dangerAnswers[index] === "danger" ? 1 : 0),
          0,
        )
      : 0;
    const dangerProgress = dangerTotal ? Math.round((dangerFoundCount / dangerTotal) * 100) : 0;

    const defenseScore = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.reduce(
          (sum, scenario, index) => sum + (defenseAnswers[index] === scenario.target ? 1 : 0),
          0,
        )
      : 0;
    const safeFiles = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.filter((_, index) => defenseAnswers[index] === "safe")
      : [];
    const suspiciousFiles = currentEnhancedPart.scenarios
      ? currentEnhancedPart.scenarios.filter((_, index) => defenseAnswers[index] === "suspicious")
      : [];

    const nextPath = getEnhancedGameNextPath(currentEnhancedPart.id);
    const isLastEnhancedPart = currentEnhancedPart.id === enhancedModule.parts.length;
    const continueButtonLabel = isLastEnhancedPart ? "Завершить модуль" : "Перейти к следующей части";
    const continueFromEnhancedGame = () => {
      if (isLastEnhancedPart) {
        completeEnhancedModule(nextPath);
        return;
      }

      navigateTo(nextPath);
    };

    const canProceed =
      (isDangerGame && dangerFoundCount >= dangerTotal) ||
      (isPasswordGame && passwordStrength.tone === "strong") ||
      (isDefenseGame &&
        currentEnhancedPart.scenarios &&
        Object.keys(defenseAnswers).length >= currentEnhancedPart.scenarios.length) ||
      (isChoiceGame && choiceGameCorrect) ||
      (isFolderSortGame && folderSortComplete) ||
      (isFilenameQuizGame && filenameQuizComplete);

    return (
      <section className="module-page">
        {renderEnhancedModuleNav()}

        <article
          className={
            selectedModule.slug === SAFETY_MODULE_SLUG
              ? "panel safety-part-hero password-part-hero hero-card password-hero-card safety-game-hero enhanced-module-part-hero safety-module-part-hero"
              : "panel safety-part-hero password-part-hero hero-card password-hero-card safety-game-hero enhanced-module-part-hero"
          }
        >
          <div className="password-hero-inner">
            <div className="safety-part-hero-copy hero-content safety-game-hero-copy">
              <button
                className="ghost-button back-button"
                type="button"
                onClick={() => navigateTo(`/modules/${selectedModule.slug}/parts/${currentEnhancedPart.id}`)}
              >
                К части
              </button>
              <p className="eyebrow">
                <span className="gamepad-icon" aria-hidden="true" />
                Мини-игра
              </p>
              <h2>{currentEnhancedPart.gameTitle}</h2>
              <p className="hero-text">{currentEnhancedPart.gameDescription}</p>
              <div className="password-learn-card">
                <span className="password-learn-icon" aria-hidden="true">🎮</span>
                <div>
                  <strong>Задача:</strong>
                  <p>выполни задание и перейди к следующей части</p>
                </div>
              </div>
            </div>

            <div className="safety-part-hero-art hero-visual safety-game-hero-art" aria-hidden="true">
              <img className={heroMascotClassName} src={getEnhancedModuleHeroImage()} alt="" />
            </div>
          </div>
        </article>

        <article className={isFixMessageGame ? "panel mini-game-card fitted-activity-panel" : "panel mini-game-card"}>
          {isDangerGame ? (
            <>
              <div className="danger-counter-row">
                <div className="danger-counter">
                  <strong>За каждое верное решение ты получаешь очко внимательности.</strong>
                  <div className="danger-progress">
                    <div className="danger-progress-track" aria-hidden="true">
                      <div className="danger-progress-fill" style={{ width: `${dangerProgress}%` }} />
                    </div>
                    <span>Прогресс прохождения: {dangerFoundCount} из {dangerTotal}</span>
                  </div>
                </div>
                {dangerFoundCount >= dangerTotal ? (
                  <div className="danger-success-banner">Найдено опасных сообщений: {dangerFoundCount} из {dangerTotal}</div>
                ) : null}
              </div>

              <div className="danger-card-grid">
                {currentEnhancedPart.scenarios.map((scenario, index) => (
                  <article
                    key={`${scenario.sender}-${scenario.message}`}
                    className={
                      dangerAnswers[index] === "danger"
                        ? "danger-card danger-card-marked"
                        : dangerAnswers[index] === "safe"
                          ? "danger-card danger-card-confirmed-safe"
                          : dangerMisses[index]
                            ? "danger-card danger-card-missed"
                            : "danger-card"
                    }
                  >
                    <div className="danger-card-head">
                      <span className="danger-avatar" aria-hidden="true">👤</span>
                      <strong>{scenario.sender}</strong>
                    </div>
                    <p className="danger-card-message">«{scenario.message}»</p>
                    {scenario.attachment ? <span className="danger-card-meta">📎 {scenario.attachment}</span> : null}
                    {scenario.link ? <span className="danger-card-meta">🔗 {scenario.link}</span> : null}
                    <div className="mini-game-actions">
                      <button
                        className={dangerAnswers[index] === "danger" ? "mini-choice danger active" : "mini-choice danger"}
                        type="button"
                        onClick={() => handleDangerChoice(scenario, index, "danger")}
                        disabled={Boolean(dangerAnswers[index])}
                      >
                        Опасно
                      </button>
                      <button
                        className={dangerAnswers[index] === "safe" ? "mini-choice safe active" : "mini-choice safe"}
                        type="button"
                        onClick={() => handleDangerChoice(scenario, index, "safe")}
                        disabled={Boolean(dangerAnswers[index])}
                      >
                        Безопасно
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className={`danger-feedback danger-feedback-${dangerFeedback.tone}`}>
                <strong>Почему так?</strong>
                <p>{dangerFeedback.text}</p>
              </div>

              {dangerToast ? <div className="danger-toast">{dangerToast}</div> : null}
              {dangerWarning ? <div className="danger-warning">{dangerWarning}</div> : null}

              {dangerFoundCount >= dangerTotal ? (
                <div className="danger-trophy-banner">
                  <span className="danger-trophy-icon" aria-hidden="true">🏆</span>
                  <div>
                    <strong>Ты молодец!</strong>
                    <p>Все сообщения разобраны верно. Ты отлично умеешь замечать опасности.</p>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {isPasswordGame ? (
            <>
              <div className="password-builder">
                <label className="password-input-wrap">
                  <span>Придумай пароль</span>
                  <input
                    className="password-input"
                    type="text"
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    placeholder="Например: K0t!2024"
                  />
                </label>
              </div>

              <div className={`password-preview password-preview-${passwordStrength.tone}`}>
                <strong>{passwordStrength.label}</strong>
                <div className="password-strength-track" aria-hidden="true">
                  <div
                    className={`password-strength-fill password-strength-fill-${passwordStrength.tone}`}
                    style={{ width: `${passwordStrength.fill}%` }}
                  />
                </div>
              </div>
            </>
          ) : null}

          {isDefenseGame ? (
            <>
              <div className="danger-counter defense-counter">
                <strong>Отсортировано правильно: {defenseScore} из {currentEnhancedPart.scenarios.length}</strong>
              </div>

              <div className="defense-file-grid">
                {currentEnhancedPart.scenarios.map((scenario, index) =>
                  defenseAnswers[index] ? null : (
                    <button
                      key={scenario.name}
                      className={selectedDefenseIndex === index ? "defense-file-card defense-file-card-selected" : "defense-file-card"}
                      type="button"
                      draggable
                      onClick={() => {
                        setSelectedDefenseIndex((current) => (current === index ? null : index));
                        setDefenseToast("");
                      }}
                      onDragStart={() => {
                        setDraggedDefenseIndex(index);
                        setSelectedDefenseIndex(null);
                      }}
                      onDragEnd={() => {
                        setDraggedDefenseIndex(null);
                        setActiveDropzone("");
                      }}
                    >
                      <span className="defense-file-icon" aria-hidden="true">{scenario.icon}</span>
                      <span className="defense-file-name">{scenario.name}</span>
                    </button>
                  ),
                )}
              </div>

              <div className="defense-bins">
                <div
                  className={
                    activeDropzone === "safe"
                      ? "defense-bin defense-bin-safe defense-bin-active"
                      : selectedDefenseIndex !== null
                        ? "defense-bin defense-bin-safe defense-bin-tap-ready"
                        : "defense-bin defense-bin-safe"
                  }
                  onDragOver={(event) => {
                    event.preventDefault();
                    setActiveDropzone("safe");
                  }}
                  onDragLeave={() => setActiveDropzone("")}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (draggedDefenseIndex !== null) {
                      sortDefenseFile(draggedDefenseIndex, "safe");
                    }
                  }}
                  onClick={() => {
                    if (selectedDefenseIndex !== null) {
                      sortDefenseFile(selectedDefenseIndex, "safe");
                    }
                  }}
                >
                  <strong>МОЖНО ОТКРЫТЬ</strong>
                  <span>безопасные файлы</span>
                  <div className="defense-bin-files">
                    {safeFiles.map((file) => (
                      <div className="defense-bin-file defense-bin-file-safe" key={file.name}>
                        <span aria-hidden="true">{file.icon}</span>
                        <small>{file.name}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={
                    activeDropzone === "suspicious"
                      ? "defense-bin defense-bin-danger defense-bin-active"
                      : selectedDefenseIndex !== null
                        ? "defense-bin defense-bin-danger defense-bin-tap-ready"
                        : "defense-bin defense-bin-danger"
                  }
                  onDragOver={(event) => {
                    event.preventDefault();
                    setActiveDropzone("suspicious");
                  }}
                  onDragLeave={() => setActiveDropzone("")}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (draggedDefenseIndex !== null) {
                      sortDefenseFile(draggedDefenseIndex, "suspicious");
                    }
                  }}
                  onClick={() => {
                    if (selectedDefenseIndex !== null) {
                      sortDefenseFile(selectedDefenseIndex, "suspicious");
                    }
                  }}
                >
                  <strong>ПОДОЗРИТЕЛЬНО</strong>
                  <span>файлы для проверки</span>
                  <div className="defense-bin-files">
                    {suspiciousFiles.map((file) => (
                      <div className="defense-bin-file defense-bin-file-danger" key={file.name}>
                        <span aria-hidden="true">{file.icon}</span>
                        <small>{file.name}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`danger-feedback danger-feedback-${defenseFeedback.tone}`}>
                <strong>Подсказка</strong>
                <p>{defenseFeedback.text}</p>
              </div>

              {defenseToast ? <div className="danger-warning">{defenseToast}</div> : null}

              {defenseScore === currentEnhancedPart.scenarios.length ? (
                <div className="danger-success-banner">Уровень пройден! {defenseScore} из {currentEnhancedPart.scenarios.length} — отлично!</div>
              ) : null}
            </>
          ) : null}

          {isFolderSortGame ? (
            <div className="folder-sort-game">
              <div className="folder-sort-head">
                <div>
                  <h3>Разложи файлы по папкам</h3>
                  <p>Помоги Лайку навести порядок: перетащи каждый файл в нужную папку</p>
                </div>
                <div className="folder-sort-stats" aria-label="Статистика игры">
                  <span>Очки: {folderSortScore}</span>
                  <span>Прогресс: {placedFolderFiles.length}/{folderSortFiles.length}</span>
                </div>
              </div>

              <div className="folder-sort-board">
                <section className="folder-sort-panel">
                  <h4>Файлы на рабочем столе</h4>
                  <div className="folder-sort-files">
                    {remainingFolderFiles.map((file) => (
                      <button
                        key={file.id}
                        className={
                          selectedFolderFileId === file.id
                            ? "folder-file-card folder-file-card-selected"
                            : "folder-file-card"
                        }
                        type="button"
                        draggable
                        onClick={() => setSelectedFolderFileId(file.id)}
                        onDragStart={() => {
                          setDraggedFolderFileId(file.id);
                          setSelectedFolderFileId("");
                          setFolderSortHint("");
                        }}
                        onDragEnd={() => {
                          setDraggedFolderFileId("");
                          setActiveFolderId("");
                        }}
                      >
                        <span className="folder-file-icon" aria-hidden="true">{file.icon}</span>
                        <span>{file.name}</span>
                      </button>
                    ))}

                    {!remainingFolderFiles.length ? (
                      <div className="folder-sort-empty">Все файлы разобраны</div>
                    ) : null}
                  </div>
                </section>

                <section className="folder-sort-panel">
                  <h4>Папки</h4>
                  <div className="folder-sort-folders">
                    {folderSortFolders.map((folder) => {
                      const placedFile = placedFolderFiles.find((file) => folderSortAnswers[file.id] === folder.id);
                      const isActive = activeFolderId === folder.id;
                      const isShaking = shakingFolderId === folder.id;

                      return (
                        <button
                          key={folder.id}
                          className={[
                            "folder-card",
                            placedFile ? "folder-card-success" : "",
                            isActive ? "folder-card-active" : "",
                            isShaking ? "folder-card-shake" : "",
                          ].filter(Boolean).join(" ")}
                          type="button"
                          onClick={() => {
                            if (selectedFolderFileId) {
                              sortFolderFile(selectedFolderFileId, folder.id);
                            }
                          }}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setActiveFolderId(folder.id);
                          }}
                          onDragLeave={() => setActiveFolderId("")}
                          onDrop={(event) => {
                            event.preventDefault();
                            if (draggedFolderFileId) {
                              sortFolderFile(draggedFolderFileId, folder.id);
                            }
                          }}
                        >
                          <span className="folder-card-icon" aria-hidden="true">{folder.icon}</span>
                          <strong>{folder.name}</strong>
                          {placedFile ? <small>{placedFile.name}</small> : null}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>

              {folderSortHint ? <div className="folder-sort-hint">{folderSortHint}</div> : null}

              {folderSortComplete ? (
                <div className="folder-sort-victory">
                  <strong>Отлично! Теперь у каждого файла есть свое место</strong>
                  <button className="primary-button" type="button" onClick={continueFromEnhancedGame}>
                    {continueButtonLabel}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {isFilenameQuizGame ? (
            <FileNamesMiniGame
              rounds={filenameQuizRounds}
              currentRoundIndex={filenameQuizRound}
              answers={filenameQuizAnswers}
              onAnswer={handleFilenameQuizAnswer}
              onNext={() => handleFilenameQuizNext(nextPath)}
              onRestart={() => {
                setFilenameQuizRound(0);
                setFilenameQuizAnswers({});
              }}
              onContinue={continueFromEnhancedGame}
              continueLabel={continueButtonLabel}
            />
          ) : null}

          {isFileCustomsGame ? (
            <FileCustomsGame
              rounds={currentEnhancedPart.rounds || []}
              onComplete={continueFromEnhancedGame}
              continueLabel={continueButtonLabel}
            />
          ) : null}

          {isCleanQueryGame ? (
            <CleanQueryGame
              rounds={currentEnhancedPart.rounds || []}
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isSourceCheckGame ? (
            <TrustSourceGame
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isBuildTruthGame ? (
            <BuildTruthGame
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isFixMessageGame ? (
            <FixMessageGame
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isContentDetectiveGame ? (
            <ContentDetectiveGame
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isCalmChatGame ? (
            <CalmChatGame
              onComplete={continueFromEnhancedGame}
            />
          ) : null}

          {isChoiceGame ? (
            <>
              <div className="danger-counter">
                <strong>{currentEnhancedPart.gameQuestion}</strong>
              </div>

              <div className="warmup-options">
                {currentEnhancedPart.gameItems.map((item, index) => (
                  <button
                    key={item}
                    className={choiceGameAnswer === index ? "warmup-option active" : "warmup-option"}
                    type="button"
                    onClick={() =>
                      setChoiceGameAnswers((current) => ({
                        ...current,
                        [currentEnhancedPart.id]: index,
                      }))
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              {choiceGameAnswer !== undefined ? (
                <div className={choiceGameCorrect ? "result-box success-box" : "result-box error-box"}>
                  <strong>{choiceGameCorrect ? currentEnhancedPart.gameSuccess : "Попробуй ещё раз."}</strong>
                  <p>{choiceGameCorrect ? "Можно двигаться дальше." : currentEnhancedPart.gameHint}</p>
                </div>
              ) : null}
            </>
          ) : null}

          {!isFolderSortGame && !isFilenameQuizGame && !isFileCustomsGame && !isCleanQueryGame && !isSourceCheckGame && !isBuildTruthGame && !isFixMessageGame && !isContentDetectiveGame && !isCalmChatGame ? (
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                if (isDangerGame) {
                  if (isLastEnhancedPart) {
                    if (dangerFoundCount < dangerTotal) {
                      setDangerWarning("Сначала правильно разбери все сообщения.");
                      return;
                    }

                    continueFromEnhancedGame();
                    return;
                  }

                  handleDangerNext(nextPath, dangerFoundCount, dangerTotal);
                  return;
                }

                continueFromEnhancedGame();
              }}
              disabled={!canProceed}
            >
              {continueButtonLabel}
            </button>
          ) : null}
        </article>
      </section>
    );
  }

  function renderModuleTestPage() {
    if (!selectedModule) {
      return <p className="muted">Модуль не найден.</p>;
    }

    if (enhancedModule) {
      const questions = enhancedModule.finalTest;
      const currentQuestion = questions[finalQuestionIndex];
      const allAnswered = questions.every((_, index) => finalTestAnswers[index] !== undefined);
      const heroMascotClassName =
        selectedModule.slug === DIGITAL_ETHICS_MODULE_SLUG ? "hero-mascot hero-mascot-compact" : "hero-mascot";

      return (
        <section className="module-page">
          <article
            className={
              selectedModule.slug === SAFETY_MODULE_SLUG
                ? "panel safety-part-hero password-part-hero hero-card password-hero-card safety-game-hero enhanced-module-part-hero safety-module-part-hero"
                : "panel safety-part-hero password-part-hero hero-card password-hero-card safety-game-hero enhanced-module-part-hero"
            }
          >
            <div className="password-hero-inner">
              <div className="safety-part-hero-copy hero-content safety-game-hero-copy">
                <button
                  className="ghost-button back-button"
                  type="button"
                  onClick={() => navigateTo(`/modules/${selectedModule.slug}`)}
                >
                  К модулю
                </button>
                <p className="eyebrow">
                  <span className="gamepad-icon" aria-hidden="true" />
                  Финальная проверка
                </p>
                <h2>{selectedModule.title}</h2>
                <p className="hero-text">Ответь на вопросы и заверши модуль.</p>
                <div className="password-learn-card">
                  <span className="password-learn-icon final-test-learn-icon" aria-hidden="true" />
                  <div>
                    <strong>Задача:</strong>
                    <p>выбери верные ответы и закрепи знания</p>
                  </div>
                </div>
              </div>

              <div className="safety-part-hero-art hero-visual safety-game-hero-art" aria-hidden="true">
                <img className={heroMascotClassName} src={getEnhancedModuleHeroImage()} alt="" />
              </div>
            </div>
          </article>

          {renderEnhancedModuleNav()}
          {dashboardError ? <p className="inline-note">{dashboardError}</p> : null}

          <article className="panel final-test-card">
            <div className="final-test-head">
              <span className="final-test-index">Вопрос {finalQuestionIndex + 1}</span>
              <div className="step-progress-row">
                {questions.map((question, index) => (
                  <span
                    key={question.question}
                    className={index === finalQuestionIndex ? "step-progress-dot active" : "step-progress-dot"}
                  />
                ))}
              </div>
            </div>

            <h3>{currentQuestion.question}</h3>

            <div className="final-test-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={finalTestAnswers[finalQuestionIndex] === index ? "final-test-option active" : "final-test-option"}
                  onClick={() =>
                    setFinalTestAnswers((current) => ({
                      ...current,
                      [finalQuestionIndex]: index,
                    }))
                  }
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="final-test-actions">
              <button
                className="ghost-button"
                type="button"
                onClick={() => setFinalQuestionIndex((current) => Math.max(current - 1, 0))}
                disabled={finalQuestionIndex === 0}
              >
                Назад
              </button>
              {finalQuestionIndex < questions.length - 1 ? (
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setFinalQuestionIndex((current) => Math.min(current + 1, questions.length - 1))}
                  disabled={finalTestAnswers[finalQuestionIndex] === undefined}
                >
                  Следующий вопрос
                </button>
              ) : !allAnswered ? (
                <button className="primary-button" type="button" disabled>
                  Ответь на все вопросы
                </button>
              ) : (
                <button className="primary-button" type="button" onClick={handleFinishEnhancedTest}>
                  Завершить модуль
                </button>
              )}
            </div>

            {challengeResult ? (
              <div className={challengeResult.correct ? "result-box success-box" : "result-box error-box"}>
                <strong>
                  {challengeResult.correct
                    ? `Модуль завершён! +${challengeResult.earned_points} очков`
                    : "Тест пока не пройден"}
                </strong>
                <p>{challengeResult.explanation}</p>
              </div>
            ) : null}
          </article>
        </section>
      );
    }

    return (
      <section className="module-page">
        <div className="panel module-page-head">
          <button className="ghost-button" type="button" onClick={() => navigateTo(`/modules/${selectedModule.slug}`)}>
            Назад к уроку
          </button>

          <div className="module-page-title">
            <p className="eyebrow">Финальная проверка</p>
            <h2>{selectedModule.title}</h2>
            <p className="hero-text">Ответь на вопрос и заверши прохождение модуля.</p>
          </div>

          <div className="pill">{selectedModule.reward_points} очков</div>
        </div>

        {dashboardError ? <p className="inline-note">{dashboardError}</p> : null}

        <div className="challenge-box challenge-box-standalone">
          <p className="eyebrow light">Тест</p>
          <h3>{selectedModule.minigame.prompt}</h3>

          <div className="answer-list">
            {selectedModule.minigame.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className={getAnswerClassName(index)}
                onClick={() => setSelectedAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>

          <button className="primary-button" type="button" onClick={handleSubmitChallenge}>
            Проверить ответ
          </button>

          {challengeResult ? (
            <div className={challengeResult.correct ? "result-box success-box" : "result-box error-box"}>
              <strong>
                {challengeResult.correct
                  ? `Верно! +${challengeResult.earned_points} очков`
                  : "Ответ неправильный"}
              </strong>
              <p>{challengeResult.explanation}</p>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  function renderLeaderboard() {
    const podiumOrder = [2, 1, 3];
    const podiumEntries = podiumOrder
      .map((place) => leaderboard.find((entry) => entry.place === place))
      .filter(Boolean);
    const otherEntries = leaderboard.filter((entry) => entry.place > 3);

    return (
      <section className="panel leaderboard-panel">
        <div className="leaderboard-hero">
          <div className="leaderboard-title-wrap">
            <div className="leaderboard-trophy" aria-hidden="true">🏆</div>
            <div>
              <p className="eyebrow">Рейтинг академии</p>
              <h2>Таблица лидеров</h2>
            </div>
          </div>
          <div className="leaderboard-filter">Все время</div>
        </div>

        <div className="leaderboard-podium">
          {podiumEntries.map((entry) => {
            const avatar = getAvatarByEmail(entry.email);
            return (
              <article
                className={entry.place === 1 ? "leaderboard-podium-card first" : "leaderboard-podium-card"}
                key={`${entry.place}-${entry.email}`}
              >
                <div className={`leaderboard-place-badge place-${entry.place}`}>{entry.place}</div>
                {entry.place === 1 ? <div className="leaderboard-crown" aria-hidden="true">👑</div> : null}
                <div className="leaderboard-avatar-ring">
                  {avatar ? (
                    <img className="leaderboard-avatar" src={avatar.src} alt="" aria-hidden="true" />
                  ) : (
                    <div className="leaderboard-avatar-fallback">{entry.display_name.charAt(0).toUpperCase()}</div>
                  )}
                </div>
                <h3>{entry.display_name}</h3>
                <span className="leaderboard-level-pill">{entry.level_title}</span>
                <strong className="leaderboard-score">{entry.total_points} очков</strong>
              </article>
            );
          })}
        </div>

        <div className="leaderboard-rest">
          {otherEntries.map((entry) => {
            const avatar = getAvatarByEmail(entry.email);
            return (
              <article className="leaderboard-row" key={`${entry.place}-${entry.email}`}>
                <strong className="leaderboard-rank">#{entry.place}</strong>
                <div className="leaderboard-row-user">
                  <div className="leaderboard-row-avatar">
                    {avatar ? (
                      <img className="leaderboard-avatar" src={avatar.src} alt="" aria-hidden="true" />
                    ) : (
                      <div className="leaderboard-avatar-fallback small">{entry.display_name.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <span>{entry.display_name}</span>
                </div>
                <span className="leaderboard-level-pill">{entry.level_title}</span>
                <strong className="leaderboard-score">{entry.total_points} очков</strong>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  function renderAchievements() {
    const completedModules = profile?.completed_modules ?? 0;
    const visibleAchievements = ACHIEVEMENT_CARD_DEFS.filter((definition) => {
      const achievement = achievementMap.get(definition.code);
      return achievement?.unlocked;
    });
    const userAchievementDates = profile?.email ? achievementDateMap[profile.email] || {} : {};

    return (
      <section className="panel achievements-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Коллекция наград</p>
            <h2>Достижения</h2>
          </div>
        </div>

        <div className="achievement-showcase-list">
          {visibleAchievements.map((definition) => {
            const achievement = achievementMap.get(definition.code);
            const unlocked = achievement?.unlocked ?? false;
            const imageSrc = ACHIEVEMENT_IMAGES[definition.imageKey];
            const receivedDate = userAchievementDates[definition.code] || definition.dateLabel;

            return (
              <article
                className={
                  unlocked
                    ? `achievement-showcase-card achievement-showcase-card-${definition.accent}`
                    : "achievement-showcase-card achievement-showcase-card-locked"
                }
                key={definition.code}
              >
                <div className="achievement-showcase-visual">
                  {imageSrc ? <img className="achievement-showcase-image" src={imageSrc} alt={definition.title} /> : null}
                </div>

                <div className="achievement-showcase-main">
                  <div className="achievement-showcase-copy">
                    <p className="eyebrow">Достижение</p>

                    <div className="achievement-showcase-title-row">
                      <h3>{achievement?.title || definition.title}</h3>
                      <span className="achievement-module-pill">
                        {definition.modulesRequired} модуль
                      </span>
                    </div>

                    <p>{achievement?.description || definition.description}</p>
                    <div className="achievement-received-row">
                      <span>{unlocked ? `Получено ${receivedDate}` : "Получено после завершения модуля"}</span>
                    </div>
                  </div>

                  <div className="achievement-showcase-side">
                    <div className="achievement-progress-box">
                      <strong>Прогресс</strong>
                      <div className="achievement-progress-steps">
                        {[1, 2, 3, 4].map((step) => (
                          <span
                            className={
                              completedModules >= step
                                ? `achievement-progress-step achievement-progress-step-${definition.accent} active`
                                : "achievement-progress-step"
                            }
                            key={`${definition.code}-${step}`}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                      <p>
                        Пройдено модулей: <strong>{completedModules} из 4</strong>
                      </p>
                    </div>

                    <div className="achievement-reward-box">
                      <strong>Награда</strong>
                      <div className="achievement-reward-value">
                        <span className="achievement-coin" aria-hidden="true">⭐</span>
                        <div>
                          <b>+{achievement?.reward_points || definition.rewardPoints}</b>
                          <span>баллов</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {!visibleAchievements.length ? <p className="muted">Пока достижений нет. Пройди первый модуль, чтобы открыть награду.</p> : null}
        </div>
      </section>
    );
  }

  function renderShop() {
    return (
      <section className="panel shop-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Витрина академии</p>
            <h2>Магазин ЦифроГрада</h2>
          </div>
          <div className="pill">{profile?.total_points ?? 0} очков</div>
        </div>

        <div className="shop-grid">
          <article className="shop-card">
            <h3>Тема профиля</h3>
            <p>Скоро здесь появятся новые темы, значки и полезные цифровые награды.</p>
            <button className="ghost-button" type="button" disabled>
              Скоро
            </button>
          </article>
          <article className="shop-card">
            <h3>Набор исследователя</h3>
            <p>Открывай предметы и коллекции за успехи в заданиях по цифровой грамотности.</p>
            <button className="ghost-button" type="button" disabled>
              Скоро
            </button>
          </article>
        </div>
      </section>
    );
  }

  function renderAdminPage() {
    if (!profile?.is_admin) {
      return (
        <section className="panel admin-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Доступ ограничен</p>
              <h2>Админка</h2>
            </div>
          </div>
          <p className="muted">Эта страница доступна только администраторам.</p>
        </section>
      );
    }

    return (
      <section className="admin-page">
        <article className="panel admin-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Управление платформой</p>
              <h2>Админка</h2>
            </div>
          </div>

          <div className="admin-grid">
            <form className="admin-form" onSubmit={handleAdminCreateUser}>
              <h3>Создать нового пользователя</h3>
              <label>
                <span>Имя ученика</span>
                <input
                  name="display_name"
                  value={adminForm.display_name}
                  onChange={handleAdminFormChange}
                  placeholder="Например, Лена"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={adminForm.email}
                  onChange={handleAdminFormChange}
                  placeholder="student@example.com"
                />
              </label>
              <label>
                <span>Пароль</span>
                <input
                  name="password"
                  type="password"
                  value={adminForm.password}
                  onChange={handleAdminFormChange}
                  placeholder="Минимум 8 символов"
                />
              </label>
              <button className="primary-button" type="submit">
                Создать пользователя
              </button>
              {adminMessage ? <p className="success">{adminMessage}</p> : null}
              {adminError ? <p className="error">{adminError}</p> : null}
            </form>

            <div className="admin-summary">
              <div className="metric-card panel">
                <strong>{adminUsers.length}</strong>
                <span>Всего пользователей</span>
              </div>
              <div className="metric-card panel">
                <strong>{adminUsers.reduce((sum, user) => sum + user.completed_modules, 0)}</strong>
                <span>Всего пройденных курсов</span>
              </div>
            </div>
          </div>
        </article>

        <article className="panel admin-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Общий прогресс</p>
              <h2>Все пользователи</h2>
            </div>
          </div>

          {adminLoading ? <p className="muted">Загружаю список пользователей...</p> : null}

          {!adminLoading ? (
            <div className="admin-user-list">
              {adminUsers.map((user) => {
                const progressMap = new Map(user.progress.map((item) => [item.module_slug, item]));
                return (
                  <article className="admin-user-card" key={user.id}>
                    <div className="admin-user-head">
                      <div>
                        <h3>{user.display_name}</h3>
                        <p>{user.email}</p>
                      </div>
                      <div className="admin-user-actions">
                        <div className="admin-user-badges">
                          <span className="pill">{user.level_title}</span>
                          <span className="pill">{user.total_points} очков</span>
                          <span className="pill">{user.completed_modules}/{user.total_modules} курсов</span>
                        </div>
                        {!user.is_admin ? (
                          <button
                            className="ghost-button admin-delete-button"
                            type="button"
                            onClick={() => handleAdminDeleteUser(user.id, user.display_name)}
                          >
                            Удалить
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="admin-progress-grid">
                      {modules.map((module) => {
                        const progress = progressMap.get(module.slug);
                        return (
                          <div className="admin-progress-item" key={`${user.id}-${module.slug}`}>
                            <strong>{module.title}</strong>
                            <span>{progress?.completed ? "Пройден" : "Не пройден"}</span>
                            <small>
                              Попыток: {progress?.attempts ?? 0} | Очков: {progress?.earned_points ?? 0}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}

              {!adminUsers.length ? <p className="muted">Пользователей пока нет.</p> : null}
            </div>
          ) : null}
        </article>
      </section>
    );
  }

  function renderDashboard() {
    const isWideDashboardPage =
      route.page === "academy" ||
      route.page === "tasks" ||
      route.page === "achievements" ||
      route.page === "module" ||
      route.page === "module_part" ||
      route.page === "module_game" ||
      route.page === "module_test";

    return (
      <div className="app-shell">
        {renderTopbar()}
        <div className="dashboard">
          {renderSidebar()}
          <main className={isWideDashboardPage ? "dashboard-content dashboard-content-wide" : "dashboard-content"}>
            {achievementNotice ? (
              <div className="achievement-toast-stack">
                {achievementNotice.items.map((item) => (
                  <div className="achievement-toast" key={item.code}>
                    <span className="achievement-toast-icon" aria-hidden="true">🏆</span>
                    <div className="achievement-toast-copy">
                      <strong>Получено достижение</strong>
                      <h3>{item.title}</h3>
                      <p>
                        +{item.reward_points} баллов • {achievementNotice.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {route.page === "academy" ? renderAcademyHome() : null}
            {route.page === "tasks" ? renderTasksPage() : null}
            {route.page === "module" ? renderModulePage() : null}
            {route.page === "module_part" ? renderEnhancedModulePartPage() : null}
            {route.page === "module_game" ? renderEnhancedModuleGamePage() : null}
            {route.page === "module_test" ? renderModuleTestPage() : null}
            {route.page === "profile" ? renderProfile() : null}
            {route.page === "leaderboard" ? renderLeaderboard() : null}
            {route.page === "achievements" ? renderAchievements() : null}
            {route.page === "shop" ? renderShop() : null}
            {route.page === "admin" ? renderAdminPage() : null}
          </main>
        </div>
      </div>
    );
  }

  function renderAuthedLayout() {
    return (
      <>
        {dashboardLoading ? <p className="muted loading-note">Загрузка ЦифроГрада...</p> : null}
        {!dashboardLoading ? renderDashboard() : null}
      </>
    );
  }

  return (
    <div className="page">
      {!token ? (
        <div className="shell">
          <section className="hero">
            <img className="hero-banner-image" src={authBannerImage} alt={BRAND_NAME} />
          </section>

          {renderAuthScreen()}
        </div>
      ) : (
        renderAuthedLayout()
      )}
    </div>
  );
}
