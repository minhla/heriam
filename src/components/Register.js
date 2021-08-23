import React, { useState } from "react";
import {
  Text,
  Flex,
  Link,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/constants";
import RegisterWebcam from "./RegisterWebcam";
import RenderSwitch from "../helper/RenderSwitch";
import RenderCase from "../helper/RenderCase";

const Register = () => {
  const [isError, setError] = useState(false);
  const [successMsg, setMsg] = useState("");

  const [step, setStep] = useState(1);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    faceDescriptor: {},
  });

  const handleFieldChange = (field) => (e) => {
    setUserDetails({
      ...userDetails,
      [field]: e.target.value,
    });
  };

  const handleDetectedFace = (descriptor) => {
    setUserDetails({
      ...userDetails,
      faceDescriptor: descriptor,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = event.target;
    if (!e) return;
    const currentUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (currentUsers) {
      if (currentUsers.find((user) => user.username == e[0].value)) {
        setError(true);
        return;
      } else setError(false);
    }

    const bcrypt = require("bcryptjs");
    const hash = bcrypt.hashSync(e[1].value, 8);

    const newUser = {
      username: `${e[0].value}`,
      password: `${hash}`,
    };

    if (currentUsers) {
      //If this is not the first user EVER.
      const newCurrentUsers = [...currentUsers, newUser];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCurrentUsers));
      setMsg(`Account created successfully.`);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newUser]));
      setMsg(`Account created successfully.`);
    }
  };

  return (
    <RenderSwitch stepNumber={step}>
      <RenderCase step={1}>
        <Flex direction="column" justify="center" align="center">
          <Heading as="h1" m="30px 0" fontSize="45px">
            Heriam
          </Heading>

          <Container variant="auth">
            <Flex justify="center" direction="column" align="center">
              <Heading as="h2" p="0">
                Create your account
              </Heading>
              <Text variant="auth" mb="20px">
                Take part in making events better
              </Text>
            </Flex>
            <form onSubmit={nextStep}>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>Username</FormLabel>
              <Input
                variant="auth"
                id="username"
                type="text"
                onChange={handleFieldChange("username")}
                pattern="^[a-zA-Z0-9_.-]*$"
                defaultValue={userDetails.username}
                placeholder="Characters and numbers only"
              ></Input>
              <FormErrorMessage>
                This username already exists. Please use another one.
              </FormErrorMessage>
              <FormLabel mt="10px">Password</FormLabel>
              <Input
                variant="auth"
                id="password"
                type="password"
                onChange={handleFieldChange("password")}
                defaultValue={userDetails.password}
                placeholder="Think of a very secure one"
              ></Input>
              {!isError && <div> {successMsg} </div>}
            </FormControl>
            </form>
            <Button onClick={nextStep} mt="15px" type="submit">
              Register
            </Button>

            <Container color="black" mt="15px" p="0">
              <Text>
                Already have an account?{" "}
                <Link as={RouterLink} to="/login" color="teal.500">
                  Sign in
                </Link>
              </Text>
            </Container>

            {/* <pre>{JSON.stringify(userDetails, null, 2)}</pre> */}
          </Container>
        </Flex>
      </RenderCase>

      <RenderCase step={2}>
        <RegisterWebcam
          user={userDetails}
          handleDescriptor={handleDetectedFace}
          prev={prevStep}
        />
      </RenderCase>
    </RenderSwitch>
  );
};

export default Register;
