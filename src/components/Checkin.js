import React, { useEffect, useState } from "react";
import { Flex, Box, Spacer, Button, ButtonGroup, Link } from "@chakra-ui/react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import { USER_DESCRIPTORS, EVENTS } from "../constants/constants";
import Webcam from "./Webcam";
const faceapi = require("@vladmandic/face-api");

const Checkin = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);
  
  const [userDescriptors,setUserDescriptors] = useState('')
  const [eventData, setEventData] = useState('')
  
  useEffect(() => {
    const descriptors = USER_DESCRIPTORS.filter(element => element.username == "anhminh")
    setUserDescriptors(descriptors[0].descriptor)
    const eventData = EVENTS.filter(event => event.id == id)
    setEventData(eventData)
  },[])

  // console.log('User face descriptors => ', userDescriptors)

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
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
      <Webcam username={'anhminh'} eventData={eventData}/>
    </>
  );
};

export default Checkin;
