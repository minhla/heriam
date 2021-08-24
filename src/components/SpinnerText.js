import React, { useEffect, useRef } from "react";
import { Spinner, Flex, Text } from "@chakra-ui/react";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../lotties/man.json";

const SpinnerText = ({ scanningStatus, settingUpStatus, submitStatus }) => {
  const avatar = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: avatar.current,
      animationData: animationData,
      loop: true,
      autoplay: true,
    });
  }, []);

  return (
    <Flex direction="column" align="center">
      <Spinner
        label="processing"
        color="teal.200"
        thickness="5px"
        speed="1s"
        size="xl"
      />
      <Text>
        {settingUpStatus && "Setting everything up..."}
        {scanningStatus &&
          "Scanning for your face. Please look directly at the webcam"}
        {submitStatus && "Authenticated successfully. Redirecting..."}
      </Text>
    </Flex>
  );
};

export default SpinnerText;
