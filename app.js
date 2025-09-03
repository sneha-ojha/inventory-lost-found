
const express = require('express');
const path = require('path');
const app = express();

// Routes
const indexRoutes = require('./routes/index');
const itemRoutes = require('./routes/items');
const claimantRoutes = require('./routes/claimants');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexRoutes);
app.use('/items', itemRoutes);
app.use('/claimants', claimantRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || 'Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
