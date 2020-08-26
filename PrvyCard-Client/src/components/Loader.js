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


async function verifyAdmin(){

    let url = "http://localhost:8013/get_user/"
    
    await axios({
      method: "GET",
      withCredentials: true,
      url: url,
    }).then((res) => {
      if(res.status == 201){
        history.push({
            pathname: '/admin1'
          })
    return true;
    
   } else {

    console.log("NOT VERIFY : "+  JSON.stringify(res))
    history.push({
      pathname: '/login'
    })
  
    return false;
    
   }
})
  }


   
export default function Loader() {

    useEffect(async() =>{

        await verifyAdmin();
    
        
      },[])
  
 

  return (
    <p>Loading..</p>
  );
}