// ==UserScript==
// @name         GPT Chat History Optimizer
// @name:uk      GPT Оптимізатор історії чатів
// @namespace    https://chat.openai.com
// @version      2023.08.11.0
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