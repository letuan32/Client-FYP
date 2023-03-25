import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputDisabled = () => {
  return (
    <BaseCard title="Default Disabled Input">
      <TextField id="standard-basic" label="Standard" disabled fullWidth />
    </BaseCard>
  );
};

export default FiDefaultInputDisabled;
