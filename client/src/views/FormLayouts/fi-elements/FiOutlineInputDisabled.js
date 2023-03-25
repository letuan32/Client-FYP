import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiOutlineInputDisabled = () => {
  return (
    <BaseCard title="Outlined Input Disabled">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        disabled
        fullWidth
      />
    </BaseCard>
  );
};

export default FiOutlineInputDisabled;
