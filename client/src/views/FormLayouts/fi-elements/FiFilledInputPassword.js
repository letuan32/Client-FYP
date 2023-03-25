import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputPassword = () => {
  return (
    <BaseCard title="Filled Input Password">
      <TextField
        id="filled-basic"
        label="Password"
        type="password"
        variant="filled"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiFilledInputPassword;
