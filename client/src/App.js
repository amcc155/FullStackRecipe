import './App.css';
import NavBar from './components/NavBar';
import DailyRandom from './pages/DailyRandom';
import { ThemeProvider } from '@mui/material/';
import HomePage from './pages/HomePage';
import theme from './themes';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SearchModal from './components/AdvancedSearch/SearchModal';
import Login from './pages/Login';
import AdvancedSearchContextProvider from './components/context/AdvancedSearchContext';
import ExcludeIngredients from './components/AdvancedSearch/ExcludeIngredients';
import SearchResults from './pages/SearchResults';

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
      path:'/login',
      element: <Login/>
    },
  


])

function App() {
  return (
    <>
  <AdvancedSearchContextProvider>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <HomePage />
        </RouterProvider>
      </ThemeProvider>
    </AdvancedSearchContextProvider>
    </>
  );
}

export default App;
