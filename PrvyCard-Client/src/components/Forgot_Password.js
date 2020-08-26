import { Form, Input, Button, Checkbox, PageHeader } from 'antd';
import React, { Component, Fragment } from 'react';
import {  DatePicker, version } from "antd";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { createBrowserHistory } from "history";
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



class Forgot_Password extends Component {

    constructor(props) {
        super(props);

        this.state = {
          username : null,
          code : null,
          password : null,
          password1 : null,
          showPass : false
        }
      
      
      }

      handleForgot = async(event) => {

        var username = this.state.username;

        let url = "http://localhost:8013/api/forgot/?username="+username;

        axios({
          method: "POST",
          withCredentials: true,
          data: {
            username: username,
          },
          url: url,
        }).then((res) => {
          if(res.status == 200){
  
            window.alert("Email with recovery code has been sent succesfully! Click ok to reset the password");
            this.setState({showPass : true});
            
          } 

          if(res.status == 201){
  
            window.alert("Please check your username again");
            this.setState({showPass : false});
      
            
          } 
    
        })
      }


      handleReset = async(event) => {
          if(this.state.password != this.state.password1){
              window.alert("Oops! Passwords do not match!");
        } else {
              console.log("In react");

            let url = "http://localhost:8013/resetPass/"

            axios({
                method: "POST",
                data: {
                  username: this.state.username,
                  password: this.state.password,
                  code: this.state.code
                },
                withCredentials: true,
                url: url,
              }).then((res) => {
                console.log('Got response '+ res.status);
            
            
                if(res.status == 200){
                    window.alert("Password updated succesfully!");
                  history.push({
                    pathname: '/login'
                  })
                }
                if(res.status == 201){
                  window.alert("Oops! User not found!")
                }

                if(res.status == 202){
                    window.alert("Error! Your Unique Code does not match!")
                  }
            
                    })

      }
    }

      onChange = async(event) => {
        this.setState({username:event.target.value});
      }

      onCode = async(event) => {
        this.setState({code:event.target.value});
      }

      onPassword = async(event) => {
        this.setState({password:event.target.value});
      }

      onPassword1 = async(event) => {
        this.setState({password1:event.target.value});
      }

      onPassword1 = async(event) => {
        this.setState({password1:event.target.value});
      }

      updatePassword= async(event) => {
        
      }
  
  
  
    render ()
    {
        const { showPass } = this.state;
      return (
        <MuiThemeProvider theme={theme}>
   <br/> <br/> <br/> <br/>
          <div align="center" >

          <Typography variant="h1">PRVY CARD</Typography>
        <Typography variant="h5">
         Forgot Password
        </Typography>


          <Form>
        <Form.Item
          label="Enter your username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input  onChange = {this.onChange} style={{ width: "300px" }}/>
        </Form.Item>
  

          <Button onClick ={this.handleForgot} type="default" htmlType="submit">
            Submit
          </Button>
        
      </Form>

 



  { showPass
    ?   <div>
    <Form> 
    <Form.Item
          label="Enter your password retrieval code"
          name="code"
          rules={[{ required: true, message: 'Please input your code!' }]}
        >
      <Input  onChange = {this.onCode} style={{ width: "300px" }}/>
      </Form.Item>

      <Form.Item
          label="Enter new-password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
      <Input  onChange = {this.onPassword} style={{ width: "300px" }}/>
      </Form.Item>

      <Form.Item
          label="confirm password"
          name="password1"
          rules={[{ required: true, message: 'Please confirm password!' }]}
        >
      <Input  onChange = {this.onPassword1} style={{ width: "300px" }}/>
      </Form.Item>


      <Button onClick ={this.handleReset} type="default" htmlType="submit">
            Reset Password
          </Button>
          </Form>

    </div>
                    
                    
     : null
                }



         
          </div>
</MuiThemeProvider>


  
    )
    }
  }

  
  
  export default Forgot_Password;
