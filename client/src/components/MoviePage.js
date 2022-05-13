// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import StarRateIcon from '@mui/icons-material/StarRate';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { textAlign } from '@mui/system';
import { Rating } from 'react-simple-star-rating'
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';



export default function MoviePage() {

  const [movieData, setMovieData] = useState();
  const [openRate, setOpenRate] = useState(false);
  const [yourRating, setYourRating] = useState(false);
  const [rating, setRating] = useState(0) // initial rating value
  const { movieID } = useParams()
  const token = localStorage.getItem('user token')
  const auth = {
    headers: { token }
  }

  const handleRating = (rate) => {

    setRating(rate)
    // console.log("token " + localStorage.getItem('user token'))
    axios.post('http://localhost:8080/auth/rate', { movieID, rate }, auth)
      .then((result) => {
        setMovieData(result.data.updatedMovie)
      }).catch(err => {
        console.log(err)
        alert("you rated this movie before , to re-rate it delete the old rate then re-rate again");
      });

  }

  const handleAlert = () => {
    if (token)
      setOpenRate(true)

    else {
      let text = "You must be logged in to rate movies";
      if (window.confirm(text)) {
        window.location.href = "login"
      }
    }

  }

  function StarRating() {
    return (
      <div className='App'>
        <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
      </div>
    );
  }

  // let yourRating = true
  function yourRatingText() {
    // console.log(yourRating)

    if (yourRating == true) return "Your Rating : 4/5"
    else return ""
  }


  useEffect(() => {
    axios.get(`http://localhost:8080/${movieID}`)
      .then(res => {
        setMovieData(res.data)
        // setYourRating(res.data.found)
        // console.log(yourRating)

      })
      .catch(err => console.log(err.response.data))


    axios.get(`http://localhost:8080/auth/foundRate`, auth)
      .then(res => {
        setYourRating(res.data)
        console.log(yourRating)

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
                  style={{
                    display: "block",
                    // justifyContent: "center",
                    // textAlign: "center"
                  }}
                >


                  <Typography variant="subtitle2" color="text.secondary"
                    style={{
                      margin: "auto",
                      fontWeight: "bolder"
                    }}>
                    {yourRatingText()}
                  </Typography>
                  <Button size="large"
                    variant="contained"
                    startIcon={<StarRateIcon />}
                    onClick={handleAlert}
                  >
                    Rate
                  </Button>


                </CardActions>

              </Grid>

            </Grid>
          </Card>
        </Container>

      }

      {
        openRate &&
        <>

          <Container>

            <Dialog
              open={openRate}
              onClose={() => setOpenRate(false)}
              fullWidth={true}
              // maxWidth={maxWidth}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"

            >
              <DialogTitle id="alert-dialog-title">Rate</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography component="div" variant="h5"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}>
                    {movieData.Name}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: 8,
                  display: "block"
                }}>
                <StarRating />
                <Button size="large" variant="contained" style={{ marginTop: 8 }} > Remove Rating </Button>
              </DialogActions>

            </Dialog>
          </Container>

        </>
      }
    </>
  );
}


