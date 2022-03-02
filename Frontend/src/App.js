import './App.css';
import React from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import  Header  from './components/Header.js';
import Login  from './components/Login.js';

import SignUp2 from './components/Signup2'
import MovieCard from './components/MovieCard'


function App(props) {
  
   //console.log(localStorage.getItem('user token'));
  return (
   <Router>   
   {   <Header  isLogged={props.isLogged}  userName={props.userName}/>   }
   <div className="mt-10" />
     <Switch>
<Route exact path="/">
    <MovieCard/>
</Route>





<Route path="/login">

  <Login/>
</Route>

<Route path="/signup">
  <SignUp2/>
</Route>
{/* <Route path="/*">
  <Error />
</Route> */}




</Switch>
</Router>


);
}

export default App;
