import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputSmall = () => {
  return (
    <BaseCard title="Default Small Input">
      <TextField
        label="Size"
        id="standard-size-small"
        defaultValue="Small"
        size="small"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiDefaultInputSmall;
