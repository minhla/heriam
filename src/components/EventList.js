import React from "react";
import { Flex } from "@chakra-ui/react";
import Event from "./Event";
import { v4 as uuid } from 'uuid'

function EventList({ events, userDescriptors }) {
  return (
    <Flex direction="row" align="center" justify="center" w="100%" flexWrap="wrap">
      {events.map((event) => {
        const eventId = uuid()
        return <Event key={eventId} eventData={event} userDescriptors={userDescriptors} />;
      })}
    </Flex>
  );
}

export default EventList;
