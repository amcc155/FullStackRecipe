const Router = require('express').Router;
const authenticate = require('../middleware/authenticate');
const userRouter = Router();
const client = require('../db');

//gets user details
userRouter.get('/', authenticate, async (req, res) => {
    res.json({ user: req.user });
    
});



// fetches rcipes that user saved
userRouter.get('/recipes', authenticate, async (req, res) => {
    const query = 'Select * from usersrecipes as ur JOIN recipes as r on ur.recipe_id = r.id WHERE ur.user_id = $1';
    const values = [req.user.id];

    try {
        const response = await client.query(query, values);
        res.json({ recipes: response.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// saves recipes to user
userRouter.post('/recipes', authenticate, async (req, res) => {
    const { recipeId, name, url } = req.body;
    const query1 = 'INSERT INTO usersrecipes(user_id, recipe_id) VALUES($1, $2) RETURNING *';
    const values1 = [req.user.id, recipeId];

    const query2 = 'INSERT INTO recipes(id, name, imageUrl) VALUES($1, $2, $3) RETURNING *';
    const values2 = [recipeId, name, url];

  try {
    await client.query('BEGIN');
    await client.query(query2, values2);
    const response = await client.query(query1, values1);
    await client.query('COMMIT');
    res.json({ recipe: response.rows[0] });
  }catch(err){
    await client.query('ROLLBACK');
    res.status(500).json({error: err.message});
  }
});

module.exports = userRouter;