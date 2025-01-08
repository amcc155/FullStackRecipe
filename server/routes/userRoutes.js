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
    const currentRecipesQuery = 'Select * from recipes where id = $1'
    const checkUserRecipesQuery = 'Select * from usersrecipes where user_id = $1 and recipe_id = $2'
    const checkUserRecipesValues = [req.user.id, recipeId]

     
   
    const query2 = 'INSERT INTO recipes(id, name, imageUrl) VALUES($1, $2, $3) RETURNING *';
    const values2 = [recipeId, name, url];

  try {
    await client.query('BEGIN');
    const currentRecipes = await client.query(currentRecipesQuery, [recipeId])

    //check if recipe already exists in the recipe table
    if(currentRecipes.rows.length === 0){
      await client.query(query2, values2);
    }

    const checkUserRecipes = await client.query(checkUserRecipesQuery, checkUserRecipesValues)

    if(checkUserRecipes.rows.length === 0){
      const response = await client.query(query1, values1);
      res.json({ recipe: response.rows[0] });
    }else{
      res.status(409).json({error: 'Recipe already saved'})
    }

    await client.query('COMMIT');
   
  }catch(err){
    await client.query('ROLLBACK');
    res.status(500).json({error: err.message});
  }
});

module.exports = userRouter;