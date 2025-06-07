import {
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

const SideBar = ({ randomRecipes, setSelectedRecipe }) => {
  return (
    <Box
      component="aside"
      sx={{
        width: "25%",

        overflow: "scroll",
        flexShrink: 0,
      }}
    >
      <List>
        {randomRecipes?.map((recipe) => (
          <ListItem disableGutters key={recipe.id}>
            <Card
              onClick={() => setSelectedRecipe(recipe)}
              sx={{
                height: "auto",
                width: "100%",
                cursor: "pointer",
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
  );
};
export default SideBar;
