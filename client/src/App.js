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
import ResponsiveDrawer from './components/ResponsiveDrawer';

function App() {
  const [category, setCategory] = useState();
  return (
    <div className="">
      <BrowserRouter>
        <SearchAppBar category={category} setCategory={setCategory} />
        {/* <ResponsiveDrawer category={category} setCategory={setCategory}/> */}
        <Routes>

          <Route path="/" element={<AllMovies searchFlag={false} filterFlag={false} />} />
          <Route path="/:movieID" element={<MoviePage />} />
          <Route path="/search/:q" element={<AllMovies searchFlag={true} filterFlag={false}/>} />
          <Route path="/filter/:category" element={<AllMovies category={category} filterFlag={true} searchFlag={false} />} />

        </Routes>
        
      </BrowserRouter>

      {/* <ResponsiveDrawer/> */}


    </div>
  );
}

export default App;
