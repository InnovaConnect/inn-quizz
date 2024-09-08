import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { Footer } from './components/footer';

import { Home } from './pages/home';
import { Quiz } from './pages/quiz';
import { Question } from './pages/question';
import { Questions } from './pages/questions';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'quiz',
    element: <Quiz />
  },
  {
    path: '/perguntas',
    element: <Questions />
  },
  {
    path: '/perguntas/adicionar',
    element: <Question />
  },
  {
    path: '/perguntas/:id',
    element: <Question />
  }
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Footer />
    </>
  );
}
