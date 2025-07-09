const Router = require('express').Router;
const authenticate = require('../middleware/authenticate');
const recipeRouter = Router();
const client = require('../db');
const addExternalRecipeToDb = require('../utils/addExternalRecipeToDb');
require('dotenv').config();


//user posting a like recipe
recipeRouter.post('/recipes/:recipeId/liked', authenticate, async (req, res) => {
    const { recipeId } = req.params;
    const user_id = req.user.id;
    const query = 'INSERT INTO userlikedrecipes(user_id, recipe_id) VALUES($1, $2) RETURNING *';
    const values = [user_id, recipeId];
    await client.query('BEGIN')
    try {

        const response = await client.query(query, values);
        await client.query('COMMIT')
        return res.json({ recipe: response.rows[0] });

    } catch (err) {
        await client.query('ROLLBACK')
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
);

//user deleting a liked recipe
recipeRouter.delete('/recipes/:recipeid/liked', authenticate, async (req, res) => {
    const { recipeId } = req.params
    const userId = req.user?.id
    console.log(userId)
    const deleteQuery = 'DELETE FROM userlikedrecipes WHERE user_id = $1 and recipe_id = $2 returning *';
    const deleteValues = [userId, recipeId]

    try {
        const response = await client.query(deleteQuery, deleteValues)
        return res.json({ recipe: response.rows[0] })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
})


//getting user liked recipe
recipeRouter.get('/users/:userid/liked', async (req, res) => {
    const userId = req.params.userid
    const query = 'SELECT * FROM userlikedrecipes as ul JOIN recipes as r on ul.recipe_id = r.id WHERE ul.user_id = $1';
    const values = [userId];
    try {
        const response = await client.query(query, values);
        return res.json({ recipes: response.rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
);

// fetches rcipes that user saved,, only the user should be able to see it
recipeRouter.get('/recipes/saved', authenticate, async (req, res) => {
    const query = 'Select * from usersrecipes as ur JOIN recipes as r on ur.recipe_id = r.id WHERE ur.user_id = $1';
    const values = [req.user?.id];
    try {
        const response = await client.query(query, values);
        return res.json({ recipes: response.rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// saves recipes to user
recipeRouter.post('/recipes/:recipeId/saved', authenticate, async (req, res) => {
    const { name, url } = req.body;
    const { recipeId } = req.params
    const query1 = 'INSERT INTO usersrecipes(user_id, recipe_id) VALUES($1, $2) RETURNING *';
    const values1 = [req.user.id, recipeId];
    const checkUserRecipesQuery = 'Select * from usersrecipes where user_id = $1 and recipe_id = $2'
    const checkUserRecipesValues = [req.user.id, recipeId]



    try {
        await client.query('BEGIN');

        //insert the recipe into recipe table. if recipe is already there because another user inserted, it will ignore the error
        await addExternalRecipeToDb(recipeId, name, url)
        //check if recipe is already saved

        const checkUserRecipes = await client.query(checkUserRecipesQuery, checkUserRecipesValues)

        if (checkUserRecipes.rows.length === 0) {
            const response = await client.query(query1, values1);
            await client.query('COMMIT');
            return res.json({ recipe: response.rows[0] });
        } else {
            return res.status(409).json({ error: 'Recipe already saved' })
        }



    } catch (err) {
        await client.query('ROLLBACK');
        return res.status(500).json({ error: err.message });
    }
});

//delete recipe from saved
recipeRouter.delete('/recipes/:recipeId/saved', authenticate, async (req, res) => {
    const { recipeId } = req.params
    const userId = req.user?.id
    const deleteRecipeQuery = 'DELETE FROM usersrecipes where user_id = $1 and recipe_id = $2 returning *'
    const deleteValues = [userId, recipeId]

    try {
        const response = await client.query(deleteRecipeQuery, deleteValues)
        return res.json({ recipe: response.rows[0] })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })

    }


})
module.exports = recipeRouter