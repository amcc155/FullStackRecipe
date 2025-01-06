import './App.css';
import NavBar from './components/NavBar';
import DailyRandom from './pages/DailyRandom';
import { ThemeProvider } from '@mui/material/';
import HomePage from './pages/HomePage';
import theme from './themes';
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from 'react-router-dom';
import SearchModal from './components/AdvancedSearch/SearchModal';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserRecipes from './pages/UserRecipes';
import AdvancedSearchContextProvider from './components/context/AdvancedSearchContext';
import ExcludeIngredients from './components/AdvancedSearch/ExcludeIngredients';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';


const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },


      {
        path: "/random/daily",
        element: (
          <DailyRandom />
        )
      },
      {
      path:"/recipes/results",
      element:(
        <SearchResults/>
      )

    },
    {
      path:'/user/recipes',
      element:<UserRecipes/>
    }
    ],
  },
    {

    path:'/advanced/search',
    element: <SearchModal/>
    },
    {
      path:'advanced/search/exclude',
      element: <ExcludeIngredients/>
    },
    {
      path:'/signup',
      element: <Signup/>
    },
{
    path:'/login',
    element:<Login/>,
  },
  
  


])

function App() {
  return (
    
    <AuthProvider>
  <AdvancedSearchContextProvider>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <HomePage />
        </RouterProvider>
      </ThemeProvider>
    </AdvancedSearchContextProvider>
    </AuthProvider>
   
    
  );
}

export default App;
