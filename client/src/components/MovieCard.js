// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



export default function MovieCard({ movieID }) {

    const [movieData, setMovieData] = useState();
    let navigate = useNavigate();

    async function handleClick() {
        // e.preventDefault();
        // console.log(searchText)
        navigate(`/${movieID}`, { replace: true });
        window.location.reload();

        // history.push(`/search/${searchText}`)
        // history.go()
    }

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
                <div onClick={console.log(`${movieID}`)}>
                    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                        <CardActionArea  >
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
                        </CardActionArea>
                    </Card>
                </div>
            }
        </>
    );
}

