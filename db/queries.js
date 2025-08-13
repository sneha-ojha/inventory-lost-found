const pool = require('./index');
// =====================
// ITEM QUERIES
// =====================
exports.getAllItems = async () => {
  const result = await pool.query(`
    SELECT * FROM items
    ORDER BY id DESC
  `);
  return result.rows;
};

exports.getItemById = async (id) => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

exports.insertItem = async (item) => {
  const { title, description, location, status, category } = item;

  await pool.query(
    `INSERT INTO items (title, description, location, status, category)
     VALUES ($1, $2, $3, $4, $5)`,
    [title, description, location, status, category]
  );
};


exports.updateItem = async (id, item) => {
  const { title, description, location, status } = item;
  await pool.query(
    `UPDATE items 
     SET title = $1, description = $2, location = $3, status = $4
     WHERE id = $5`,
    [title, description, location, status, id]
  );
};

exports.deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
};

// =====================
// CLAIMANT QUERIES
// =====================
exports.getAllClaimants = async () => {
  const result = await pool.query(`
    SELECT claimants.*, items.title AS item_title
    FROM claimants
    LEFT JOIN items ON claimants.item_id = items.id
    ORDER BY claimants.found_at DESC
  `);
  return result.rows;
};

exports.getClaimantByRoll = async (rollno) => {
  const result = await pool.query(`SELECT * FROM claimants WHERE rollno = $1`, [rollno]);
  return result.rows[0];
};

exports.insertClaimant = async (claimant) => {
  const { rollno, name, email, item_id } = claimant;
  await pool.query(
    `INSERT INTO claimants (rollno, name, email, item_id, found_at)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
    [rollno, name, email, item_id]
  );
};

exports.deleteClaimant = async (rollno) => {
  await pool.query(`DELETE FROM claimants WHERE rollno = $1`, [rollno]);
};

exports.searchItemsByTitle = async (query) => {
  const result = await pool.query(
    `SELECT * FROM items WHERE title ILIKE $1 ORDER BY id DESC`,
    [`%${query}%`]
  );
  return result.rows;
};

exports.searchClaimantsByName = async (query) => {
  const result = await pool.query(
    `SELECT * FROM claimants WHERE name ILIKE $1 ORDER BY rollno`,
    [`%${query}%`]
  );
  return result.rows;
};