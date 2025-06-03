const Router = require('express').Router;
const authenticate = require('../middleware/authenticate');
const collectionsRouter = Router();
const client = require('../db');
const axios = require('axios')
require('dotenv').config();

//get all collectoins
//check if request tries to get it with the first image of each collection recipe
collectionsRouter.get('/', authenticate, async (req, res) => {
    const user_id = req.user?.id

    const values = [user_id]


    const query = ` 
   WITH images AS (
  SELECT 
    cr.collection_id,
    (array_agg(r.imageURL ORDER BY r.id))[1:3] AS previewImages
  FROM recipes r
  LEFT JOIN collectionsrecipes cr ON r.id = cr.recipe_id
    GROUP BY cr.collection_id
)
  SELECT c.id, c.name, COUNT(cr.recipe_id) as countRecipes, i.previewImages
 FROM collections c
    LEFT JOIN collectionsrecipes cr on c.id = cr.collection_id
 LEFT JOIN images i on i.collection_id = c.id
 WHERE c.user_id = $1
  GROUP BY c.id, c.name, i.previewImages`

    try {
        const response = await client.query(query, values)
        console.log(response.rows)
        res.json({ collections: response.rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

})

// collectionsRouter.get('/withRecipes', authenticate, async (req, res) => {
//     const user_id = req.user?.id
//     const query = `SELECT c.id, c.name, json_agg(json_build_object('recipeName', r.name, 'imageURL', r.imageURL)) as collectionRecipes
//     FROM collections as c 
//     LEFT JOIN collectionsrecipes as cr ON cr.collection_id = c.id
//     LEFT JOIN recipes as r ON r.id = cr.recipe_id
//     WHERE c.user_id = $1
//     GROUP BY c.name, c.id
//     `
//     const values = [user_id]

//     try {
//         const response = await client.query(query, values)

//         res.json({ collections: response.rows })

//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }

// })

//add to collection
collectionsRouter.post('/recipe', authenticate, async (req, res) => {
    const { collectionId, recipeId } = req.body
    const values = [collectionId, recipeId]
    const query = `WITH inserted AS (
  INSERT INTO collectionsrecipes (collection_id, recipe_id)
  VALUES ($1, $2)
  RETURNING collection_id
),
images AS (
  SELECT 
    cr.collection_id,
    (array_agg(r.imageURL ORDER BY r.id))[1:3] AS previewImages
  FROM recipes r
  LEFT JOIN collectionsrecipes cr ON r.id = cr.recipe_id
  JOIN inserted ins on ins.collection_id = cr.collection_id
  GROUP BY cr.collection_id
)
SELECT 
  c.id, 
  c.name, 
  COUNT(cr.recipe_id) AS countRecipes,
  i.previewImages
FROM collections c
 JOIN collectionsrecipes cr ON c.id = cr.collection_id
JOIN inserted ins ON c.id = ins.collection_id
LEFT JOIN images i ON c.id = i.collection_id
GROUP BY c.id, i.previewImages, c.name;
`

    //make sure user id equals the user id associated with the collections table
    const verifyQuery = 'SELECT user_id FROM collections WHERE id = $1'
    const verifyQueryValues = [collectionId]
    try {
        const response = await client.query(verifyQuery, verifyQueryValues)
        if (response.rows.length <= 0) {
            return res.status(403).json({ error: 'Not authorized to add to collection' })

        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

    //insert into table 
    try {
        const response = await client.query(query, values)
        res.json({ addedCollection: response.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



//add a collection
collectionsRouter.post('/', authenticate, async (req, res) => {
    const { collectionName } = req.body
    const userId = req.user?.id
    if (collectionName.length >= 50) {
        res.status(400).json({ error: 'Collection Name must be under 50 characters' })
    }

    const query = 'INSERT INTO collections (user_id, name) VALUES ($1, $2) RETURNING *'
    const values = [userId, collectionName]

    try {
        const response = await client.query(query, values)
        res.json({ addedCollection: response.rows[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }


})

module.exports = collectionsRouter