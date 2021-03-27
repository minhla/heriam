import React, { Component } from "react";
import { Flex, Box, Spacer, Button, ButtonGroup, Link } from "@chakra-ui/react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import Webcam from "./Webcam";
const faceapi = require("@vladmandic/face-api");

const Checkin = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <ButtonGroup>
        <Button
          colorScheme="teal"
          m="5px"
          _hover={{ color: "teal.500", bg: "white" }}
          onClick={goBack}
        >
          Dashboard
        </Button>
      </ButtonGroup>
      <Webcam />
    </>
  );
};

export default Checkin;
