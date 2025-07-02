const client = require('../db')
const { Router } = require('express');
const authenticate = require('../middleware/authenticate');


const reviewRouter = Router();

//post a rreview to a recipe by id
reviewRouter.post('/recipes/:recipeId/reviews', authenticate, async (req, res) => {
    const { recipeId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id;
    const query = `
    WITH inserted_review AS (
        INSERT INTO reviews(rating, review, recipe_id, user_id) 
        VALUES($1, $2, $3, $4)
        RETURNING id, rating, review, recipe_id, user_id
    )
    SELECT r.*, u.username 
    FROM inserted_review r
    JOIN users u ON r.user_id = u.id;
`;
    const values = [rating, review, recipeId, userId];

    try {
        const response = await client.query(query, values);
        return res.json({ review: response.rows[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
})

//get reviews that use has made
reviewRouter.get('/users/:userId/reviews', async (req, res) => {
    const user = req.params.userId
    const query = 'SELECT * FROM reviews as r JOIN recipes as rcp on r.recipe_id = rcp.id  where r.user_id = $1'
    try {
        const response = await client.query(query, [user])
        return res.json({ reviews: response.rows })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

//get reviews by recipe id and include user information
reviewRouter.get('/recipes/:recipeId/reviews', async (req, res) => {
    const { recipeId } = req.params;
    const query = 'SELECT * FROM reviews as r JOIN users as u on r.user_id = u.id WHERE recipe_id = $1';
    const values = [recipeId];

    try {
        const response = await client.query(query, values);
        console.log(response.rows);
        return res.json({ reviews: response.rows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
})




module.exports = reviewRouter;