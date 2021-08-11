import React, { useState } from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/Homepage";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Checkin from "./components/Checkin";
import { LOCAL_STORAGE_KEY } from "./constants/constants";

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
          <Route exact path="/"><Homepage /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route> 
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/:id"><Checkin/></Route>
          <Route path="*" component={() => <Heading>404 NOT FOUND</Heading>}></Route>
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
