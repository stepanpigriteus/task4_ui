// // Промежуточное ПО для проверки токена в каждом запросе к защищенным маршрутам
// export const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     console.log(token)
//     if (token == null) {
//         return res.sendStatus(401); // Ошибка 401 (Unauthorized), если токен отсутствует
//     }

//     jwt.verify(token, 'your_secret_key_here', (err, user) => {
//         if (err) {
//             return res.sendStatus(403); // Ошибка 403 (Forbidden), если токен недействителен
//         }
        
//         req.user = user; // Сохраняем информацию о пользователе в объекте запроса
//         next(); // Переходим к следующему промежуточному ПО или маршруту
//     });
// };