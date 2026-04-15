
const express = require('express');
const path = require('path');
const app = express();
const pool = require('./db/index');
// Routes
const indexroutes = require('./routes/index');
const itemroutes = require('./routes/items');
const claimantroutes = require('./routes/claimants');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexroutes);
app.use('/items', itemroutes);
app.use('/claimants', claimantroutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || 'Something broke!');
});
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title TEXT,
        description TEXT,
        location TEXT,
        status TEXT,
        category TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS claimants (
        id SERIAL PRIMARY KEY,
        rollno TEXT,
        name TEXT,
        email TEXT,
        item_id INTEGER REFERENCES items(id),
        found_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tables ready");
  } catch (err) {
    console.error("❌ DB init error:", err);
  }
}

initDB();

const port = process.env.PORT|| 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});