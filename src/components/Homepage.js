import React, { Component, useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Button,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, Redirect } from "react-router-dom";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null, userToken: null };
  }

  componentDidMount() {
    const userToken = localStorage.getItem("heriam.userToken");
    if (userToken) {
      console.log(userToken);
      this.setState({ redirect: "/dashboard", userToken: userToken });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { userToken: this.state.userToken },
          }}
        />
      );
    }
    return (
      <Flex
        h="100vh"
        w="100%"
        justify="center"
        direction="column"
        align="center"
      >
        <Heading
          as="h1"
          fontSize={["50px", "60px", "80px"]}
          bgGradient="linear(to-r, teal.50,teal.300)"
          bgClip="text"
        >
          Hyriam
        </Heading>

        <Heading
          as="h2"
          fontSize={["25px", "30px", "35px"]}
          fontWeight="semibold"
          p="10px"
        >
          The honest check-in system
        </Heading>
        <ButtonGroup spacing="15px" m="10px">
          <Link as={RouterLink} to="/login">
            <Button
              colorScheme="teal"
              m="5px"
              _hover={{ color: "teal.500", bg: "white" }}
            >
              Log in
            </Button>
          </Link>
          <Link as={RouterLink} to="/register">
            <Button
              colorScheme="teal"
              bg="white"
              color="teal.500"
              _hover={{ color: "white", bg: "teal.500" }}
              m="5px"
            >
              Register
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    );
  }
}
