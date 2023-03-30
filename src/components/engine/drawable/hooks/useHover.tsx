import { useState } from "react";

export const useHover = () => {
  const [hovered, setHover] = useState(false);
  const onPointerOver = () => setHover(true);
  const onPointerOut = () => setHover(false);

  return { onPointerOver, onPointerOut };
};