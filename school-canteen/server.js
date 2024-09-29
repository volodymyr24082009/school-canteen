const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Статичні файли (HTML, CSS, JS)

// Маршрут для отримання замовлень
app.post('/submit-order', (req, res) => {
    const order = req.body;

    // Збереження замовлень у файл (або можна використати базу даних)
    fs.readFile('orders.json', (err, data) => {
        if (err) throw err;
        let orders = JSON.parse(data);
        orders.push(order);

        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
            if (err) throw err;
            res.status(200).json({ message: 'Замовлення успішно отримано!' });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
