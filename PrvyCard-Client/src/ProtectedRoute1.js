import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";



export  const ProtectedRoute1 = ({

  component: Component,
  ...rest
}) =>  {
  return (
    <Route
      {...rest}
      render={props => {

      const res = auth.getAdmin().then((res) => {
        if (res) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      })

      if(res){
    
          return <Component {...props} />;

      }

        
        
      }}
    />
  );
};
