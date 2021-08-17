import React, { useEffect, useRef } from "react";
import { Spinner, Flex, Text, Box } from "@chakra-ui/react";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../lotties/loading.json";

const SpinnerText = ({ scanningStatus }) => {
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
      {scanningStatus ? (
        <Box
          ref={avatar}
          w="120px"
          h="120px"
          display={{ base: "none", md: "flex" }}
        ></Box>
      ) : (
        <Spinner
          label="processing"
          color="teal.200"
          thickness="5px"
          speed="1s"
          size="xl"
        />
      )}
      <Text>
        {scanningStatus
          ? "Scanning for your face. Please look directly at the webcam"
          : "Authenticated successfully. Redirecting..."}
      </Text>
    </Flex>
  );
};

export default SpinnerText;
