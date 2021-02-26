import React, {useState} from 'react';
import Webcam from './Webcam';
import { Flex, Link, Button, ButtonGroup, Heading, Container, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../constants/constants';

function Login() {
  const [loginErr,setLoginErr] = useState(false)

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    const e = event.target
    if (!e) return

    const bcrypt = require('bcryptjs')
    const currentUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (!currentUsers) return

    const findUser = currentUsers.find(user => user.username == e[0].value)
    if (findUser) {
      if (bcrypt.compareSync(e[1].value, findUser.password)) {
        localStorage.setItem('heriam.userToken',findUser.username)
        history.push('/dashboard', {userToken: findUser.username})

      } else {
        return setLoginErr(true)
      }

    } else {
      return setLoginErr(true)
    }
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <ButtonGroup>
      <Link as={RouterLink} to="/"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Home</Button></Link>
      <Link as={RouterLink} to="/register"><Button colorScheme="teal" m="5px" _hover={{color:"teal.500",bg:"white"}}>Register</Button></Link>
      </ButtonGroup>
      <Heading>Login</Heading>
      
      <Container w={["100%","450px","500px"]}>
        <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={loginErr}>
        <FormErrorMessage>The login information is incorrect. Please try again.</FormErrorMessage>
          <FormLabel>Username</FormLabel>
          <Input focusBorderColor="teal.100" id="username" type="text" pattern="^[a-zA-Z0-9_.-]*$"></Input>

          <FormLabel mt="10px">Password</FormLabel>
          <Input focusBorderColor="teal.100" id="password" type="password"></Input>

        </FormControl>
        <Button mt="15px" type="submit" colorScheme="teal">Register</Button>
        </form>
       
      </Container>
      {/* <Webcam /> */}
    </Flex>
  )
}

export default Login
