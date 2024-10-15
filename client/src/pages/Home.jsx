import { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardMedia,
  Box,
  Container,
  Stack,
  Typography,
  Grid2
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import LinkIcon from '@mui/icons-material/Link';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
const Home = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  useEffect(() => {
    const recipes = localStorage.getItem("randomRecipes");
    const latestFetch = localStorage.getItem("latestFetch");

    if (recipes && latestFetch) {
      const now = new Date();
      const lastFetchDate = new Date(latestFetch);
      const hoursDiff = (now - lastFetchDate) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        setRandomRecipes(JSON.parse(recipes));
        setSelectedRecipe(JSON.parse(recipes)[0]);
        return;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/random/recipes"
        );
        console.log(response.data.recipes);
        localStorage.setItem(
          "randomRecipes",
          JSON.stringify(response.data.recipes)
        );
        localStorage.setItem("latestFetch", new Date());
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
         
        }}
      >
        <Box
          component="aside"
          sx={{
            width: "40%",
             maxHeight:'calc(100vh - 64px)',
            overflow:'scroll'
          }}
        >
          <List>
            {randomRecipes.map((recipe) => (
              <ListItem disableGutters key={recipe.id}>
                <Card
                  onClick={() => setSelectedRecipe(recipe)}
                  sx={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 48,
                        width: 48,
                        borderRadius: "50%",
                      }}
                      image={recipe?.image}
                    />
                    <p> {recipe.title} </p>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          component="main"
          sx={{
            width: "100%",
            display:'flex',
            flexDirection:'column'
          }}
        >
          <img
            style={{ width: "40%", margin: "0 auto", display: "block" }}
            src={selectedRecipe?.image}
          />

          <Container disableGutters
          maxWidth = 'xl'
            sx={{
              bgcolor: "#f5f5f5",
              px:15,
              width:'100%',
              height: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent:'space-between'
            }}
          
          >
            <Stack direction="row" spacing={7}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <AccessTimeIcon />
                <Typography>
                  {" "}
                  {`${selectedRecipe?.readyInMinutes} MINUTES`}{" "}
                </Typography>
              </Box>
              
              <Box sx = {{display: 'flex', gap:1}}>
               <PeopleOutlineRoundedIcon/>
               <Typography> {`${selectedRecipe?.servings} SERVINGS`} </Typography> 
               </Box>
            </Stack>
            <Stack direction= 'row' spacing={2} sx = {{
              
            }}>
            <a href = {selectedRecipe?.sourceUrl} target = '_blank' rel = "noopener noreferrer">
                <LinkIcon/>
                </a>
                <BookmarkBorderIcon/>

                </Stack>
          </Container>
          <Container  maxWidth = 'xl' disableGutters sx = {{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection:'column', pt:2, backgroundColor:'#d3d3d3'}}>
          <Typography sx = {{
            mb:4,
          
          }} variant="h4"> Recipe Ingredients </Typography>
         
            <Grid2 container justifyContent={'space-between'} spacing = {2} sx = {{
                width:'60%',
              
            }}>
            {selectedRecipe?.extendedIngredients.map((ingredient) =>(
                <Grid2 item size = {5}  >
                <Stack direction = 'row' alignItems='center'>
                <CheckIcon/>
                <Typography> {ingredient.original} </Typography>
                </Stack>
                </Grid2>
               
              
               
            ))}
             </Grid2>
        
          </Container>
        </Box>
        
      </Box>
    </>
  );
};
export default Home;
