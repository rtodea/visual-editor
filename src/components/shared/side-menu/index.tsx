import React, { ReactElement } from "react";
import { Drawer } from "@mui/material";

export const SideMenu = ({
  sideItems,
  mainContent,
  sideItemsWidth = 240,
}: {
  sideItems: ReactElement;
  mainContent: ReactElement;
  sideItemsWidth: number;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <Drawer variant="permanent">{sideItems}</Drawer>
      <main
        style={{
          paddingLeft: sideItemsWidth,
        }}
      >
        {mainContent}
      </main>
    </div>
  );
};
