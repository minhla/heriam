import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

function Event({ eventData }) {
  return (
    <Flex m="15px" direction="column">
      <Heading size="md">{eventData.name} </Heading>
      Time: {eventData.time}
      <br/>
      Status: {eventData.isAttended? 'You have checked in' : 'You have not checked in '}
    </Flex>
  )
}

export default Event
