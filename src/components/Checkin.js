import React, { useEffect, useState } from "react";
import { Flex, Button, ButtonGroup, Link, Heading } from "@chakra-ui/react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import { USER_DESCRIPTORS, EVENTS } from "../constants/constants";
import Webcam from "./Webcam";
const faceapi = require("@vladmandic/face-api");

const Checkin = (props) => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);
  console.log(props);
  
  const [userDescriptors,setUserDescriptors] = useState('')
  const [eventData, setEventData] = useState('')
  
  useEffect(() => {
    const descriptors = USER_DESCRIPTORS.filter(element => element.username == "anhminh")
    setUserDescriptors(descriptors[0].descriptor)
    const eventData = EVENTS.find(event => event.id == id)
    setEventData(eventData)
    console.log(eventData)
  },[])

  // console.log('User face descriptors => ', userDescriptors)

  const goBack = () => {
    history.goBack();
  };

  return (
    <Flex direction="column" align="center">
      <ButtonGroup>
        
        <Button
          colorScheme="teal"
          m="5px"
          _hover={{ color: "teal.500", bg: "white" }}
          onClick={goBack}
        >
          Dashboard
        </Button>

      </ButtonGroup>
      <Heading size="md">{eventData.name} </Heading>{" "}
      Time: {eventData.time}
      <br />
      <Webcam username={'anhminh'} eventData={eventData}/>
    </Flex>
  );
};

export default Checkin;
