import React, { useEffect, useState } from 'react'
import { Flex, Heading, Button } from '@chakra-ui/react'
import { EVENTS } from '../constants/constants'
import EventList from './EventList'
import { Link as RouterLink, useHistory } from 'react-router-dom'

function Dashboard() {
  const history = useHistory()
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    const userToken = localStorage.getItem("heriam.userToken");
    if (!userToken) history.push("/")
    const tempUserEvents = EVENTS.filter(event => event.username === "anhminh") //Will be updated to be dynamic
    setUserEvents(tempUserEvents)
  },[])

  const handleLogout = () => {
    if (localStorage.getItem("heriam.userToken")) localStorage.removeItem("heriam.userToken")
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <Button variant="outline" as={RouterLink} to="/" onClick={handleLogout}>Logout</Button>
      <Heading>Dashboard</Heading>
      <EventList events={userEvents}/>
    </Flex>
  )
}

export default Dashboard
