import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import DailyRandom from './pages/DailyRandom';
import { ThemeProvider } from '@mui/material/';
import HomePage from './pages/HomePage';
import theme from './themes';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SearchModal from './components/SearchModal';

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
    ],
  },
    {

    path:'/advanced/search',
    element: <SearchModal/>
    },
  


])

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <HomePage />
        </RouterProvider>
      </ThemeProvider>

    </>
  );
}

export default App;
