import React from "react";
import { Flex, Heading, LinkOverlay, LinkBox } from "@chakra-ui/react";

const Event = ({ eventData, userDescriptors }) => {
  const isAttended = eventData.isAttended;
  return (
    <LinkBox
      m="15px"
      border="2px solid #dadada"
      borderRadius="6px"
      padding="5px 10px"
      width={["80%", "400px", "450px"]}
    >
      <LinkOverlay href={`${eventData.id}`}>
        <Heading size="md">{eventData.name} </Heading>{" "}
      </LinkOverlay>
      Time: {eventData.time}
      <br />
      Status:{" "}
      {eventData.isAttended
        ? "You have checked in"
        : "You have not checked in "}
    </LinkBox>
  );
};

export default Event;
