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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function createAccount(firstname,lastname,email,prvycode,username,password){
  if(firstname != "" && lastname != "" && email != "" && prvycode != "" && username != "" && password != ""){
    
    let url = "http://localhost:8013/api1/login/?username="+username+"&unique_code="+prvycode+"&password="+password;
    let res =  fetch(url,{ method: 'post'});
   
    res.then(()=>{})
      window.alert("Welcome to PRVYCard.Click OK to continue.")

      res.then((result)=>{
        if(result.status == 200){
          window.alert("Account created")
          window.location='/login';
        }
        if(result.status == 404){
          window.alert("User Not Found.Please register first.");
          window.location='/';
        }
        if(result.status == 403){
          window.alert("User Not verified by Admin");
        }
        if(result.status == 204){
          window.alert("Prvy Code Entered is incorrect");
        }
      
      }) 

    /*axios.post(url)
    .then(response => {
      window.alert(response.status)
      console.log("The response status in admin is " + response.status);
      console.log(response.data)
     
      //window.location.reload();
        });*/

  }else{
    window.alert("Please enter information in all the fields")
  }

};

export default function SignUp() {
  const classes = useStyles();

  const[firstName,SetFirstName] = React.useState('');
  const[lastName,SetLastName] = React.useState('');
  const[email,SetEmail] = React.useState('');
  const[username,SetUserName] = React.useState('');
  const[prvycode,SetPrvyCode] = React.useState('');
  const[password,SetPassword] = React.useState('');
  
  const[isSending,setIsSending] = useState(false);
  const isMounted =useRef(true);
  
  useEffect(() =>{
    //sendRequest(fname,lname,email,uname)
    return () =>{
      isMounted.current = false
    }
  },[])

  const sendRequest = useCallback(async(firstname,lastname,email,prvycode,username,password) => {
   
    if(isSending) return;
      setIsSending(true);
      let url = "http://localhost:8013/api1/login/?username="+username+"&unique_code="+prvycode+"&password="+password;
    
      let result = await fetch(url,{ method: 'post'});
      
      if(result.status == 200){
        window.alert("Account created")
        window.location='/login';
      }
      if(result.status == 404){
        window.alert("User Not Found.Please register first.");
        window.location='/';
      }
      if(result.status == 403){
        window.alert("User Not verified by Admin");
      }
      if(result.status == 204){
        window.alert("Prvy Code Entered is incorrect");
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
        Create your account
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
                autoFocus
                onChange={(e)=>SetFirstName(e.target.value)}
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
                onChange={(e)=>SetLastName(e.target.value)}
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
                onChange={(e)=>SetEmail(e.target.value)}
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
                onChange={(e)=>SetUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="prvycode"
                label="prvy code"
                id="prvycode"
                onChange={(e)=>SetPrvyCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                onChange={(e)=>SetPassword(e.target.value)}
                type="password"
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
            onClick={()=>sendRequest(firstName,lastName,email,prvycode,username,password)} >
            Create account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" onClick={()=>history.push("/login")} variant="body2">
                
                <Typography variant="h4">Already have an account? Sign in</Typography> 
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