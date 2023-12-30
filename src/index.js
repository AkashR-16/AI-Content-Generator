import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Authprovider } from "./AuthContext/AuthContext";

//stripe configuration
const stripePromise = loadStripe(
  "pk_test_51OKZk2SCp0ZPpmJZkKQmKTui9nFE5Ewl69IPwlmSX0eKIQuQlxyspa5mRlFC3I0MlEYTzXE7wjdB05mEbcQDxkWM00XBmbXSMm"
);
const options = {
  mode: "payment",
  currency: "inr",
  amount: 2020,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
//react query client
const querryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={querryClient}>
      <Authprovider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Authprovider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
