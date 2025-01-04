import {
  Modal,
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdvancedSearchContext } from "../context/AdvancedSearchContext";
import { Link } from 'react-router-dom';


const SearchModal = () => {
  const [options, setOptions] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);
  const { setFormData, formData, handleChange, handleDelete } = useContext(
    AdvancedSearchContext
  );

  console.log(formData);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300);

    // Clean up the timeout if searchWord changes before the timeout completes
    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (debouncedSearchWord) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/ingredients/${debouncedSearchWord}`
          );
          console.log(response.data);
          setOptions(response.data?.map((option) => option.name));
        } catch (err) {
          console.error(err);
        }
      } else {
        setOptions([]);
      }
    };

    fetchIngredients();
  }, [debouncedSearchWord]);

 
  return (
    <>
    {}
      <Container
        sx={{
          mt: 5,
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            gap:1,
            flexDirection: "column",
            alignItems: "center",
          }}
          component="header"
        >
          <Typography variant="h4"> Advanced Search </Typography>
          <Typography variant="p">
            {" "}
            Add all of the ingredients that you want in the recipe{" "}
          </Typography>

          <Autocomplete

            value={searchWord}
            onChange={(e, newValue) => {
              handleChange("includeIngredients", newValue);
            }}
            inputValue={searchWord}
            onInputChange={(e, newInputValue) => {
              setSearchWord(newInputValue);
            }}
            options={options}
            sx={{ width: "30%", mt:2}}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        {/* start of added component */}
        <Box
          sx={{
            display:'flex',
            flexWrap:'wrap',
            alignItems: 'center',
            justifyContent:'center',
            gap:2,
            px: 30,
            pt:8
          }}
        >
          {formData.includeIngredients?.map((ingredient) => (
            <Chip
            sx = {{
                minWidth:200
            }}  
              variant="outlined"
              color="primary"
              label={ingredient}
              onDelete={() => handleDelete('includeIngredients', ingredient)}
            />
          ))}
        </Box>

<Link to="/advanced/search/exclude">
  <Button>Next</Button>
</Link>

      </Container>
    </>
  );
};
export default SearchModal;
