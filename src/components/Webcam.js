import React, { Component } from "react";
import "../scss/main.scss";
import { Flex, Box, Spacer } from "@chakra-ui/react";

export default class Webcam extends Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const video = this.videoRef.current;
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  }

  render() {
    return (
      <Flex justify="center">
        <Box
          as="video"
          as="video"
          autoPlay={true}
          ref={this.videoRef}
          w={["100%", "450px", "500px"]}
          padding={["15px"]}
        />
      </Flex>
    );
  }
}
