// ==UserScript==
// @name         GPT Chat History Optimizer
// @name:uk      GPT Оптимізатор історії чатів
// @namespace    https://chat.openai.com
// @version      2023.08.10.0
// @description  Цей скрипт оптимізує історію чату GPT, зберігаючи лише останні повідомлення для покращення продуктивності та зниження використання ресурсів браузера. Видалені повідомлення все одно враховуються в нових відповідях чату, забезпечуючи ефективну та швидку роботу.
// @run-at       document-end
// @author       https://github.com/Aves2001
// @match        https://chat.openai.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @homepageURL  https://github.com/Aves2001/GPT-Chat-History-Optimizer
// @supportURL   https://github.com/Aves2001/GPT-Chat-History-Optimizer/issues
// @updateURL    https://raw.githubusercontent.com/Aves2001/GPT-Chat-History-Optimizer/main/script.meta.js
// @downloadURL  https://github.com/Aves2001/GPT-Chat-History-Optimizer/raw/main/script.user.js
// @license      MIT
// ==/UserScript==


(function() {
    'use strict';
    var targetClass = 'main > div.flex-1.overflow-hidden > div > div > div > div';

    var targerClassNameObserve1 = 'flex-1 overflow-hidden';
    var targerClassNameObserve2 = 'flex flex-col text-sm dark:bg-gray-800';
    var targerClassNameObserve3 = 'relative h-full w-full transition-width flex flex-col overflow-auto items-stretch flex-1';

    var countKeepLastMessages = GM_getValue('countKeepLastMessages', 12);


    function keepLastMessages() {
        // Вибираємо всі цільові елементи
        var elements = document.querySelectorAll(targetClass);

        if (elements.length <= countKeepLastMessages) return;

        // Індекс останнього елемента, який слід залишити
        var lastIndexToKeep = elements.length - countKeepLastMessages;

        // Видаляємо зайві елементи
        for (var i = 0; i < lastIndexToKeep; i++) {
            elements[i].remove();
        }

        // Вивід кількості видалених повідомлень
        console.log("Було видалено повідомлень: " + i);
    }


    function saveSettings_CountKeepLastMessages() {
        var newCountKeepLastMessages = parseInt(prompt('Введіть нову кількість повідомлень:', countKeepLastMessages));
        if (!isNaN(newCountKeepLastMessages) && newCountKeepLastMessages >= 0) {
            GM_setValue('countKeepLastMessages', newCountKeepLastMessages);
            countKeepLastMessages = newCountKeepLastMessages;
            keepLastMessages();
        }
    }

    // Зареєструвати команди меню для виклику функції зміни налаштувань
    GM_registerMenuCommand('Змінити кількість повідомлень', saveSettings_CountKeepLastMessages, "K");
    GM_registerMenuCommand("Видалення зайвих елементів", function() {
        keepLastMessages();
    }, "C");



    // Функція для обробки комбінації клавіш Ctrl+Shift+Space
    function handleKeyPress(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'Space') {
            console.log('Натиснуто комбінацію Ctrl+Shift+Space');
            keepLastMessages();
        }
    }
    document.addEventListener('keydown', handleKeyPress);


    // Створення інстансу MutationObserver
    var targetObserver = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if (mutation.target.className === targerClassNameObserve1 ||
                    mutation.target.className === targerClassNameObserve2 ||
                    mutation.target.className === targerClassNameObserve2) {
                    keepLastMessages();
                }
            }
        }
    });
    targetObserver.observe(document, { childList: true, subtree: true });

})();
