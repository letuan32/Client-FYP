import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputDate = () => {
  return (
    <BaseCard title="Filled Date Input">
      <TextField
        id="filled-date"
        label="Birthday"
        type="date"
        variant="filled"
        fullWidth
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </BaseCard>
  );
};

export default FiFilledInputDate;
