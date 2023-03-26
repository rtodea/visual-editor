import { Drawing } from "@/components/placeholder/drawing/index";
import React from "react";
import { Square } from "@/components/placeholder/drawable";

export default {
  title: "Placeholder/Drawing",
  component: Drawing,
};

export const Default = () => {
  return (
    <Drawing>
      <Square center={{ x: 0, y: 0 }} />
      <Square center={{ x: 4, y: 0 }} />
    </Drawing>
  );
};
