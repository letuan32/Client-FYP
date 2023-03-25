import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputError = () => {
  return (
    <BaseCard title="Filled Input Error">
      <TextField
        error
        id="filled-error"
        label="Error"
        defaultValue="Hello World"
        variant="filled"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiFilledInputError;
