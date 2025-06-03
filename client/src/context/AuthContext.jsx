import { createContext, useState, useEffect, useContext} from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const[loading, setLoading] = useState(true)

 const login = async(info) =>{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);

      
  } catch (err) {
      console.error(err);
  }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
   
  }

  //fetched the user when app starts, and every time token state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    
    const fetchUser = async () => {

      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data)
         
          setUser(data.user);
        } catch (err) {
          console.error(err);
        }finally{
          setLoading(false)
        }
      }
    };
    
    fetchUser();
  }, [token]);




  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };

