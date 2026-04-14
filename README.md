Запуск рішень
Відкрити термінал у папці з файлами проєкту і запустити потрібний файл командою:
node <назва_файлу>.js <порт>

Приклад:
node sequential_file_reads.js 3000

або перевірити роботу через curl:
curl http://localhost:3000/<маршрут>

Виконані вправи:

Sequential File Reads
Файл: sequential_file_reads.js
Маршрут: /sequential
Послідовно зчитує файли a.txt, b.txt, c.txt та повертає об’єднаний результат і час виконання.

Parallel Reads
Файл: parallel_reads.js
Маршрут: /parallel
Зчитує файли a.txt, b.txt, c.txt паралельно за допомогою Promise.all та повертає об’єднаний результат і час виконання.

Handle Partial Failures
Файл: handle_partial_failures.js
Маршрут: /error-handling
Обробляє список файлів із тіла запиту, використовує Promise.allSettled, повертає успішно прочитані файли, помилки та загальну кількість.

Threadpool Limit
Файл: threadpool_limit.js
Маршрут: /threadpool-limit
Запускає 8 важких асинхронних задач через crypto.pbkdf2 та повертає кількість задач і час виконання.
