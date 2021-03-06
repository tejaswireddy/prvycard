import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";



export  const ProtectedRoute = ({

  component: Component,
  ...rest
}) =>  {
  return (
    <Route
      {...rest}
      render={props => {

      const res = auth.getAuth().then((res) => {
    if(res){
window.alert(res)
    }
      })

        
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
      }}
    />
  );
};
