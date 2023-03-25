import React from "react";

import { TextField } from "@mui/material";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiFilledInputSearch = () => {
  return (
    <BaseCard title="Filled Search Input">
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        fullWidth
        variant="filled"
      />
    </BaseCard>
  );
};

export default FiFilledInputSearch;
