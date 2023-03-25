import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputwithHelper = () => {
  return (
    <BaseCard title="Filled Input with Helper Text">
      <TextField
        variant="filled"
        id="standard-helperText"
        label="Helper text"
        defaultValue="Default Value"
        helperText="Some important text"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiFilledInputwithHelper;
