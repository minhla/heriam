import React from "react";
import { Heading, Box, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Event = ({ eventData }) => {
  const isAttended = eventData.isAttended;
  return (
    <Box
      as={RouterLink}
      to={`${eventData.id}`}
      w={["90%", "30%"]}
      m="15px"
      p="50px 15px 30px 15px"
      border="2px solid"
      borderColor="teal.700"
      borderRadius="6px"
      textAlign="center"
      _hover={{
        textDecoration: "none",
        transition: " transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        color: "white",
        bg: "teal.600",
      }}
    >
      <Heading variant="event">{eventData.name}</Heading>
      <Text>Time: {eventData.time}</Text>
      <Text>
        Status:
        {isAttended ? "You have checked in" : "You have not checked in "}
      </Text>
    </Box>
  );
};

export default Event;
