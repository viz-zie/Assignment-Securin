const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://localhost/recipesdb' });

exports.getPaginatedRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const total = await pool.query('SELECT COUNT(*) FROM recipes');
  const data = await pool.query(
    `SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  res.json({
    page,
    limit,
    total: parseInt(total.rows[0].count),
    data: data.rows
  });
};

exports.searchRecipes = async (req, res) => {
  const { calories, title, cuisine, total_time, rating } = req.query;
  let conditions = [];
  let values = [];
  let i = 1;

  if (title) {
    conditions.push(`LOWER(title) LIKE LOWER($${i++})`);
    values.push(`%${title}%`);
  }
  if (cuisine) {
    conditions.push(`cuisine = $${i++}`);
    values.push(cuisine);
  }
  if (rating) {
    conditions.push(`rating >= $${i++}`);
    values.push(parseFloat(rating));
  }
  if (total_time) {
    conditions.push(`total_time <= $${i++}`);
    values.push(parseInt(total_time));
  }
  if (calories) {
    conditions.push(`(nutrients->>'calories')::INT <= $${i++}`);
    values.push(parseInt(calories));
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query(`SELECT * FROM recipes ${where}`);

  res.json({ data: result.rows });
};
