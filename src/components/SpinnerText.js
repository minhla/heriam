import React from "react";
import { Spinner, Flex, Text } from "@chakra-ui/react";
function SpinnerText({text}) {
  return (
    <Flex direction="column" align="center">
      <Spinner label="processing" color="teal.100" thickness="5px" speed="1s" size="xl" />
      <Text>{text}</Text>
    </Flex>
  );
}

export default SpinnerText;
