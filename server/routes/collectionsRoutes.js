const Router = require('express').Router;
const authenticate = require('../middleware/authenticate');
const collectionsRouter = Router();
const client = require('../db');
const axios = require('axios')
require('dotenv').config();

collectionsRouter.get('/', authenticate, async (req, res) => {
    const user_id = req.user?.id
    const query = 'SELECT * FROM collections WHERE user_id = $1'
    const values = [user_id]

    try {
        const response = await client.query(query, values);
        console.log(response.rows)
        res.json({ collections: response.rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

})

//add to collection
collectionsRouter.post('/', authenticate, async(req,res) => {
    const user_id = req.user?.id 
    const {collectionId, recipeId} = req.body
    const query = 'INSERT INTO collectionsrecipes (collection_id, recipe_id) VALUES  ($1, $2) RETURNING *'
    const values =  [collectionId, recipeId]

    //make sure user id equals the user id associated with the collections table
    const verifyQuery = 'SELECT user_id FROM collections WHERE id = $1'
    const verifyQueryValues = [collectionId]
    try{
        const response = await client.query(verifyQuery, verifyQueryValues)
        if(response.rows.length <= 0){
            return res.status(403).json({error: 'Not authorized to add to collection'})
            
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }

    //insert into table 
    try{
        const response = await client.query(query, values)
        res.json({addedCollection: response.rows[0]})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
module.exports = collectionsRouter