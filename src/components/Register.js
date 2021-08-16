import React, {useState} from 'react';
import Webcam from './Webcam';
import { Flex, Link, Button, ButtonGroup, Heading, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../constants/constants';

const Register = () => {

  const [isError, setError] = useState(false)
  const [successMsg, setMsg] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const e = event.target
    if (!e) return
    const currentUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (currentUsers) {
      if (currentUsers.find(user => user.username == e[0].value)) {
      setError(true)
      return
    }
      else setError(false)
    }

    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync(e[1].value, 8);

    const newUser = {
      username: `${e[0].value}`,
      password: `${hash}`
    }

    if (currentUsers) { //If this is not the first user EVER.
      const newCurrentUsers = [...currentUsers, newUser]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCurrentUsers))
      setMsg(`Account created successfully.`)
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newUser]))
      setMsg(`Account created successfully.`)
    }
    
    
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <ButtonGroup mb="50px">
      <Button as={RouterLink} to="/" colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Home</Button>
      <Button as={RouterLink} to="/login" colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Login</Button>
      </ButtonGroup>
      <Heading mb="25px">Register a new account</Heading>

      <Container variant="auth">
        <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={isError}>
          <FormLabel>Username</FormLabel>
          <Input focusBorderColor="teal.100" id="username" type="text" pattern="^[a-zA-Z0-9_.-]*$" placeholder="Characters and numbers only"></Input>
          <FormErrorMessage>This username already exists. Please use another one.</FormErrorMessage>
          <FormLabel mt="10px">Password</FormLabel>
          <Input focusBorderColor="teal.100" id="password" type="password" placeholder="Think of a very secure one"></Input>
          {!isError && <div> {successMsg} </div> }

        </FormControl>
        <Button mt="15px" type="submit">Register</Button>
        </form>
       
      </Container>
    </Flex>
  )
}

export default Register
