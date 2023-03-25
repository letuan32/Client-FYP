import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiOutlinedInputwithHelper = () => {
  return (
    <BaseCard title="Outlined Input with Helper Text">
      <TextField
        variant="outlined"
        id="standard-helperText"
        label="Helper text"
        defaultValue="Default Value"
        helperText="Some important text"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiOutlinedInputwithHelper;
