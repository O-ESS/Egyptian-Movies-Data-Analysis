// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import React, { useState, useEffect } from "react";
import axios from "axios";



export default function MovieCard({ movieID }) {
    
    const [movieData, setMovieData] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/${movieID}`)
            .then(res => {
                setMovieData(res.data)

            })
            .catch(err => console.log(err.response.data))

    }, [])

    return (
        <>
            {movieData &&
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="film"
                        height="180"
                        image="https://source.unsplash.com/Lq6rcifGjOU"
                    // image="../../public/static/film.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movieData.Name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
        {movieData.Synopsis}
        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                            {movieData.rate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {movieData.Category}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
                </Card>
            }
        </>
    );
}

