import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInput = () => {
  return (
    <BaseCard title=" Filled Input">
      <TextField id="filled-basic" label="Filled" variant="filled" fullWidth />
    </BaseCard>
  );
};

export default FiFilledInput;
