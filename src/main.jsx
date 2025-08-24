import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Manager from './pages/Manager.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Manager/> ,
        
      },
      {
        path: "/about",
        element: <About/> ,
        
      }, {
        path: "/contact",
        element: <Contact /> ,
        
      },


    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>

         <RouterProvider router={router} />
    </HelmetProvider>

  </StrictMode>,
)
