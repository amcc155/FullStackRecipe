import { createContext, useContext, useState } from "react";
const NavBarContext = createContext()

export const NavBarProvider = ({children})=>{
      const [open, setIsOpen] = useState(false);

      const toggleDrawer = () => {
        setIsOpen(!open);
      };
    
    return(
        <NavBarContext.Provider value = {{open, setIsOpen, toggleDrawer}} > {children} </NavBarContext.Provider>
    )
}

export const useNavBarContext = ()=>{
   return useContext(NavBarContext)
} 