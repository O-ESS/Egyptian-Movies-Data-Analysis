import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import MovieCard from "./components/MovieCard"

import MovieCard from "./MovieCard"







const token = localStorage.getItem('token')




export default function AllMovies() {
    const [allMovies, setAllMovies] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/`)
            .then(res => {
                setAllMovies(res.data)
            })
            .catch(err => console.log(err.response.data))

    }, [])


    return (
        <Container sx={{ py: 4 }} maxWidth="lg">

            {allMovies && <Grid container direction="row" justifyContent="center" alignItems="center"
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >

                {allMovies.map(movieID => {
                    return <Grid item xs={4} key={movieID._id}>
                        <MovieCard key={movieID._id} movieID={movieID._id} />
                    </Grid>
                })}


            </Grid>}
        </Container>
    );
}