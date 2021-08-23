import React, { useEffect, useState } from "react";
import { Flex, Button, ButtonGroup, Link, Heading } from "@chakra-ui/react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import {
  USER_DESCRIPTORS,
  EVENTS,
  LOCAL_STORAGE_KEY,
} from "../constants/constants";
import Webcam from "./Webcam";

const Checkin = (props) => {
  const { id } = useParams();
  const history = useHistory();

  const userTokenKey = "heriam.userToken";
  const [eventData, setEventData] = useState("");
  const [currentUser, setUser] = useState(null);


  useEffect(() => {
    const userToken = localStorage.getItem(userTokenKey);
    if (!userToken) history.push("/");

    const userDatabaseLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    const userFromDB = userDatabaseLocalStorage.find(
      (user) => user.username === userToken
    );
    setUser(userFromDB);

    const eventData = EVENTS.find((event) => event.id === id);
    setEventData(eventData);
    console.log(eventData);
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <Flex direction="column" align="center">
      <ButtonGroup>
        <Button onClick={goBack}>Dashboard</Button>
      </ButtonGroup>
      <Heading size="md">{eventData.name} </Heading> Time: {eventData.time}
      <br />
      <Webcam currentUser={currentUser} eventData={eventData} />
      {/* <pre>{JSON.stringify(currentUser.descriptor,null,2)}</pre> */}
    </Flex>
  );
};

export default Checkin;
