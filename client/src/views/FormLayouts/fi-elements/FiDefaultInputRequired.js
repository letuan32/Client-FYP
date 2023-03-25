import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputRequired = () => {
  return (
    <BaseCard title="Default Required Input">
      <TextField
        required
        id="standard-required"
        label="Required"
        fullWidth
        defaultValue="Hello World"
      />
    </BaseCard>
  );
};

export default FiDefaultInputRequired;
