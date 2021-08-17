import React, { Component } from "react";
import { Box, Heading, Flex, Button, ButtonGroup, Image } from "@chakra-ui/react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../lotties/online-education.json";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.lottieRef = React.createRef();
    this.state = {
      redirect: null,
      userToken: null,
    };
  }

  componentDidMount() {
    const userToken = localStorage.getItem("heriam.userToken");
    if (userToken) {
      console.log(userToken);
      this.setState({ redirect: "/dashboard", userToken: userToken });
    }

    const loadLottie = () => {
      lottie.loadAnimation({
        container: this.lottieRef.current,
        animationData: animationData,
        loop: true,
        autoplay: true,
      })
    }
    
    loadLottie()
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
        justify={{ base: "center", md: "center" }}
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "center" }}
        p={{ base: 0, md: 150 }}
      >
        <Box
          ref={this.lottieRef}
          w="600px"
          display={{ base: "none", md: "flex" }}
        ></Box>
        <Flex
          ml="15px"
          direction="column"
          justify="center"
          align={{ base: "stretch", md: "stretch" }}
        >
          <Heading as="h1" fontSize={{ base: 60, md: 100 }}>
            Heriam
          </Heading>

          <Heading as="h2" fontSize={{ base: 25, md: 35 }}>
            The honest check-in system
          </Heading>

          <ButtonGroup spacing="15px" m="10px">
            <Button as={RouterLink} to="/login">
              Log in
            </Button>
            <Button as={RouterLink} to="/register">
              Register
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    );
  }
}
