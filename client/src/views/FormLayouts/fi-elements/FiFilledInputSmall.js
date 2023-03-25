import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputSmall = () => {
  return (
    <BaseCard title="Filled Small Input">
      <TextField
        label="Size"
        id="filled-size-small"
        defaultValue="Small"
        variant="filled"
        size="small"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiFilledInputSmall;
