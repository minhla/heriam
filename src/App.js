import Webcam from "./components/Webcam";
import { Heading, Flex, Spacer, Container, Button, ButtonGroup, Link } from "@chakra-ui/react";
import { Route, Link as RouterLink, Switch } from "react-router-dom";
import Login from "./components/Login";
import { React } from 'react';

function App() {
  return (

      <Flex h="100vh" w="100%" justifyContent="center" direction="column" align="center">
        
        <Container>
          <Heading as="h1" fontSize={["50px","60px","80px"]} bgGradient="linear(to-r, teal.50,teal.300)" bgClip="text">Hyriam</Heading>
       
        <Heading as="h2" fontSize={["25px","30px","35px"]} fontWeight="semibold" p="10px">The honest check-in system</Heading></Container>
        <ButtonGroup spacing="15px" m="10px">
          <Link as={RouterLink} to="/login"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Log in</Button></Link>
          <Link as={RouterLink} to="/register"><Button colorScheme="teal" bg="white" color="teal.500"_hover={{color:"white",bg:"teal.500"}} m="5px">Register</Button></Link>
        </ButtonGroup>
      </Flex>
  );
}

export default App;
