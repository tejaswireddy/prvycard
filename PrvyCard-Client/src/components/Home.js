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
import RegisterUser from"../Services/Register";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );}

  

  

function register(fname,lname,email,uname){
  if(fname != "" && lname !=  "" && email != "" && uname != "")
  {
    let url = "http://localhost:8013/api/register/?fname=" +fname + "&lname=" + lname+ "&email=" + email + "&pname=" + uname;

      const promise =  fetch(url,{ method: 'post'});
      promise.then(()=>{})
      window.alert("Welcome to PRVYCard.Click OK to continue.")
      
      promise.then((res)=>{
        if(res.status == 200){
          window.alert("registered successfully Please check inbox for code to create account")
          window.location='/account';
        }
        if(res.status == 201){
          window.alert("Email already exists.Please login.")
          window.location = '/login';
        }
        if(res.status == 202){
          window.alert("Username already exists.Please login.")
          window.location = '/login';
        }
      }) 
}
else{
  window.alert("Please enter all the details")
}
};

export default function SignUp() {
  const classes = useStyles();
  const[fname,setfname] = React.useState('');
  const[lname,setlname] = React.useState('');
  const[email,setemail] = React.useState('');
  const[uname,setuname] = React.useState('');
   
  const[isSending,setIsSending] = useState(false);
const isMounted =useRef(true);

useEffect(() =>{
  //sendRequest(fname,lname,email,uname)
  return () =>{
    isMounted.current = false
  }
},[])

const sendRequest = useCallback(async(fname,lname,email,uname) => {
    
  if(isSending) return;
    setIsSending(true);
    let url = "http://localhost:8013/api/register/?fname=" +fname + "&lname=" + lname+ "&email=" + email + "&pname=" + uname;

    let res = await fetch(url,{ method: 'post'});
    
    if(res.status == 200){
      window.alert("registered successfully Please check inbox for code to create account")
      window.location='/account';
    }
    if(res.status == 201){
      window.alert("Email already exists.Please login.")
      window.location = '/login';
    }
    if(res.status == 202){
      window.alert("Username already exists.Please login.")
      window.location = '/login';
    }
    if(isMounted.current)
    setIsSending(false);
  },[]);


  return (
    <MuiThemeProvider theme={theme}>
   
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography variant="h1">PRVY CARD</Typography>
        <Typography variant="h5">
          Please register below
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                color="secondary"
                autoFocus
                onChange={(e)=>setfname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                color="secondary"
                onChange={(e)=>setlname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
                onChange={(e)=>setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="User Name"
                id="username"
                color="secondary"
                onChange={(e)=>setuname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSending}
            onClick={()=>sendRequest(fname,lname,email,uname)}
          >
         <Typography variant="h3">Register</Typography> 
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" onClick={()=>history.push("/account")} variant="body2">
              <Typography variant="h4"> Already registered? Create an account</Typography> 
               
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={()=>history.push("/login")} variant="body2">
              <Typography variant="h4"> Already have an Account? Sign-in</Typography> 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>

    </MuiThemeProvider>
  );
}