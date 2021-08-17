import React, { Component } from "react";
import { Flex, Box, Spinner, Text } from "@chakra-ui/react";
import { USER_DESCRIPTORS } from "../constants/constants";
import { Redirect } from "react-router";
import SpinnerText from "./SpinnerText";
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
    isScanning: null,
    redirect: null,
  };

  timeout = 0;

  componentDidMount() {
    this._isMounted = true;

    const successHandle = () => {
      this.setState({
        isAuthenticated: true,
        isSubmitting: true,
        isScanning: false,
      });

      setTimeout(
        function () {
          if (this._isMounted) {
            this.setState({ redirect: true });
          }
        }.bind(this),
        3500
      );
    };

    const failureHandle = () => {
      this.setState({
        isAuthenticated: false,
        isSubmitting: false,
        isScanning: true,
      });
    };

    const video = this.videoRef.current;

    const faceapi = require("@vladmandic/face-api");
    const modelPath = "./weights/";

    let optionsSSDMobileNet, optionsTinyFaceDetector;
    const userDescriptor = this.user[0].descriptor; //Edited to 1 to get Haixia's descriptors

    let descriptorArray = [];
    //Array manipulation to get the values only
    for (var e in userDescriptor) {
      descriptorArray.push(userDescriptor[e]);
    }
    //User reference descriptors
    const descriptorArrayFloat32 = new Float32Array(descriptorArray);
    console.log('Your information =>',this.user)
    const setupFaceApi = async () => {
      console.log("Setting up Face API...");

      //default is webgl backend
      await faceapi.tf.setBackend("webgl");

      await faceapi.tf.enableProdMode();
      await faceapi.tf.ENV.set("DEBUG", false);
      await faceapi.tf.ready();

      await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);

      console.log(faceapi.nets);

      // optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      //   minConfidence: minScore,
      //   maxResults,
      // });
      if (this._isMounted) {
        this.setState({ isScanning: true });
      }
      optionsTinyFaceDetector = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.6,
      });
    };

    const startWebcam = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.webcamStream = stream;
        video.srcObject = stream;
      });
    };

    Promise.all([setupFaceApi()]).then(startWebcam());

    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors(`${this.user.username}`, [
        descriptorArrayFloat32,
      ]),
    ];

    // console.log(
    //   "User descriptors stored in database => ",
    //   labeledDescriptors[0]
    // );
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

    const videoClass = document.getElementById("webcam");

    // Face recognition
    videoClass.addEventListener("play", () => {
      this.timeout = setInterval(async () => {
        while (this.state.isScanning) {
          const detections = await faceapi
            .detectSingleFace(videoClass, optionsTinyFaceDetector)
            .withFaceLandmarks()
            .withFaceDescriptor();
          if (detections) {
            const tempFaceDescriptor = detections.descriptor;
            console.log("Scanned face descriptor => ", tempFaceDescriptor);
            const recognitionResult =
              faceMatcher.findBestMatch(tempFaceDescriptor);
            console.log(
              parseFloat(recognitionResult._distance) > 0.6
                ? successHandle()
                : failureHandle()
            );
          } else {
            failureHandle();
          }
        }
      }, 2500);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    //Stops webcam stream when component unmounts
    if (this.webcamStream != null) {
      this.webcamStream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(this.timeout);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }

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
        <SpinnerText
          scanningStatus={this.state.isScanning}
          text={"Scanning for your face. Please look directly at the webcam"}
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </Flex>
    );
  }
}
