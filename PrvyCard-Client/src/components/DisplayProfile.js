import React, {useState,useEffect,useRef} from 'react';
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import "../styles.css";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SaveIcon from '@material-ui/icons/Save';
import VCard from 'vcard-creator'
import download from 'js-file-download'
import axios from 'axios';
import { Buffer } from 'buffer'

import linkedinImage from '../utils/linkedin.png';
import facebookImage from '../utils/facebook.png';
import instagramImage from '../utils/instagram.jpeg';
import redditImage from '../utils/reddit.jpeg';
import twitterImage from '../utils/twitter.png';
import youtubeImage from '../utils/youtube.png';
import { MuiThemeProvider, createMuiTheme,ThemeProvider } from '@material-ui/core/styles';


const history = createBrowserHistory({ forceRefresh: true });

const faces = [
    "http://i.pravatar.cc/300?img=1"
  ];

  const THEME = createMuiTheme({
    typography: {
      "fontFamily": '"Montserrat, sans-serif"',
      h6: {
        "fontWeight": 600,
      },
      h5:{
        "fontWeight": 1,
        
      }

    },
  });


  const appbartheme = createMuiTheme({   overrides: {     MuiAppBar: {       colorPrimary: {         backgroundColor: "#FFC0CB"        }     }   },   palette: {     type: "dark"   } });



// Or Create your Own theme:
const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#212121',
    },
  },
});
 

theme1.typography.h1 = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  color: '#fafafa',
  fontSize: 19,
};

  theme1.typography.h3 = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    color: '#212121',
    fontSize: 25,
  };

  theme1.typography.h4 = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
      color: '#212121',
      fontSize: 15,
  };

  theme1.typography.h5 = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
      color: '#9e9e9e',
      fontSize: 15,
  };

  theme1.typography.text1 = {
    fontFamily: 'Eczar, serif',
    fontWeight: 'bold'
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      alignItems:'left'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    gg:{
        width:'100%'
    },
    App:{
        height:'50%'
    },
    card: {
      maxWidth: 500,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      },
      display: "inline-block"
    },
    media: {
      paddingTop: "56.25%"
    },
    content: {
      textAlign: "center",
      padding: 10
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    avatar: {
      display: "inline-block",
      border: "10px solid white",
      "&:not(:first-of-type)": {
        marginLeft: -12
      },
      width:'100px',
      height:'100px'
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container:{
        width:'500px',
        height:'600px'
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12)
    }
  }));

  const theme = createMuiTheme({
    breakpoints: {
      values: {
       xs: 0,
       sm: 450,
       md: 600,
       lg: 900,
       xl: 1200,
       tablet:1024
     }
   }
   });
  function useMergeState(initialState) {

    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
      setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
  }

  export function MenuAppBar() {
  
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isUser, setisUser] = useState(false);

    useEffect(() =>{
     checkisUser();
      
    },[])
    
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    

    const onLogout= (async () => {
      let url = "http://localhost:8013/logout/"

      axios({
        method: "GET",
        withCredentials: true,
        url: url,
      }).then((res) => {
        if(res.status == 200){

          history.push({
            pathname: '/login'
          })
          
        } else {
          console.log("Error in Logging out the user!");
        }
  
      })

    })



    
    function checkisUser(username){

      let url = "http://localhost:8013/get_user";

      axios({
        method: "GET",
        withCredentials: true,
        url: url,
      }).then((res) => {
        console.log('Got response '+ res.status);
    
    
        if(res.status == 200){
           console.log("User logged in!");
           setisUser(true);
        }
        if(res.status == 201){
          console.log("admin logged in!");
          setisUser(true);
        }

        if(res.status == 202){
            console.log("user not logged in!");
            setisUser(false);
          }
    
            })

    }


   
    
  
    return (
      <MuiThemeProvider theme={theme1}>

      <div className={classes.root}>
       
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1" className={classes.title}>
              PRVYCARD
            </Typography>
           
            {isUser? <div>
            {auth && (


             <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                
  
                  <MenuItem onClick={()=> { onLogout() }}> Logout</MenuItem>

                </Menu>
               
              </div>            
              
            )}
            </div>
            : null}
         
          </Toolbar>
        </AppBar>
        
      </div>
      </MuiThemeProvider>

    );
                }

                export default function SignUp(props) {
                  
                  const classes = useStyles();
                  const [FullName,SetFullName] = useState('');
                  const [Bio,SetBio] = useState('');
                  const [Phone,SetPhone] = useState('');
                  const[Image,SetImage] = useState('');
                  const [image, setImage] = useState({ preview: "", raw: "" });
                  
                  const [profile,setProfile] = useState('');
                  const[isSending,setIsSending] = useState(false);
                  
                  const isMounted =useRef(true);
                
                useEffect(() =>{
                  getProfile(props.match.params.username);
                  return () =>{
                    isMounted.current = false 
                  }
                  
                },[])
                
                  const [LinkedInState,SetLinkedInUName] = useMergeState({
                    LinkedInUName: '',
                    LinkedInDisable: true,
                  });
                  const [InstagramState,SetInstagramUName] = useMergeState({
                    InstagramUName: '',
                    InstagramDisable: true,
                  });
                  const [FacebookState,SetFacebookUName] = useMergeState({
                    FacebookUName: '',
                    FacebookDisable: true,
                  });
                  const [YoutubeState,SetYoutubeUName] = useMergeState({
                    YoutubeUName: '',
                    YoutubeDisable: true,
                  });
                  const [PinterestState,SetPinterestUName] = useMergeState({
                    PinterestUName: '',
                    PinterestDisable: true,
                  });
                  const [RedditState,SetRedditUName] = useMergeState({
                    RedditUName: '',
                    RedditDisable: true,
                  });
                  const [TwitterState,SetTwitterUName] = useMergeState({
                    TwitterUName: '',
                    TwitterDisable: true,
                  });
                  const [socialmedia, setSocialMedia] = React.useState('');
                  const [contact,setContact] = React.useState('');
                  const [showLinkedIn,setShowLinkedIn] = React.useState(false);
                  const [showInstagram,setShowInstagram] = React.useState(false);
                  const [showFacebook,setShowFacebook] = React.useState(false);
                  const [showYoutube,setShowYoutube] = React.useState(false);
                  const [showPinterest,setShowPinterest] = React.useState(false);
                  const [showReddit,setShowReddit] = React.useState(false);
                  const [showTwitter,setShowTwitter] = React.useState(false);
                  
                  const[CellPhone,setCellPhone] = React.useState('');
                  const[HomePhone,setHomePhone] = React.useState('');
                  const[occupation,setOccupation] = React.useState('');
                
                  const[showCellPhone,setShowCellPhone] = React.useState('');
                  const[showOccupation,setShowOccupation] = React.useState('');
                  const[showHomePhone,setShowHomePhone] = React.useState('');
                  const [isUser, setisUser] = useState(false);


                  const[Faxx,setShowFax] = useMergeState({
                      showFax: false,
                  faxValue: ''});
                
                const[Emaill,setShowEmail] = useMergeState({
                showEmail: false,
                emailValue: ''});
                
                const[Country,setCountry] = React.useState('');
                const[Region,setRegion] = React.useState('');
                const[Address,setAddress]=React.useState('');
                const[loc,setloc] = useState('');
                
                const ColoredLine = ({ color }) => (
                  <hr
                      style={{
                          color: color,
                          backgroundColor: color,
                          height: 5
                      }}
                  />
                );

                
                
                function getProfile(username){
                let url = "http://localhost:8013/api1/get_profile/?username="+username;
                
                  axios.get(url)
                  .then(response => {
                    
                    SetFullName(response.data.firstname);
                    
                    SetBio(response.data.bio);
                    setAddress(response.data.address);
                    
                    setCountry(response.data.contactSchema.country);
                    setRegion(response.data.contactSchema.state);
                    setHomePhone(response.data.contactSchema.home);
                    setOccupation(response.data.occupation);
                
                    if(response.data.occupation!= ""){
                      setShowOccupation(true);
                      setOccupation(response.data.occupation);
                    }
                    if(response.data.contactSchema.cell != ""){
                      setShowCellPhone(true);
                      setCellPhone(response.data.contactSchema.cell);
                    }
                    if(response.data.contactSchema.home != ""){
                      setShowHomePhone(true);
                      setHomePhone(response.data.contactSchema.home);
                    }
                    if(response.data.contactSchema.email != ""){
                      setShowEmail({showEmail:true,emailValue:response.data.email});;
                    }
                    if(response.data.contactSchema.fax != ""){
                      setShowFax({showFax:true,faxValue:response.data.contactSchema.fax});;
                    }
                    if(response.data.socialSchema.linkedin != ""){
                      SetLinkedInUName({
                        LinkedInUName: response.data.socialSchema.linkedin,
                        LinkedInDisable: false 
                      });
                      setShowLinkedIn(true);
                    }
                    if(response.data.socialSchema.instagram != ""){
                      SetInstagramUName({
                        InstagramUName: response.data.socialSchema.instagram,
                        InstagramDisable: false 
                      });
                      setShowInstagram(true);
                    }
                    if(response.data.socialSchema.facebook != ""){
                      SetFacebookUName({
                        FacebookUName: response.data.socialSchema.facebook,
                        FacebookDisable: false 
                      });
                      setShowFacebook(true);
                    }
                    if(response.data.socialSchema.youtube != ""){
                      SetYoutubeUName({
                        YoutubeUName: response.data.socialSchema.youtube,
                        YoutubeDisable: false 
                      });
                      setShowYoutube(true);
                    };
                    if(response.data.socialSchema.twitter != ""){
                      SetTwitterUName({
                        TwitterUName: response.data.socialSchema.twitter,
                        TwitterDisable: false 
                      });
                      setShowTwitter(true);
                    };
                    if(response.data.socialSchema.pinterest != ""){
                      SetPinterestUName({
                        PinterestUName: response.data.socialSchema.pinterest,
                        PinterestDisable: false 
                      });
                      setShowPinterest(true);
                    };
                    if(response.data.socialSchema.reddit != ""){
                      SetRedditUName({
                        RedditUName: response.data.socialSchema.reddit,
                        RedditDisable: false 
                      });
                      setShowReddit(true);
                    }
                
                     })
                     
                    
                
                  .catch(error => {
                    console.log("Error occured"+ error);
                
                  });
                };

                const borderProps = {
                  bgcolor: 'background.paper',
                  borderColor: 'text.primary',
                  m: 1,
                  border: 2,
                  style: { width: '7.3rem', height: '7.3rem' },
                };
              
             
                
                  async function downloadVcardFile(username,FullName,HomePhone,CellPhone,Emaill,Faxx,
                    LinkedInState,TwitterState,InstagramState,FacebookState,Country,Region,Address,Bio,
                    Pinterest,Reddit,Youtube)
                  {
                   
                
                    let imagelocationurl =
                    "http://localhost:8013/api1/get_imagelocation/?username="+username
                    
                     let ll = await axios.get(imagelocationurl)
                   
                    let url = "http://localhost:8013/api1/get_vcard/?fullname="+FullName+"&username="+username+"&filelocation="+ll.data+"&home="+
                    HomePhone+"&cell="+CellPhone+"&email="+Emaill+"&fax="+Faxx+"&linkedin="+LinkedInState+
                    "&twitter="+TwitterState+"&instagram="+InstagramState+"&facebook="+FacebookState+"&country="+Country+"&region="+Region
                    +"&address="+Address+"&bio="+Bio+"&reddit="+Reddit+"&pinterest="+Pinterest+"&Youtube="+
                    Youtube;
                
                   axios.get(url)
                    .then(response => {
                     download(response.data, 'file.vcf')
                        });
                        
                
                    };
                
                    let getprofileimageurl = "http://localhost:8013/api1/get_profileimage/?username="+props.match.params.username
                    let hrefurl = "http://localhost:3000/DisplayProfile/"+props.match.params.username
                    return (
                      <MuiThemeProvider theme={theme1}>
                        <div>
                          
                            <MenuAppBar/>
                           
                            <Container component="main" maxWidth="xs" >
                      <CssBaseline />
                      <br/>
                      <br/>
                      <ThemeProvider theme={theme1}>
                        <Grid container={true} justify="left" style = {{width:500}}>
                      <Grid item={true} >
                      <div className={classes.App} >
                      <Card className={classes.card}>
                      <CardContent className={classes.content} >
                        <div align="center">
                        <Box borderRadius="50%" {...borderProps}> 
                        <Avatar className={classes.avatar} key={faces} src={getprofileimageurl} className={classes.large} />
                        </Box>
                        </div>
                        <br/>

                        
                        <MuiThemeProvider theme={theme1}>
                      <Typography gutterBottom variant="h3">
                            {FullName}
                          </Typography>

                          <Typography variant="h4">{occupation}</Typography>

                          </MuiThemeProvider>
                    
                          <Typography
                            className={"MuiTypography--subheading"}
                            variant={"body2"}
                            align="left">
                            {Bio}
                          </Typography>
                          <br/>
                          <ColoredLine color="grey" />
                          <br/>
                          <Typography variant="h5">
                            Contact 
                          </Typography>
                          <br/>
                          <Link href={hrefurl} color="primary">
          web link : http://localhost:3000/DisplayProfile/{props.match.params.username}
  </Link>
  <br/>
          {Emaill.showEmail?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Email: {Emaill.emailValue}
          </Typography>: null}
          <br/>
                          {Address?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"} align="left">
                            Address: {Address}
                          </Typography>: null}
                          <br/>
                          {Country?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"} align="left">
                            Country: {Country}
                          </Typography>: null}
                          <br/>
                          {Region?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"} align="left">
                            Region: {Region}
                          </Typography>: null}
                          <br/>
                          <br/>
                          {showCellPhone?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"}>
                            Cell Phone: {CellPhone}
                          </Typography>: null}
                          <br/>
                          {showHomePhone?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"}>
                            Home Phone: {HomePhone}
                          </Typography>: null}
                          <br/>
                          {Faxx.showFax?<Typography
                            className={"MuiTypography--subheading"}
                            variant={"overline"}>
                            Fax: {Faxx.faxValue}
                          </Typography>: null}
                          <br/>
                          <ColoredLine color="grey" />
                          <br/>

                          <MuiThemeProvider theme={theme1}>
                          <Typography variant="h5">
                            Social Media 
                          </Typography>

                          </MuiThemeProvider>
                          
                          <div align='center' >
                          {LinkedInState.LinkedInUName != "" ? <Typography gutterBottom variant="h6" component="h1" variant="body2">
          <IconButton aria-label="linkedIn" disabled={!showLinkedIn} onClick={()=> window.open("https://www.linkedin.com/in/"+LinkedInState.LinkedInUName, "_blank")}>
             <img src={linkedinImage} height="30px" /> 
           </IconButton>
           {LinkedInState.LinkedInUName}
          </Typography>:""}
          {InstagramState.InstagramUName != "" ?
           <Typography gutterBottom variant="h6" component="h1" variant="body2">
           <IconButton aria-label="Instagram" disabled={!showInstagram} onClick={()=> window.open("https://www.instagram.com/"+InstagramState.InstagramUName,"_blank")}>
           <img src={instagramImage} height="35px" edge='start'/> 
           </IconButton>
           {InstagramState.InstagramUName}
           </Typography>: ""}
          
          {FacebookState.FacebookUName != "" ?
           <Typography gutterBottom variant="h6" component="h1" variant="body2" onClick={()=> window.open("https://www.facebook.com/"+FacebookState.FacebookUName,"_blank")}>
           <IconButton aria-label="Facebook" disabled={!showFacebook} >
           <img src={facebookImage} height="30px" edge='start'/> 
           </IconButton>
           {FacebookState.FacebookUName} 
           </Typography>: ""}
           
           {YoutubeState.YoutubeUName != ""?
           <Typography gutterBottom variant="h6" component="h1" variant="body2">
           <IconButton aria-label="YouTube" disabled={!showYoutube} onClick={()=> window.open("https://www.youtube.com/results?search_query="+YoutubeState.YoutubeUName,"_blank")}>
           <img src={youtubeImage} height="30px" edge='start'/>   
           </IconButton>
           {YoutubeState.YoutubeUName}
           </Typography>:""}
           
           {RedditState.RedditUName != "" ?
           <Typography gutterBottom variant="h6" component="h1" variant="body2">
           <IconButton aria-label="Reddit" disabled={!showReddit} onClick={()=> window.open("https://www.reddit.com/r/"+RedditState.RedditUName,"_blank")}>
           <img src={redditImage} height="30px" edge='start'/>
           </IconButton>
           {RedditState.RedditUName}
           </Typography>:""}
           
           {TwitterState.TwitterUName != "" ?
           <Typography gutterBottom variant="h6" component="h1" variant="body2">
           <IconButton aria-label="Twitter" disabled={!showTwitter} onClick={() => window.open("https://twitter.com/"+TwitterState.TwitterUName,"_blank")}>
           <img src={twitterImage} height="30px" edge='start'/>
           </IconButton>
           {TwitterState.TwitterUName}
           </Typography>:""}

                
                           </div>
                          <Divider className={classes.divider} light />
                          <Typography variant="overline" display="block" gutterBottom align='center'>
                        PRVYCARD
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom align='center'>
                        Powered by PRVY
                      </Typography>
                        </CardContent>

                     
                   

                      </Card> 
                      <br/>
                      <br/>

      

                      <div align="center">
                        <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={()=>downloadVcardFile(props.match.params.username,FullName,HomePhone,CellPhone,Emaill.emailValue,Faxx.faxValue,
                          LinkedInState.LinkedInUName,TwitterState.TwitterUName,InstagramState.InstagramUName,FacebookState.FacebookUName,Country,Region,Address,Bio,
                          RedditState.RedditUName,PinterestState.PinterestUName,YoutubeState.YoutubeUName)}
                      >
                        Add to Contact
                      </Button>
                        
                      </div>


                    </div>


                          </Grid> 
            
                          <Grid item={true}>
                              <br/>
                             
                      <br/>
                      </Grid> 
               
                     
                  </Grid>
                   <br/>
                  </ThemeProvider>
                  </Container>
                  </div>
                  </MuiThemeProvider>
                    );
                  }
