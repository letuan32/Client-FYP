import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputErrorHelperText = () => {
  return (
    <BaseCard title="Default Input Error Helper text">
      <TextField
        error
        id="standard-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Incorrect entry."
        fullWidth
      />
    </BaseCard>
  );
};

export default FiDefaultInputErrorHelperText;
