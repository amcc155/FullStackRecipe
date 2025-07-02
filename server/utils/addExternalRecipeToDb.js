const client = require('../db');

const addExternalRecipeToDb = async (recipeId, recipeName, url) => {
    const insertIntoRecipesQuery = 'INSERT into recipes(id, name, imageURL) VALUES($1, $2, $3) ON CONFLICT (id) DO NOTHING RETURNING *'
    const insertIntoRecipesValues = [recipeId, recipeName, url]

    try {
        await client.query(insertIntoRecipesQuery, insertIntoRecipesValues)
    } catch (err) {
        console.error('Could not insert', err)
        throw err
    }

}
module.exports = addExternalRecipeToDb
