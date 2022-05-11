import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MovieCard from "./components/MovieCard"
import MoviePage from "./components/MoviePage"
import SearchAppBar from "./components/SearchAppBar"
import AllMovies from "./components/AllMovies"
import Login from './components/Login.js';
import SignUp from './components/SignUp';
import StatsPage from './components/StatsPage';

function App(props) {
  const [category, setCategory] = useState();
  console.log(props.userName, " app")
  return (
    <div className="">
      <BrowserRouter>
        <SearchAppBar category={category} setCategory={setCategory} isLogged={props.isLogged} userName={props.userName} />
        {/* <ResponsiveDrawer category={category} setCategory={setCategory}/> */}
        <Routes>

          <Route path="/" element={<AllMovies searchFlag={false} filterFlag={false} />} />
          <Route path="/:movieID" element={<MoviePage />} />
          <Route path="/search/:q" element={<AllMovies searchFlag={true} filterFlag={false} />} />
          <Route path="/filter/:category" element={<AllMovies filterFlag={true} searchFlag={false} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/MovieStats" element={<StatsPage />} />
        </Routes>

      </BrowserRouter>

      {/* <ResponsiveDrawer/> */}


    </div>
  );
}

export default App;
