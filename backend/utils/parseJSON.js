const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: 'postgresql://localhost/recipesdb' });

async function loadData() {
  const rawData = JSON.parse(fs.readFileSync('US_recipes_null.json'));
  for (const key in rawData) {
    const recipe = rawData[key];

    const {
      cuisine, title, rating, prep_time, cook_time,
      total_time, description, nutrients, serves
    } = recipe;

    const clean = (val) => (isNaN(val) ? null : val);

    await pool.query(
      `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        cuisine,
        title,
        clean(rating),
        clean(prep_time),
        clean(cook_time),
        clean(total_time),
        description,
        JSON.stringify(nutrients),
        serves
      ]
    );
  }
  console.log('Data inserted!');
  pool.end();
}

loadData();
