import axios from "axios";
import { useState, useEffect } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Container } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const UserRecipes = () => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user/recipes", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUserRecipes(response.data.recipes);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUserRecipes();
    }, []);

    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMdUp) return 3;
        return 3;
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {loading ? <p>Loading...</p> :
                <ImageList
                    variant="masonry"
                    cols={getCols()}
                    gap={8}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        mx:'auto'
                    }}
                >
                    {userRecipes.map((recipe) => (
                        <ImageListItem key={recipe.id}>
                            <img
                                src={`${recipe.imageurl}?w=248&fit=crop&auto=format`}
                                srcSet={`${recipe.imageurl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={recipe.name}
                                loading="lazy"
                            />
                            <ImageListItemBar title={recipe.name} />
                        </ImageListItem>
                    ))}
                </ImageList>
            }
        </Container>
    );
}

export default UserRecipes;