import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "teal.800",
        color: "teal.50",
      },
      a: {
        color: "teal.300",
        _hover: { color: "teal.100", textDecoration: "underline" },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme} colorScheme="teal">
        <Switch>
          <Route exact path="/"><App /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route> 
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
