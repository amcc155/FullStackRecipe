import { Typography, Box, CardContent, Card, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios'

const AddCollectionModal = ({ isOpen, recipe}) => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/collections`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                }
            )
            setCollections(response.data.collections)
        }catch(err){
            setError(err)
        }
    }
    fetchCollections()
    
  }, []);

  //function to add recipe to collection on click
  const handleAddCollectionClick = async (recipe, collectionId)=>{
    
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/collections`, 
        {
         collectionId: collectionId,
         recipeId: recipe
        },
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
      )
    }catch(err){
      setError(error)
    }
  }

  return (
    isOpen && (
        
       
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          padding: 1,
          boxSizing:'border-box',
          gridGap:10,
          width: 300,
          height: 450,
          backgroundColor: "white",
          position: "absolute",
          right: 100,
          top: 2,

          border: "2px solid orange",
        }}
      >
        {collections.map((collection) => (
            <Box sx = {{position:'relative', width:'100%', height:'auto', aspectRatio:'1'}}>
            <Card sx = {{height:'100%', width: '100%'}}>
                <CardContent>
                    <Typography> {collection.name} </Typography>
                    </CardContent>
                </Card>

                {/* overlay */}
                <Box sx = {{
                    position:'absolute',
                    top:0,
                    left:0,
                   
                    height:'100%',
                    width:'100%',
                    bgcolor:'white',
                    opacity:0,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    transition:'opacity 0.3s',
                    '&:hover':{
                        opacity:1,
                    },
                }}>
                    <Button onClick = {()=> handleAddCollectionClick(recipe.id, collection.id)}
                    variant = "contained"
                    startIcon = {<AddIcon />}
                    sx = {{bgcolor:'white', color:'black'}}>
                        Add 
                        </Button>
                    </Box>
            </Box>
        ))}
        <Box
          sx={{
            backgroundColor: "red",
            width: "100%",
            aspectRatio:'1',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </Box>
       
       
      </Box>
      
        ))
    
  
};
export default AddCollectionModal;
