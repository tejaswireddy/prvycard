import React ,{ useState,useEffect,useRef,useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from "history";
import axios from 'axios';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#212121',
    },
  },
});
 

theme.typography.h1 = {
  fontFamily: 'Eczar, serif',
  fontWeight: 'bold',
  fontSize: 47,
};

  theme.typography.h3 = {
    fontWeight: 'bold',
      color: '#eceff1'
  };

  theme.typography.h4 = {
    fontFamily: 'Montserrat, sans-serif',
  };


const history = createBrowserHistory({ forceRefresh: true });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function timeoutData(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}


   
export default function SignIn() {
  const classes = useStyles();
  const[username,setUserName]= useState('');
  const[password,setPassword]=useState('');

const[isSending,setIsSending] = useState(false);
const isMounted =useRef(true);

useEffect(() =>{
  return () =>{
    isMounted.current = false
  }
},[])

const sendRequest = useCallback(async (username,password) => {
 
  
  if(username == "admin" && password=="admin"){

      setIsSending(true);
  //let res = await fetch("http://localhost:8013/login1/?username="+username+"&password="+password,{ method: 'post',  credentials: 'same-origin',});
 let url = "http://localhost:8013/login1/"

  axios({
    method: "POST",
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
    url: url,
  }).then((res) => {
    console.log('Got response '+ res.status);

    if(res.status == 404){
      window.alert("Invald Credentials. Please register or try again")
      //history.push("/login");
    }

    if(res.status == 200){
      history.push({
        pathname: '/profile/'+username,
        state: { username: username }
      })
    }
    if(res.status == 201){
      history.push({
        pathname: '/admin',
        state: { username: username }
      })
    }
   
    if(isMounted.current)
    setIsSending(false);
  })

  
  }


  else{
//if(isSending) return;
  setIsSending(true);

 let url = "http://localhost:8013/login1/"


  axios({
    method: "POST",
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
    url: url,
  }).then((res) => {
    console.log('Got response '+ res);
    if(res.status == 200){
      history.push({
        pathname: '/profile/'+username,
        state: { username: username }
      })
    }
    if(res.status == 201){
      history.push({
        pathname: '/admin',
        state: { username: username }
      })
    }
    if(res.status == 202){

      window.alert("Invalid Credentials!")
      history.push("/login");
    }
    if(isMounted.current)
    setIsSending(false);
  }
  
  );


}

})

  
 

  return (
    <MuiThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography variant="h1">PRVY CARD</Typography>
        <Typography variant="h5">
         Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={(e)=>setUserName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="user name"
            autoComplete="username"
            autoFocus
          />
          <TextField
          onChange={(e)=>setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSending} 
            onClick={()=>{
              sendRequest(username,password)}
            }
          >
           <Typography variant="h3">Login</Typography> 
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" onClick={()=>history.push("/forgot_password")}variant="body2">
              <Typography variant="h4"> Forgot Password?</Typography> 
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={()=>history.push("/")}variant="body2">

                <Typography variant="h4"> Don't have an account? Register</Typography> 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </MuiThemeProvider>
  );
}