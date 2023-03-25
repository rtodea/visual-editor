import React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { AlarmOn } from "@mui/icons-material";

export const SampleButton = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <IconButton>
        <AlarmOn />
      </IconButton>
    </Stack>
  );
};
