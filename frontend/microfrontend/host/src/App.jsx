import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import InfoTooltip from "./components/InfoTooltip";
import JWTCheck from "auth/JWTCheck";
import { CurrentUserContextProvider } from 'user_context';
import "./index.css";


const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);


const App = function () {
  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [jwtChecked, setJwtChecked] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const navigate = useNavigate();

  const handleJwtChange = event => {
    setJwtChecked(true);
    setIsLoggedIn(event.detail.isLoggedIn);
    setEmail(event.detail.email);
    navigate('/');
  }

  const handleUserRegistred = event => {
    setTooltipStatus("success");
    setIsInfoToolTipOpen(true);
    navigate("/signin");
  }

  const handleAuthError = event => {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  useEffect(() => {
    addEventListener("jwt-change", handleJwtChange);
    addEventListener("user_registred", handleUserRegistred);
    addEventListener("auth_error", handleAuthError);
    return () => {
      removeEventListener("jwt-change", handleJwtChange);
      removeEventListener("user_registred", handleUserRegistred);
      removeEventListener("auth_error", handleAuthError);
    }
  }, []);

  function closeTooltipPopup() {
    setIsInfoToolTipOpen(false);
  }

  return (
    <div className="page__content">
      jwtChecked ?
      (
      <Header email={email} />
      <Routes>
        <Route exact path="/" element={
          isLoggedIn ? (
            <Main />
          ) : (
            <Navigate to="/signin" />
          )}>
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeTooltipPopup}
        status={tooltipStatus}
      />
      ):(<JWTCheck />)
    </div >
  );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </BrowserRouter>
)