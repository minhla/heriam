import React from 'react';
import Webcam from './Webcam';
import { Flex, Link, Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  return (
    <Flex direction="column" justify="center" align="center">
      <ButtonGroup>
      <Link as={RouterLink} to="/"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Home</Button></Link>
      <Link as={RouterLink} to="/register"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Register</Button></Link>
      </ButtonGroup>
      <Heading>Login</Heading>
      Allow your browser to use the front camera/webcam
      <Webcam />
    </Flex>
  )
}

export default Login
