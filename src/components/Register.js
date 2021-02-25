import React from 'react';
import Webcam from './Webcam';
import { Flex, Link, Button, ButtonGroup, Heading, Form, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
function Register() {

  const LOCAL_STORAGE_KEY = "heriam.users";
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const e = event.target
    const formData = {}

    for (let i = 0; i < e.length; i++) {
      formData[e[i].id] = e[i].value;
    }

    console.log('formData =>', formData)
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <ButtonGroup>
      <Link as={RouterLink} to="/"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Home</Button></Link>
      <Link as={RouterLink} to="/login"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Login</Button></Link>
      </ButtonGroup>
      <Heading>Register a new account</Heading>

      <Container w={["100%","450px","500px"]}>
        <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input focusBorderColor="teal.100" id="username" type="text" pattern="^[a-zA-Z0-9_.-]*$" placeholder="Characters and numbers only"></Input>

          <FormLabel mt="10px">Password</FormLabel>
          <Input focusBorderColor="teal.100" id="password" type="password" placeholder="Think of a very secure one"></Input>

        </FormControl>
        <Button mt="15px" type="submit" colorScheme="teal">Register</Button>
        </form>
       
      </Container>
  
        
      {/* <Webcam /> */}
    </Flex>
  )
}

export default Register
