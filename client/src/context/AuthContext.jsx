import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (info) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      //check is response is ok. if it is not throw it to the caller
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error logging in");
      }

      //if response is ok set token
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  //fetched the user when app starts, and every time token state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setLoading(false);

    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);

          setUser(data.user);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
