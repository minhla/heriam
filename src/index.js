import React, { useState } from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/Homepage";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Checkin from "./components/Checkin";
import themeOverrides from "./styles/index"

console.log(themeOverrides)
const customTheme = extendTheme(themeOverrides);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
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
