import React, { useEffect } from "react";
import * as auth from "../utils/auth.js";
import * as events from "../utils/events.js";

function JWTCheck() {
      React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
          auth
            .checkToken(token)
            .then((res) => {
              events.generateJWTEvent(true, res.data.email);
            })
            .catch((err) => {
              localStorage.removeItem("jwt");
              events.generateJWTEvent(false, '');
            });
        }
      }, []);
      
      return (<></>)
}

export default JWTCheck;