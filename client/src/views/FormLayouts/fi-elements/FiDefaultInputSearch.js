import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiDefaultInputSearch = () => {
  return (
    <BaseCard title="Default Search Input">
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiDefaultInputSearch;
