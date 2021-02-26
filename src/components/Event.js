import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

function Event({ eventData }) {
  return (
    <Flex m="15px" direction="column">
      <Heading size="md">Name: {eventData.name} </Heading>
      Time: {eventData.time}
      <br/>
      Status: {eventData.isAttended? 'You havent checked in' : 'You have checked in '}
    </Flex>
  )
}

export default Event
