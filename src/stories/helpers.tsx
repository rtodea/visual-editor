import { DrawableProtoEnum } from "@/components/drawing/models";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { drawablesSlice } from "@/store/slices/drawables";

export const MockedState = {
  drawables: {
    value: [
      {
        type: DrawableProtoEnum.Square,
        name: "Square_1616500000000",
        center: { x: -3, y: 0 },
      },
      {
        type: DrawableProtoEnum.Triangle,
        name: "Triangle_1616500000000",
        center: { x: 0, y: 0 },
      },
      {
        type: DrawableProtoEnum.Hexagon,
        name: "Hexagon_1616500000000",
        center: { x: 3, y: 0 },
      },
    ],
  },
};
// @ts-ignore
export const MockStoreProvider = ({ children }) => (
  <Provider
    store={configureStore({
      reducer: {
        [drawablesSlice.name]: drawablesSlice.reducer,
      },
      devTools: true,
    })}
  >
    {children}
  </Provider>
);

// @ts-ignore
export const withMockedRedux = (Story) => (
  <MockStoreProvider>
    <Story />
  </MockStoreProvider>
);
