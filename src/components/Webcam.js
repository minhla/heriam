import React, { Component } from "react";
import "../scss/main.scss";
import { Flex, Box, Spacer } from "@chakra-ui/react";

export default class Webcam extends Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
    this.webcamStream = null;
  }

  componentDidMount() {
    const video = this.videoRef.current;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.webcamStream = stream;
      video.srcObject = stream;
    });
  }

  componentWillUnmount() {
    this.webcamStream.getTracks().forEach(track => track.stop());
  }

  render() {
    return (
      <Flex justify="center">
        <Box
          as="video"
          autoPlay={true}
          ref={this.videoRef}
          w={["100%", "450px", "500px"]}
          padding={["15px"]}
          className="webcam"
        />
      </Flex>
    );
  }
}
