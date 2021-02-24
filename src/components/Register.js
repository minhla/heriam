import React from 'react';
import Webcam from './Webcam';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
function Register() {
  return (
    <div>
      <Link as={RouterLink} to="/" onClick={stopWebcam}>Back to homepage</Link><br/>
      Register a new account
      <Webcam />
    </div>
  )
}

export default Register
