import React from 'react';
import Webcam from './Webcam';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  return (
    <div>
      <Link as={RouterLink} to="/">Back to homepage</Link><br/>
      Allow your browser to use the front camera/webcam
      <Webcam />
    </div>
  )
}

export default Login
