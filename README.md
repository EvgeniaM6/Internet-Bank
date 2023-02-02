# Internet-Bank

Финальный таск курса, выполняемый командой:
- [Егор](https://github.com/kkolite)
- [Андрей](https://github.com/shama8nchez)
- [Егвения](https://github.com/EvgeniaM6)

Наш проект - клон интернет-банка. На сегодняшний день практически все финаносвые операции можно выполнить удаленно через интернет.

### Операции и возможности

Какие операции можно будет выполнить с помощью нашего приложения:
- Регистрация и авторизация. Безопасность - важный элемент банковской системы (да и любой системы в целом). Поэтому пользователи смог полноценно пользоваться приложением после авторизации в нем. (***Егор***)
- Личный кабинет (изменение данных, удаление аккаунта)
- Админка (много чего, вплоть до создания/удаления небанковских услуг)
- Банковские услуги. Хотите открыть депозит? Перевести деньги на другой счет? Эти и другие операции доступны для авторизованных пользователей. (***Егор***)
- Оплата услуг. Нужно купить подпсику Нетфликс или пополнить счет кошелка Стима? А может оплатить телефон бабушке? Доступно как для авторизованных пользователей, так и для обычных посетителей нашего сайта (последним придется вводить данные своей карточки).
- Бот-помощник. Заблудились на нашем замечательном сайте? Или хотите получить совет, какой депозит лучше оформить? Наш бот-помощник может и анекдот рассказать.
- Викторина по финансовой грамотности. Все мы умеем тратить деньги, но это не значит, что мы делаем это парвильно. Приятное дополнения для всех посетителей сайта. Говорят, что за успешное прохождение теста авторизованные пользователи получают бонус на счет.
- Конструктор дизайна карточки. Не хотите быть обладателем скучного серого куска пластика? Наш конструктор позволяет создать свой уникальный дизайн для банковской карточки. (может быть ***Егор***)

Список дополняется...

Возможности приложения:
- Смена дневной/ночной темы.
- Смена языка.

#### Подробнее о реализации

Регистрация, авторизация и банковские операции выполняются на беке. Любое списание/пополнение счета в других пунктах обязательно проходит через запрос на сервер. Реализация сервера на **Егоре**. Основные возможности (кратко):
- Регистрация на сайте
- Авторизация на сайте
- Безопасные сессии
- Хранение данных
- Возможность редактировать данные (логин, пароль, почта)
- Выполнение всех финансовых операций (изменение количества денег на счету происходит исключительно на сервере)
- Получение выписок и чеков на email (рассылка писем)
- Админка (управление другими счетами, их удаление итд)

#### Подробнее о сощдании свой карточки

Создание уникального дизайна картчоки будет происходить с помощью конвертации html кода в jpg картинку. Есть апи (50 запросов ограничение, но его можно обойти, сделав два бесплатных ключа, сотки нам точно хватит), либо подключить на бек библиотеку (тоже есть, но пока не разобрался в нюансах ее работы). Возможности:
- Пользователь может добавить любую свою картинку
- Отрегулировать ее фильтрами (затемнение, размытие итд)
- Отрегулировать размер
- Отрегулировать положение
- Самостоятельно внести фамилию и номер (по умолчанию будут предложены данные авторизованного пользователя и рандомный номер)
- Выбор платежной системы

#### Подробнее о языке

Основной алгоритм такой - **весь** текст на каждом языке хранится в объекте. Объекты наследуются от общего интерфейса. При первом посещении сайта пользователь перед попаданием на сайт должен выбрать язык (проверка на наличии в локольном хранилище переменной языка), дальше при входе его будет кидать на сайт с нужным языком. Язык можно изменить в любой момент в настройках (также происходит обновление в локальном хранилище)

#### Цветовая гамма

Тут надо обсудить. Мое предложение - использовать три цвета: белый, черный и еще один. Первый для фона, второй для текста, третий - для заголовков или границ блоков. Дизайн легкий, нельзя перегружать страницу. Минимализм? Почти что.

Мои варианты для третьего цвета: бирюзовый, сиреневый, оранжевый

#### Вход на сайт
- Проверка ссылки на валидность.
    - Если да - идем дальше
    - Если нет - на старинцу ошибки страницы
- Проверка авторизации.
    - Если да - то еще раз проверить ссылку, если доступ (чтобы юзера не кинула на админку).
    - Все ок - кидаем на страницу по ссылке.
    - Если нет доступа - на главную с сообщением об ошибке доступа.
    - Если нет авторизации - на старинцу авторизации. Т.е любой вход на сайт по любой ссылке должен вести неавторизованнго пользователя на страницу авторизации

#### Авторизация
На странице авторизации можно сделать три вещи
- Авторизироваться
- Перейти на страницу регистрации
- Продолжить анонимно

В зависимости авторизирован пользователь или нет, формируется список доступных ему операций. Как мы помним, у нас на сайте 5 (пока) доступных фич. Как они работают с анонимами?

- Банковские услуги. Доступны только:
    - Перевод с карты на счет клиента
    - Перевод с карты на карту
- Оплата услуг:
    - Доступны все, но оплата только картой (привет, комиссия банка)
- Бот-помощник. Оставляю это его автору.
- Викторина по финансовой грамотности. Доступна для всех, но аноним не поулчит бонус.
- Конструктор дизайна карточки. Эксклюзив для клиентов.

#### Главная страница
В хедере ВЕЗДЕ у нас ссылка на главную, ник пользователя и сумма его денег (если он авторизован, иначе ссылка на авторизацию), настройки языка и темы (день/ночь)

Мэйн содержит ссылки на разделы и личный кабинет, где пользователь может сменить данные о себе. Если аноним, то недоступные ему разделы выделяются стилем.

Футер ВЕЗДЕ - ссылка на нас, школу и старинчу about (если будем делать)
