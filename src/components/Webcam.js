import React, { Component } from "react";
import { Flex, Box, Spinner, Text } from "@chakra-ui/react";
import { LOCAL_STORAGE_KEY } from "../constants/constants";
import { Redirect } from "react-router";
import SpinnerText from "./SpinnerText";
export default class Webcam extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.webcamStream = null;
    this.userbase = JSON.parse(localStorage.getItem("heriam.users"));
    this.userToken = localStorage.getItem("heriam.userToken");
    this.user = this.userbase.find((e) => e.username === this.userToken);
  }

  readyHandle = () => {
    this.setState({
      isAuthenticated: false,
      isScanning: true,
      isSubmitting: false,
      isSettingUp: false,
    });
  };

  successHandle = () => {
    this.setState({
      isAuthenticated: true,
      isSettingUp: false,
      isSubmitting: true,
      isScanning: false,
    });
  };

  failureHandle = () => {
    this.setState({
      isAuthenticated: false,
      isSubmitting: false,
      isScanning: true,
    });
  };

  faceapi = require("@vladmandic/face-api");
  modelPath = "./weights/";
  optionsTinyFaceDetector;
  referenceFaceDescriptor;

  state = {
    isSettingUp: true,
    isScanning: false,
    isAuthenticated: false,
    isProcessing: false,
    isSubmitting: false,
    redirect: null,
  };

  setupFaceAPI = async () => {
    console.log("Setting up Face API...");

    //default is webgl backend
    await this.faceapi.tf.setBackend("webgl");

    await this.faceapi.tf.enableProdMode();
    await this.faceapi.tf.ENV.set("DEBUG", false);
    await this.faceapi.tf.ready();

    await this.faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelPath);
    await this.faceapi.nets.tinyFaceDetector.loadFromUri(this.modelPath);
    await this.faceapi.nets.faceLandmark68Net.loadFromUri(this.modelPath);
    await this.faceapi.nets.faceRecognitionNet.loadFromUri(this.modelPath);

    console.log(this.faceapi.nets);
  };

  startWebcam = () => {
    if (this._isMounted) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.webcamStream = stream;
        this.videoRef.current.srcObject = stream;
      });

      this.readyHandle();
    }
  };

  recognizeFace = () => {
    setInterval(async () => {
      while (this.state.isScanning && !this.state.isProcessing) {
        const detections = await this.faceapi
          .detectSingleFace(
            this.videoRef.current,
            new this.faceapi.TinyFaceDetectorOptions({})
          )
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          this.setState({ isProcessing: true });
          const tempFaceDescriptor = detections.descriptor;
          console.log("Scanned face descriptor => ", tempFaceDescriptor);
          const recognitionResult =
            this.faceMatcher.findBestMatch(tempFaceDescriptor);
          console.log(
            parseFloat(recognitionResult._distance) > 0.6
              ? this.successHandle()
              : this.failureHandle()
          );
          this.setState({ isProcessing: false });
        } else {
          this.failureHandle();
          this.setState({ isProcessing: false });
        }
      }
    }, 2500);
  };

  componentDidMount() {
    this._isMounted = true;

    const successHandle = () => {
      this.setState({
        isAuthenticated: true,
        isSettingUp: false,
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

    const readyHandle = () => {
      this.setState({
        isAuthenticated: false,
        isScanning: true,
        isSubmitting: false,
        isSettingUp: false,
      });
    };

    const video = this.videoRef.current;

    const faceapi = require("@vladmandic/face-api");
    const modelPath = "./weights/";

    let optionsTinyFaceDetector;

    const userDescriptor = this.user.descriptor;
    console.log("Passed in userDescriptor =>", userDescriptor);

    let descriptorArray = [];
    //Array manipulation to get the values only
    for (var e in userDescriptor) {
      descriptorArray.push(userDescriptor[e]);
    }
    //User reference descriptors
    const descriptorArrayFloat32 = new Float32Array(descriptorArray);
    console.log("Your descriptor =>", descriptorArrayFloat32);

    Promise.all([this.setupFaceAPI()]).then(this.startWebcam());

    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors("Reference", [descriptorArrayFloat32]),
    ];

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

    const videoClass = this.videoRef.current;

    // Face recognition
    videoClass.addEventListener("play", () => {
      setInterval(async () => {
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
          settingUpStatus={this.state.isSettingUp}
          submitStatus={this.state.isSubmitting}
          text={"Scanning for your face. Please look directly at the webcam"}
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </Flex>
    );
  }
}
