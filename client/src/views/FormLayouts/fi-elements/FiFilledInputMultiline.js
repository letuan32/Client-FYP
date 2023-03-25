import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputMultiline = () => {
  return (
    <BaseCard title="Filled Multiline">
      <TextField
        id="filled-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="filled"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiFilledInputMultiline;
