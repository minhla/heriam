import React, { Component } from "react";
import { Flex, Box, Container, Spinner } from "@chakra-ui/react";
import { USER_DESCRIPTORS } from "../constants/constants";
import { Redirect } from "react-router";
export default class Webcam extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.webcamStream = null;
    this.user = USER_DESCRIPTORS.filter(
      (element) => element.username === this.props.username
    );
  }

  state = {
    isAuthenticated: false,
    isSubmitting: false,
    redirect: false,
  }

  timeout = 0;

  componentDidMount() {
    const video = this.videoRef.current;
    let optionsSSDMobileNet;
    const userDescriptor = this.user[0].descriptor;

    let descriptorArray = [];
    //Array manipulation to get the values only
    for (var e in userDescriptor) {
      descriptorArray.push(userDescriptor[e]);
    }
    //User reference
    const descriptorArrayFloat32 = new Float32Array(descriptorArray);

    const startWebcam = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.webcamStream = stream;
        video.srcObject = stream;
      });
    };

    const setupFaceApi = async () => {
      console.log("Setting up Face API...");

      //default is webgl backend
      await faceapi.tf.setBackend("webgl");

      await faceapi.tf.enableProdMode();
      await faceapi.tf.ENV.set("DEBUG", false);
      await faceapi.tf.ready();

      await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);

      console.log(faceapi.nets);

      optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
        minConfidence: minScore,
        maxResults,
      });
    };

    const faceapi = require("@vladmandic/face-api");
    const modelPath = "./weights/";
    const minScore = 0.1;
    const maxResults = 5;

    Promise.all([setupFaceApi()]).then(startWebcam);

    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors(`${this.user.username}`, [
        descriptorArrayFloat32,
      ]),
    ];

    console.log(
      "User descriptors stored in database => ",
      labeledDescriptors[0]
    );
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

    const videoClass = document.getElementById("webcam");

    // Face recognition
    videoClass.addEventListener("play", () => {
      this.timeout = setInterval(async () => {
        const detections = await faceapi
          .detectSingleFace(videoClass, optionsSSDMobileNet)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          const tempFaceDescriptor = detections.descriptor;
          console.log("Scanned face descriptor => ", tempFaceDescriptor);
          const recognitionResult =
            faceMatcher.findBestMatch(tempFaceDescriptor);
          console.log(
            parseFloat(recognitionResult._distance) > 0.6
              ? this.setState({isAuthenticated: true})
              : this.setState({isAuthenticated: false})
          );
        }
      }, 2000);
    });
  }

  componentWillUnmount() {
    //Stops camera stream when component unmounts
    if (this.webcamStream != null) {
      this.webcamStream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(this.timeout);
  }

  render() {
    return (
      <Flex justify="center" direction="column">
        <Box
          as="video"
          autoPlay={true}
          ref={this.videoRef}
          w={["100%", "450px", "500px"]}
          padding={["15px"]}
          id="webcam"
          muted
        />
        <Spinner label="processing" color="teal.300" thickness="5px" size="xl" />
        <Container><pre>{JSON.stringify(this.state,null,2)}</pre></Container>
      </Flex>
    );
  }
}
