import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import Event from "./Event";
import { v4 as uuid } from 'uuid'

function EventList({ events }) {
  return (
    <Flex direction="column" align="center" >
      {events.map((event) => {
        const eventId = uuid()
        return <Event key={eventId} eventData={event} />;
      })}
    </Flex>
  );
}

export default EventList;
