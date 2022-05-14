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
  const [yourRating, setYourRating] = useState();
  const [rating, setRating] = useState(0) // initial rating value
  const { movieID } = useParams()
  const token = localStorage.getItem('user token')
  const userID = localStorage.getItem('userID')
  console.log("🚀 ~ file: MoviePage.js ~ line 35 ~ MoviePage ~ userID", userID)

  const auth = {
    headers: { token }
  }

  const handleRating = (rate) => {

    setRating(rate)
    // console.log("token " + localStorage.getItem('user token'))
    axios.post('http://localhost:8080/auth/rate', { movieID, rate }, auth)
      .then((result) => {
        setMovieData(result.data.updatedMovie)
        setOpenRate(false)
        setTimeout(() => {
          window.location.reload()
        }, 100)

      }).catch(err => {
        console.log(err)
        alert("you rated this movie before , to re-rate it delete the old rate then re-rate again");
      });

  }

  const handleRemoveRating = () => {

    // setRating(rate)
    // console.log("token " + localStorage.getItem('user token'))

    axios.get(`http://localhost:8080/auth/removeRate/${movieID}/${userID}`, auth)
      .then(res => {
        // console.log(userID)
        // setYourRating(res.data)
        setOpenRate(false)
        setTimeout(() => {
          window.location.reload()
        }, 100)
        console.log(yourRating)

      })
      .catch(err => console.log(err.response.data))

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
    console.log(yourRating)

    if (yourRating) return `Your Rating : ${yourRating} / 5`
    else return ""
  }


  useEffect(() => {
    axios.get(`http://localhost:8080/${movieID}`)
      .then(res => {
        setMovieData(res.data)
        console.log(movieID)
      })
      .catch(err => console.log(err.response.data))


    axios.get(`http://localhost:8080/auth/foundRate/${movieID}/${userID}`, auth)
      .then(res => {
        console.log(userID)
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
                    <b>الملخص:</b> {movieData.Synopsis}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    <b> التقييم: </b>  {Number((movieData.rate).toFixed(2))}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    <b>التصنييف: </b> {movieData.Category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    <b>الممثلين:</b>   {movieData.Actors}
                  </Typography>
                  <Typography variant='body1' color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    <b>المدة:</b> {movieData.Duration}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right"
                  }}>
                    <b>  تاريخ الأصدار:</b>   {movieData.Date}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    textAlign: "right",
                  }}>
                    <b> البطولة:</b>  {movieData.Leading_actor}
                  </Typography>

                </CardContent>

                <CardActions
                  style={{
                    display: "block",
                    // justifyContent: "center",
                    // textAlign: "center"
                  }}
                >


                  {
                    yourRating &&
                    <Typography variant="subtitle2" color="text.secondary"
                      style={{
                        margin: "auto",
                        fontWeight: "bolder"
                      }}>
                      {yourRatingText()}
                    </Typography>
                  }
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

                {yourRating &&
                  <Button size="large"
                    variant="contained"
                    style={{ marginTop: 8 }}
                    onClick={handleRemoveRating}>
                    Remove Rating
                  </Button>
                }
              </DialogActions>

            </Dialog>
          </Container>

        </>
      }
    </>
  );
}


