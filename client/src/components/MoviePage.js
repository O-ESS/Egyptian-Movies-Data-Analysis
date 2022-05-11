// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { textAlign } from '@mui/system';
import { Rating } from 'react-simple-star-rating'
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';



export default function MoviePage() {

  const [movieData, setMovieData] = useState();
  const { movieID } = useParams()
  const token = localStorage.getItem('user token')


  function StarRating() {
    const [rating, setRating] = useState(0) // initial rating value
    const headers = { token: localStorage.getItem('user token') }

    if (!token)
      alert("you have to be logged in to rate movies");



    // Catch Rating value
    const handleRating = (rate) => {
      // console.log(rate)
      setRating(rate)
      // console.log("token " + localStorage.getItem('user token'))
      axios.post('http://localhost:8080/auth/rate', { movieID, rate }, { headers })
        .then((result) => {
          console.log(result.data.message)
          setMovieData(result.data.updatedMovie)
        }).catch(err => {
          console.log("🚀 ~ file: MoviePage.js ~ line 38 ~ .then ~ err", err)
          alert("you rated this movie before , to re-rate it delete the old rate then re-rate again");
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

        <Container sx={{ py: 4 }} >
          <Card >

            <Grid container direction="row"
              justifyContent="center"
              alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  alt="film"
                  height="450"
                  // width="400"
                  image="https://source.unsplash.com/Lq6rcifGjOU"

                // image="../../public/static/film.png"
                />
              </Grid>
              <Grid item xs={8}>


                <CardContent >
                  <Typography gutterBottom variant="h4" component="div" style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    {movieData.Name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    الملخص: {movieData.Synopsis}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    التقييم:  {Number((movieData.rate).toFixed(2))}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    التصنييف: {movieData.Category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    الممثلين:   {movieData.Actors}
                  </Typography>
                  <Typography variant='body1' color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    المده: {movieData.Duration}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    تاريخ الأصدار:  {movieData.Date}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right",
                  }}>
                    البطوله:  {movieData.Leading_actor}
                  </Typography>

                </CardContent>

                <CardActions
                // style={{ display: "flex", justifyContent: "center" }}
                >
                  <StarRating />
                  <Button size="large"> Delete old rating </Button>
                </CardActions>

              </Grid>

            </Grid>
          </Card>
        </Container>

      }
    </>
  );
}


