import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputNumber = () => {
  return (
    <BaseCard title="Filled Number Input">
      <TextField
        id="filled-number"
        label="Number"
        type="number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
    </BaseCard>
  );
};

export default FiFilledInputNumber;
