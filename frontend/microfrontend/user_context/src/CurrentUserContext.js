import { createContext, useState, createElement } from "react";

export const CurrentUserContext = createContext({});

export const CurrentUserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  return createElement(
    CurrentUserContext.Provider,
    { value: { currentUser, setCurrentUser } },
    props.children
  );
};




