const express = require('express')
const app = express()
const path = require("path")
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const authRouter = require('./routes/authRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const reviewRouter = require('./routes/reviewRoutes.js');
const collectionsRouter = require('./routes/collectionsRoutes');
const recipeRouter = require('./routes/recipeRoutes.js');
app.use(express.json());





const api_key = process.env.RAPIDAPI_KEY



app.use(cors({
    origin: "http://localhost:3000",
}));


app.get('/api/random/recipes', async (req, res) => {
    try {
        const response = await axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random", {
            params: {
                number: 10
            },
            headers: {
                "x-rapidapi-key":
                    api_key,
                "x-rapidapi-host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        })
        res.json(response.data)

    } catch (err) {
        console.error(err.response?.status, err.response?.data || err.message);

        res.status(500).json({ error: err.message })
    }
})

app.get('/api/recipes/search', async (req, res) => {
    const { includeIngredients, excludeIngredients } = req.query

    try {
        const response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', {
            params: {
                number: 20,
                ingredients: includeIngredients,

            },
            headers: {
                "x-rapidapi-key":
                    api_key,
                "x-rapidapi-host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }

        })
        res.json(response.data)
        console.log(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}


)

app.get('/api/recipes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
            headers: {
                "x-rapidapi-key":
                    api_key,
                "x-rapidapi-host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        })
        res.json(response.data)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}
)

app.get('/api/ingredients/:query', async (req, res) => {
    const { query } = req.params
    console.log(query)
    try {
        const response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete', {
            params: {
                query: query,
                number: 5
            },
            headers: {
                "x-rapidapi-key":
                    api_key,
                "x-rapidapi-host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }

        })
        res.json(response.data)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})



app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/', reviewRouter)
app.use('/', collectionsRouter)
app.use('/', recipeRouter)


// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('listenig on port')
})
