import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage } from './pages/home';
import { DashboardPage } from './pages/dashboard';
import { NotFoundPage } from './pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);