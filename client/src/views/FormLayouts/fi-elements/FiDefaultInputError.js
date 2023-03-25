import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputError = () => {
  return (
    <BaseCard title="Default Input Error">
      <TextField
        error
        id="standard-error"
        label="Error"
        fullWidth
        defaultValue="Hello World"
      />
    </BaseCard>
  );
};

export default FiDefaultInputError;
