import { Outlet, useRoutes } from 'react-router-dom';
import paths from '../router/paths.ts';
import PrivateRoute from '../router/PrivateRoute';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import NotFound from './pages/NotFound.tsx';
import Main from './pages/Main.tsx';
import UserPage from './pages/UserPage';

const App = () => {
  const pages = useRoutes([
    {
      path: paths.mainPath(),
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      children: [
        { path: paths.mainPath(), element: <Main /> },
        { path: `${paths.usersPath()}/:id`, element: <UserPage /> },
      ],
    },
    {
      path: paths.loginPath(),
      element: <Login />,
    },
    {
      path: paths.signupPath(),
      element: <SignUp />,
    },
    {
      path: paths.notFoundPath(),
      element: <NotFound />,
    },
  ]);

  return <main>{pages}</main>;
};

export default App;
