import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { Container   } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { IconButton } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import FlightCard from './FlightCard';
import { useEffect } from 'react';
import axios from 'axios';
const SearchMovie = (props) => {
    const [movie, setMovie] = React.useState(true);
    const clickOnTheIcon = () => {
        setChecked((prev) => !prev);
      };
      const Movie={movie=movie};
}
export default SearchMovie ;