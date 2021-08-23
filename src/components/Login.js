import React, { useState } from "react";
import {
  Flex,
  Link,
  Button,
  Text,
  Heading,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/constants";

function Login() {
  const [loginErr, setLoginErr] = useState(false);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = event.target;
    if (!e) return;

    const bcrypt = require("bcryptjs");
    const currentUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!currentUsers) return;

    const findUser = currentUsers.find((user) => user.username == e[0].value);
    if (findUser) {
      if (bcrypt.compareSync(e[1].value, findUser.password)) {
        localStorage.setItem("heriam.userToken", findUser.username);
        history.push("/dashboard", { userToken: findUser.username });
      } else {
        return setLoginErr(true);
      }
    } else {
      return setLoginErr(true);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Heading as="h1" m="30px 0" fontSize="45px">
        Heriam
      </Heading>

      <Container variant="auth">
        <Flex justify="center" direction="column" align="center">
          <Heading as="h2" p="0">
            Welcome back
          </Heading>
          <Text variant="auth" mb="20px">
            Enter your credentials to access your account
          </Text>
        </Flex>

        <form onSubmit={handleSubmit}>
          <FormControl isRequired isInvalid={loginErr}>
            <FormLabel>Username</FormLabel>
            <Input
              variant="auth"
              id="username"
              type="text"
              pattern="^[a-zA-Z0-9_.-]*$"
            ></Input>

            <FormLabel mt="10px">Password</FormLabel>
            <Input variant="auth" id="password" type="password"></Input>
            <FormErrorMessage>
              The login information is incorrect. Please try again.
            </FormErrorMessage>
          </FormControl>
          <Button mt="15px" type="submit">
            Login
          </Button>
        </form>

        <Container color="black" mt="15px" p="0">
          <Text>
            Don't have an account?{" "}
            <Link as={RouterLink} to="/register" color="teal.500">
              Sign up
            </Link>
          </Text>
        </Container>
      </Container>
    </Flex>
  );
}

export default Login;
