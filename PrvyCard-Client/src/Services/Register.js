
import axios from 'axios';

var RegisterUser = async (
    fname,
    lname,
    email,
    uname
  ) => {
      console.log("hhjhj");
      let url = "http://localhost:8013/api/register/?fname=" +fname + "&lname=" + lname+ "&email=" + email + "&pname=" + uname;
    

await axios.post(url)
    .then(response => {
      console.log("The response is " + response.status);
      if(response.status === 200){
        return 'success';
      }
      
    })
    .catch(error => {
      console.log("Error occured"+ error);
    });

  };

  export default RegisterUser;