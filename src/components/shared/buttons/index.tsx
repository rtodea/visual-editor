import { IconButton } from "@mui/material";
import { NearMe, OpenWith, ScatterPlot } from "@mui/icons-material";
import { MouseEventHandler } from "react";

export const AllButtons = ({ onClick }: { onClick: MouseEventHandler }) => {
  return (
    <>
      <Select onClick={onClick} />
      <Move onClick={onClick} />
      <ClosestPoint onClick={onClick} />
    </>
  );
};

export const Select = ({ onClick }: { onClick: MouseEventHandler }) => {
  return (
    <IconButton onClick={onClick}>
      <NearMe />
    </IconButton>
  );
};

export const Move = ({ onClick }: { onClick: MouseEventHandler }) => {
  return (
    <IconButton onClick={onClick}>
      <OpenWith />
    </IconButton>
  );
};

export const ClosestPoint = ({ onClick }: { onClick: MouseEventHandler }) => {
  return (
    <IconButton onClick={onClick}>
      <ScatterPlot />
    </IconButton>
  );
};
