import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiInputwithHelper = () => {
  return (
    <BaseCard title="Input with Helper Text">
      <TextField
        id="standard-helperText"
        label="Helper text"
        defaultValue="Default Value"
        helperText="Some important text"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiInputwithHelper;
