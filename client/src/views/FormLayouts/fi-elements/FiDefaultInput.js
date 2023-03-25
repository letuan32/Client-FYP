import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInput = () => {
  return (
    <BaseCard title="Default Inputs">
      <TextField id="standard-basic" label="Standard" fullWidth />
    </BaseCard>
  );
};

export default FiDefaultInput;
