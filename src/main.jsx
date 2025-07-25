import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from "./Routes";
import { RouterProvider } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Components/Context/AuthContext';


import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';




const client = new ApolloClient({
  uri: "https://edu-server-ten.vercel.app/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <AuthProvider>

      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)


