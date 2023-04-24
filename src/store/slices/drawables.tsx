import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawableProto, DrawableProtoEnum, DrawingModeEnum, Point2d } from "@/components/drawing/models";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  value: [] as DrawableProto[],
};

export const DrawingContextToDrawable = {
  [DrawingModeEnum.AddSquare]: DrawableProtoEnum.Square,
  [DrawingModeEnum.AddTriangle]: DrawableProtoEnum.Triangle,
  [DrawingModeEnum.AddHexagon]: DrawableProtoEnum.Hexagon,
} as const;

export const drawablesSlice = createSlice({
  name: "drawables",
  initialState,
  reducers: {
    addDrawable: (state, action: PayloadAction<DrawableProto>) => {
      state.value = [...state.value, action.payload];
    },

    loadDrawables: (state, action: PayloadAction<DrawableProto[]>) => {
      state.value = action.payload;
    },

    clickOnDrawing: (
      state,
      action: PayloadAction<{
        activeDrawingMode: DrawingModeEnum;
        point2d: Point2d;
      }>
    ) => {
      const { activeDrawingMode, point2d } = action.payload as unknown as {
        activeDrawingMode: DrawingModeEnum;
        point2d: { x: number; y: number };
      };

      // @ts-ignore
      const drawableType = DrawingContextToDrawable[activeDrawingMode];
      if (!drawableType) {
        return;
      }

      state.value = [
        ...state.value,
        {
          type: drawableType,
          name: `${drawableType}_${Date.now()}`,
          center: point2d,
        },
      ];
    },

    enableDrag: (state) => {
      // @ts-ignore
      state.value = state.value.map((drawable) => {
        const state = {
          ...drawable.state,
          isDraggable: true,
          isSelectable: false,
          isSelected: false,
        };

        return { ...drawable, state };
      });
    },

    enableSelect: (state) => {
      // @ts-ignore
      state.value = state.value.map((drawable) => {
        const state = {
          ...drawable.state,
          isDraggable: false,
          isSelectable: true,
        };

        return { ...drawable, state };
      });
    },

    moveDrawable: (
      state,
      action: PayloadAction<{ name: string; position: Point2d }>
    ) => {
      const { name, position } = action.payload;
      // @ts-ignore
      state.value = state.value.map((drawable) => {
        if (drawable.name !== name) {
          return drawable;
        }

        const state = {
          ...drawable.state,
          position,
        };

        return { ...drawable, state };
      });
    },

    selectDrawable: (
      state,
      action: PayloadAction<{ name: string | undefined; isSelected: boolean }>
    ) => {
      const { name, isSelected } = action.payload;
      // @ts-ignore
      state.value = state.value.map((drawable) => {
        if (drawable.name !== name) {
          return drawable;
        }

        const state = {
          ...drawable.state,
          isSelected,
        };

        return { ...drawable, state };
      });
    },

    // Special reducer for hydrating the state
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.drawables,
    //     };
    //   },
  },
});

export const {
  addDrawable,
  clickOnDrawing,
  enableDrag,
  enableSelect,
  moveDrawable,
  selectDrawable,
  loadDrawables,
} = drawablesSlice.actions;
// @ts-ignore
export const selectDrawables = (state) => state.drawables.value;
export default drawablesSlice.reducer;
