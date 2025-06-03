import { createContext, useState } from "react";


export const AdvancedSearchContext = createContext();


const AdvancedSearchContextProvider = ({ children }) => {

    const [formData, setFormData] = useState({
        includeIngredients: [],
        excludeIngredients: [],
      });

      const handleChange = (name, value)=>{
        if(value !== null && !formData[name].includes(value)){
            setFormData({...formData, [name]:[...formData[name], value]})
        }
     
      }

      const handleDelete = (name, value)=>{
        setFormData({...formData, [name]: formData[name].filter(item => item !== value)})
      }

    
      
  return (
    <AdvancedSearchContext.Provider value = {{setFormData, formData, handleChange, handleDelete}} >{children}</AdvancedSearchContext.Provider>
  );
};

export default AdvancedSearchContextProvider;
