const express = require('express');
const cors = require('cors');
const app = express();
const recipesRouter = require('./routes/recipes');

app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipesRouter);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
