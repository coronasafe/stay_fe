import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './Index.css';
import Navbar from './components/Navbar/Navbar';
import SingleRoom from "./pages/Rooms/SingleRoom";

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import Facilitator from './pages/Facilitator/Facilitator';
import Rooms from './pages/Rooms/Rooms';
import NotFound from './pages/NotFound/NotFound';
import Book from "./pages/Book/Book";

function App() {
  return (
    <div className="app">
      <Router>
          <Navbar />
          <main>
            <Switch>  
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/user" exact component={User} />
              <Route path="/facilitator" exact component={Facilitator} />
              <Route path="/rooms" exact component={Rooms} />
              <Route path="/:slug/book" component={Book} /> 
              <Route  path="/rooms/:slug" component={SingleRoom} /> 
              <Route component={NotFound} />
            </Switch>
          </main>
      </Router>
    </div>
  );
}

export default App;
