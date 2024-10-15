const express = require('express')
const app = express()
require('dotenv').config(); 
const cors = require('cors');
const axios = require('axios'); 


app.use(cors({
  origin: 'http://localhost:3000', 
}));

const api_key = process.env.RAPIDAPI_KEY


app.get('/api/random/recipes', async(req, res) => {
    try{
        const response = await axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random", {
           params:{
            number:10
           },
            headers:{
                "x-rapidapi-key":
                api_key,
              "x-rapidapi-host":
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        })
        res.json(response.data)
     
    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
})
app.listen(3001, ()=>{
    console.log('listenig on port 3001')
})



