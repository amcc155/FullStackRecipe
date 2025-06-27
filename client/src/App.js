import './App.css';
import NavBar from './components/NavBar';
import DailyRandom from './pages/RandomPage/DailyRandom';
import { ThemeProvider } from '@mui/material/';
import HomePage from './pages/HomePage';
import theme from './themes';
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from 'react-router-dom';
import SearchModal from './components/AdvancedSearch/SearchModal';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserRecipes from './pages/UserRecipes';
import AdvancedSearchContextProvider from './context/AdvancedSearchContext';
import ExcludeIngredients from './components/AdvancedSearch/ExcludeIngredients';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RecipePage from './pages/RecipePage/RecipePage';
import { NavBarProvider } from './context/NavBarContext'
import { Box } from '@mui/material/';
import { useMediaQuery } from '@mui/material/';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


const Layout = () => {
  const isMedium = useMediaQuery(`(min-width:768px)`)
  return (


    <>
      <Box sx={{ display: isMedium ? 'flex' : 'block', minHeight: isMedium ? '100dvh' : 'auto' }}>
        <NavBar />
        <Box sx={{ flexGrow: 1, height: isMedium ? '100dvh' : 'calc(100dvh - 54px)' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
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
        path: '/profile',
        element: <ProfilePage />,
      },

      {
        path: '/recipe/:id',
        element: <RecipePage />
      },

      {
        path: "/random/daily",
        element: (
          <DailyRandom />
        )
      },
      {
        path: "/recipes/results",
        element: (
          <SearchResults />
        )

      },
      {
        path: '/user/recipes',
        element: <UserRecipes />
      }
    ],
  },
  {

    path: '/advanced/search',
    element: <SearchModal />
  },
  {
    path: 'advanced/search/exclude',
    element: <ExcludeIngredients />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />,
  },




])

function App() {
  return (

    <AuthProvider>
      <NavBarProvider>
        <AdvancedSearchContextProvider>

          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}>
                <HomePage />
              </RouterProvider>
            </QueryClientProvider>

          </ThemeProvider>
        </AdvancedSearchContextProvider>


      </NavBarProvider>
    </AuthProvider >


  );
}

export default App;
