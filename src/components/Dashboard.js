import React, { useEffect, useState } from 'react'
import { Flex, Heading, Button } from '@chakra-ui/react'
import { EVENTS } from '../constants/constants'
import EventList from './EventList'
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom'

function Dashboard() {
  const location = useLocation()
  const history = useHistory()
  const userToken = location.state.userToken
  if (!userToken) history.push("/")
  
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    const tempUserEvents = EVENTS.filter(event => event.username === userToken)
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
