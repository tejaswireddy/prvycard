import axios from 'axios';
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ forceRefresh: true });

class Auth {
    constructor()  {
        this.authenticated = '';
    }

    async getAuth(){

        let url = "http://localhost:8013/get_user/"
      
        await axios({
          method: "GET",
          withCredentials: true,
          url: url,
        }).then((res) => {
          if(res.status == 200){
       console.log("In Auth.js and response is 200!");
       this.authenticated = true;
       return this.authenticated;
            
          } else {
            console.log("In Auth.js and response is 201!");
            this.authenticated = false;

            history.push({
                pathname: '/login'
              })

           return this.authenticated;
        
    
          }
  
      })

    }

    async getAdmin(){

      let url = "http://localhost:8013/get_user/"
    
      await axios({
        method: "GET",
        withCredentials: true,
        url: url,
      }).then((res) => {
        if(res.status == 200){
          
     var adm = "admin";

     var n = adm.localeCompare(JSON.stringify(res.data.user.firstname));


     if(n === 0){
      console.log("In Auth.js and response iz "+ adm);
      this.authenticated = true;
     return this.authenticated;
     } else {
      console.log("In Auth.js and response is 201!");
      
      this.authenticated = false;

     return this.authenticated;
     }
     
          
        } else {
          console.log("In Auth.js and response is 201!");
          this.authenticated = false;

          history.push({
              pathname: '/login'
            })

         return this.authenticated;
      
  
        }

    })

  }


    isAuthenticated(){
        return this.authenticated;
    }
  

  }
  
  export default new Auth();
  