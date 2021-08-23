import React, { Component } from "react";
import { Flex, Box, Button, Heading, ButtonGroup } from "@chakra-ui/react";
import SpinnerText from "./SpinnerText";
import { Redirect } from "react-router";
import { LOCAL_STORAGE_KEY, registerFaceText, doneDetected, waitingText } from "../constants/constants";

export class RegisterWebcam extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.webcamStream = null;
    this.redirect = null;
  }

  state = {
    isSettingUp: true,
    isScanning: false,
    isDetected: false,
    redirect: null,
  };

  readyHandle = () => {
    this.setState({
      isSettingUp: false,
      isScanning: true,
      isDetected: false,
    });
  };

  successHandle = () => {
    this.setState({
      isSettingUp: false,
      isScanning: false,
      isDetected: true,
    });
  };

  faceapi = require("@vladmandic/face-api");
  modelPath = "./weights/";
  optionsTinyFaceDetector;
  optionsSSDMobileNetv1;

  createUser = () => {
    const currentUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const { username, password, faceDescriptor } = this.props.user;
    const bcrypt = require("bcryptjs");
    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = {
      username: username,
      password: hashedPassword,
      descriptor: faceDescriptor,
    };

    if (currentUsers) {
      const newCurrentUsers = [...currentUsers, newUser];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCurrentUsers));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newUser]));
    }

    if (this._isMounted) {
      this.setState({ redirect: true });
    }
  };

  setupFaceAPI = async () => {
    console.log("Setting up Face API...");

    await this.faceapi.tf.setBackend("webgl");

    await this.faceapi.tf.enableProdMode();
    await this.faceapi.tf.ENV.set("DEBUG", false);
    await this.faceapi.tf.ready();

    await this.faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelPath)
    await this.faceapi.nets.faceLandmark68Net.loadFromUri(this.modelPath);
    await this.faceapi.nets.faceRecognitionNet.loadFromUri(this.modelPath);

    console.log(this.faceapi.nets);

    this.optionsTinyFaceDetector = new this.faceapi.TinyFaceDetectorOptions({
      inputSize: 416,
      scoreThreshold: 0.6,
    });

    this.optionsSSDMobileNetv1 = new this.faceapi.SsdMobilenetv1Options({
      minConfidence: 0.5,
    });
  };

  startWebcam = () => {
    const video = this.videoRef.current;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.webcamStream = stream;
      video.srcObject = stream;
    });

    if (this._isMounted) {
      this.readyHandle();
    }
  };

  detectFace = () => {
    this.timeout = setInterval(async () => {
      const detections = await this.faceapi
        .detectSingleFace(this.videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detections) {
        this.props.handleDescriptor(detections.descriptor);
        this.successHandle();
      }
    }, 2500);
  };

  componentDidMount() {
    this._isMounted = true;

    Promise.all([this.setupFaceAPI()]).then(this.startWebcam());

    const videoClass = this.videoRef.current;

    videoClass.addEventListener("play", this.detectFace());
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.webcamStream != null) {
      this.webcamStream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(this.timeout);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <Flex justify="center" direction="column" align="center">
        <Heading as="h1" m="30px 0" fontSize="45px">
          Heriam
        </Heading>
        <Box
          as="video"
          autoPlay={true}
          ref={this.videoRef}
          w="500px"
          padding={["15px"]}
          id="webcam"
          muted
        />
        <ButtonGroup>
          <Button onClick={this.props.prev}>Go back</Button>
          {this.state.isDetected && (
            <Button onClick={this.createUser}>Register</Button>
          )}
        </ButtonGroup>
        <SpinnerText text={waitingText}/>
      </Flex>
    );
  }
}

export default RegisterWebcam;
