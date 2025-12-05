import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { ToastContainer } from "react-toastify";
import AppProvider from './hooks';
import GlobalStyles from "./styles/globalStyles";
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from './config/stripeConfig';
import { ThemeProvider } from "styled-components";
import { standardTheme } from "./styles/themes/standard";

console.log("API_KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("API_URL:", import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={standardTheme}>
  <GlobalStyles />
  <AppProvider>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
      <Router />
      </BrowserRouter>
    </Elements>

    <ToastContainer autoClose={2000} theme="colored" />
  </AppProvider>
</ThemeProvider>

  </React.StrictMode>
);