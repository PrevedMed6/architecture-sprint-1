export const generateJWTEvent = (isLoggedIn, email) => {
    dispatchEvent(new CustomEvent("jwt_change", {
      detail: {
        isLoggedIn: isLoggedIn,
        email: email
      }
    }));
  }

  export const generateErrorEvent = (err) => {
    dispatchEvent(new CustomEvent("auth_error", {
      detail: err,
    }));
  }

  
  export const generateRegisterEvent = (res) => {
    dispatchEvent(new CustomEvent("user_registred", {
      detail: res,
    }));
  }