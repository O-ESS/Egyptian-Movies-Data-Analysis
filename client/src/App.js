// import React, { useState, useEffect } from "react";
// import axios from "axios";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import MovieCard from "./components/MovieCard"
import SearchAppBar from "./components/SearchAppBar"
import AllMovies from "./components/AllMovies"

function App() {
  return (
    <div className="">
      <SearchAppBar />
      <AllMovies />
    </div>
  );
}

export default App;
