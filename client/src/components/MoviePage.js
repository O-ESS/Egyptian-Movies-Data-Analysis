// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { textAlign } from '@mui/system';
import { Rating } from 'react-simple-star-rating'
import { Alert } from '@mui/material';



export default function MoviePage() {

    const [movieData, setMovieData] = useState();
    const { movieID } = useParams()


    function StarRating() {
        const [rating, setRating] = useState(0) // initial rating value
      
        // Catch Rating value
        const handleRating = (rate) => {
          console.log(rate)
          setRating(rate)
          axios.post('http://localhost:8080/auth/rate' , movieID, rating, localStorage.getItem('user token') )
          .then((result) => {
            console.log(result.data.message);
            setMovieData(result.data.updatedMovie)
          }).catch(err => {
            console.log(err);
            alert("you have to be logged in to rate movies");
        });
          // other logic
        }
      
        return (
          <div className='App'>
            <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
          </div>
        );
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
                <Card sx={{   width: 2030,
                    height: 1000}}>
                    <CardMedia
                        component="img"
                        alt="film"
                        height="400"
                        width= "2030"
                        image="https://source.unsplash.com/Lq6rcifGjOU"
                    // image="../../public/static/film.png"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h2" component="div" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                            {movieData.Name}
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                            الملخص: {movieData.Synopsis}
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                           التقييم:  {Number((movieData.rate).toFixed(2))} 
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                          التصنييف: {movieData.Category}
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                          الممثلين:   {movieData.Actors}
                        </Typography>
                        <Typography variant='h4' color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                          المده: {movieData.Duration}
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right"
      }}>
                           تاريخ الأصدار:  {movieData.Date}
                        </Typography>
                        <Typography variant="h4" color="text.secondary" style={{
        display: "flex",
        justifyContent: "flex-end",
        textAlign: "right",
      }}>
                           البطوله:  {movieData.Leading_actor}
                        </Typography>
                        <StarRating/> <Button > Delete old rating </Button>
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

