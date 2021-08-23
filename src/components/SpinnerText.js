import React, { useEffect, useRef } from "react";
import { Box, Spinner, Flex, Text } from "@chakra-ui/react";
import lottie from "lottie-web/build/player/lottie_light";
import animationData from "../lotties/loading.json";

const SpinnerText = ({ text }) => {
  const avatar = useRef(null);
  const animationClone = JSON.stringify(animationData);

  useEffect(() => {
    lottie.loadAnimation({
      container: avatar.current,
      animationData: JSON.parse(animationClone),
      loop: true,
      autoplay: true,
    });
  }, []);

  return (
    <Flex direction="column" align="center">
      <Box w="120px" ref={avatar} />
      <Text>{text}</Text>
    </Flex>
  );
};

export default SpinnerText;
