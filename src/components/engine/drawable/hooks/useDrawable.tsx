import { ThreeElements } from "@react-three/fiber";
import { DrawableProtoState } from "@/components/drawing/models";
import { useMove } from "@/components/engine/drawable/hooks/useMove";
import { useSelection } from "@/components/engine/drawable/hooks/useSelection";
import { useHover } from "@/components/engine/drawable/hooks/useHover";

export const useDrawable = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const userData = props.userData as DrawableProtoState;

  const move = useMove({
    initialPosition: props.position as unknown as [number, number, number],
    name: props.name,
    userData,
  });

  const selection = useSelection({
    name: props.name,
    userData,
    materialColor: props.materialColor,
  });

  const hover = useHover();

  const moveProps = move.bind();
  const meshProps = {
    name: props.name,
    userData: props.userData,
    position: move.position,
    onClick: selection.onClick,
    onPointerOver: hover.onPointerOver,
    onPointerOut: hover.onPointerOut,
    "rotation-x": -Math.PI / 2,
    ...moveProps,
  };

  return {
    meshProps,
    selection,
  };
};
