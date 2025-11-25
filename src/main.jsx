import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import AppProvider from './hooks';
import App from "./App";
import GlobalStyles from "./styles/globalStyles";
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from './config/stripeConfig'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
      <GlobalStyles />
      <ToastContainer autoClose={2000} theme="colored" />
    </BrowserRouter>
    </Elements>
    </AppProvider>
  </React.StrictMode>
);