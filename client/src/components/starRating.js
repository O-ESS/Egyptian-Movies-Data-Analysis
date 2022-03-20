import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';

export default function StarRating() {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    console.log(rate)
    setRating(rate)
    axios.post('http://localhost:8080/rate' , rating)
    .then((result) => {
      console.log(result.data.message);
      
    }).catch(err => {
      console.log(err);
  });
    // other logic
  }

  return (
    <div className='App'>
      <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
    </div>
  )
}
