const client = require('../db')
const { Router } = require('express');
const authenticate = require('../middleware/authenticate');


const reviewRouter = Router();

//post a recipe by id
reviewRouter.post('/:recipeId', authenticate, async (req, res) => {
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

    try{
        const response = await client.query(query, values);
        res.json({ review: response.rows[0] });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

//get a review by id
reviewRouter.get('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const query = 'SELECT * FROM reviews as r JOIN users as u on r.user_id = u.id WHERE recipe_id = $1';
    const values = [recipeId];

    try{
        const response = await client.query(query, values);
        console.log(response.rows);
        res.json({ reviews: response.rows });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

//get a reviews by id
reviewRouter.get



module.exports = reviewRouter;