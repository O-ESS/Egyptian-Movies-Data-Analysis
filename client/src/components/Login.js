import { Box, width } from '@mui/system';
import React from 'react'
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { Alert } from '@mui/material';
import App from '../App';
import { Navigate } from 'react-router';
import { render } from 'react-dom';
// import FacebookLogin from './FacebookLogin';

         




// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="/">
//        EM40-70
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


const theme = createTheme();

 const Login = (props) => {
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [message , setMessage] = React.useState({isVisible: false , message: "I am here"});
  const [logged , setLogged ] = React.useState( props.isLogged );
  const [error , setError] = React.useState(false);
  const [finish, setFinish] = React.useState(false);


const handleSubmit = async (event) => {
  event.preventDefault();
  if(username == "" || password == "" ){
    setError(true);}
  else{
    const user = {
      username:   username ,
      password:   password 
    }
    await axios.post('http://localhost:8080/auth/login' , user)
    .then(res => {
      console.log(res.data);
      if(res.data != null){
        localStorage.setItem('username', user.username);
        localStorage.setItem('user token', res.data.token);
        localStorage.setItem('type', res.data.type);
        setLogged(true);
        setUsername(user.userName);
        setFinish(true);
        
        //setMessage( {isVisible: true , message: res.data+ ""} );
      }
        
    }).catch(err => {
      console.log(err)
      alert("There is no user with this Username and passowrd");
  });
  }
  console.log(message);
  if (message.message.valueOf() == "success".valueOf()  ){
    setMessage( {isVisible: true , message: "success"} );
    setLogged(true);
    setFinish(true);
    console.log(username," login")
    return(
      <>
      <App  isLogged={true} userName={ username }/>
      <Link href="/auth/login" variant="body2">
                  Go Back To Home Page
      </Link>
</>
    )
    
  }

};
if ( logged == true ) {

  return (
    window.location.href='/'
)
}
else {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="usename"
                  autoComplete="email"
                  error = {error && username == ""}
                  onChange={ e => { setUsername(e.target.value); setMessage({isVisible:false, message:""});}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error = {error && password == ""}
                  onChange={ e => { setPassword(e.target.value); setMessage({isVisible:false, message:""});}}
                />
              </Grid>
            </Grid>
            <br />
            {
            message.isVisible && <Alert variant="filled" severity="warning"> {message.message} </Alert>
          }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            {/* <FacebookLogin/> */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't Have an account? Sign Up !!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }}  /> */}
      </Container>
    </ThemeProvider>
    { finish ?
      <Navigate
            to={{
            pathname: "/",
            state: { isLogged  : logged, username : username }
          }}
        /> : <></>
      }
      </>
  );
}





}


export default Login ;

