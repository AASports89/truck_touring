import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleParlay from './pages/SingleParlay';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GameList from './components/GameList';
import Parlays from './pages/Parlays';
import ParlayForm from './components/ParlayForm';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <header>
      <Navbar />
      </header>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Routes>
           
              <Route 
                path="/"
                element={<Home />}
              />
               <Route 
                path="/" 
                element={<GameList />}
              />
              <Route 
                path="/ParlayFrom" 
                element={<ParlayForm />}
              />
              <Route 
                path="/parlays" 
                element={<Parlays />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route 
                path="/me" 
                element={<Dashboard />}
              />
              <Route 
                path="/profiles/:username" 
                element={<Dashboard />}
              />
              <Route 
                path="/parlays/:parlayId" 
                element={<SingleParlay />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
