import { Modal, Box, Button, Container, Typography, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


const SearchModal = () => {
    const[options, setOptions] = useState([])
    const[searchWord, setSearchWord] = useState('')
    const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchWord(searchWord);
        }, 300); // Adjust the delay time as needed (300ms is common)

        // Clean up the timeout if searchWord changes before the timeout completes
        return () => {
            clearTimeout(handler);
        };
    }, [searchWord]);

    useEffect(() => {
        const fetchIngredients = async () => {
            if (debouncedSearchWord) { // Only fetch if there's a search word
                try {
                    const response = await axios.get(`http://localhost:3001/api/ingredients/${debouncedSearchWord}`);
                    console.log(response.data);
                    setOptions(response.data.map(option => option.name));
                } catch (err) {
                    console.error(err);
                }
            } else {
                setOptions([]); // Clear options if searchWord is empty
            }
        };

        fetchIngredients();
    }, [debouncedSearchWord]);
    
  return (
    <>
    
    <Container sx = {{
        mt:5
    }} maxWidth = 'xl'>
        <Box sx = {{
            textAlign: 'center',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}component= 'header'>
            <Typography variant = 'h4'> Advanced Search </Typography>
            <Typography variant = 'p' > Add all of the ingredients that you want in the recipe </Typography>
            <Autocomplete
            disablePortal
            options={options}
            sx = {{width:'200px'}}
            renderInput = {(params) => <TextField onChange = {(e) => setSearchWord(e.target.value)} {...params} label = "Ingredients" />}
            />
            </Box>
        </Container>
    </>
  );
};
export default SearchModal;
