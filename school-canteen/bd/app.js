require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Підключення до бази даних
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err);
  } else {
    console.log('Підключено до бази даних');
  }
});

// Налаштування для прийому даних з форми
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Налаштування для відправки пошти
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Показ HTML-форми
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Обробка форми замовлення
app.post('/order', (req, res) => {
  const { name, email, items, total } = req.body;

  // Збереження замовлення в базу даних
  const sql = 'INSERT INTO orders (customer_name, customer_email, order_items, total_price) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, items, total], (err, result) => {
    if (err) {
      return res.status(500).send('Помилка при збереженні замовлення');
    }

    // Відправка підтвердження на пошту
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: '24g_chvv@liceum.ztu.edu.ua',
      subject: 'Нове замовлення',
      text: `Нове замовлення від: ${name}\nЕлектронна пошта: ${email}\nТовари: ${items}\nЗагальна сума: ${total}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send('Помилка при відправці повідомлення');
      }
      res.send('Замовлення успішно відправлено');
    });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
