import React, { useState } from "react";

const RenderSwitch = (props) => {
  const { stepNumber, children } = props;
  return children.find((child) => {
    return child.props.step === stepNumber;
  });
};

export default RenderSwitch;
