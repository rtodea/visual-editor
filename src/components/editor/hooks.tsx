import { loadDrawables, selectDrawables } from "@/store/slices/drawables";
import { useDispatch, useSelector } from "react-redux";
import { useLazyEffect } from "@/components/shared/hooks";
import { DrawableProto } from "@/components/placeholder/drawing/models";
import { useEffect } from "react";

export const serialize = (drawables: DrawableProto[]) => {
  return JSON.stringify(drawables);
};

export const deserialize = (serialized: string) => {
  return JSON.parse(serialized) as DrawableProto[];
};

export const SAVE_KEY = "drawables";
export const AUTO_SAVE_INTERVAL = 10000; // every 10 seconds
export const useAutoSave = () => {
  const drawables = useSelector(selectDrawables);
  useLazyEffect(
    () => {
      localStorage.setItem(SAVE_KEY, serialize(drawables));
      console.log("auto-saving", drawables);
    },
    [drawables],
    AUTO_SAVE_INTERVAL
  );
};

export const useLoadFromLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const serialized = localStorage.getItem(SAVE_KEY);
    if (!serialized) {
      return;
    }
    const drawables = deserialize(serialized);
    dispatch(loadDrawables(drawables));
  }, [dispatch]);
};
