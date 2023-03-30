import { ThreeElements } from "@react-three/fiber";
import { DrawableProtoState } from "@/components/placeholder/drawing/models";
import { useUpdatePositionOnDrag } from "@/components/engine/drawable/hooks/useUpdatePositionOnDrag";
import { useSelection } from "@/components/engine/drawable/hooks/useSelection";
import { useHover } from "@/components/engine/drawable/hooks/useHover";

export const useDrawable = (
  props: ThreeElements["mesh"] & { materialColor: string }
) => {
  const userData = props.userData as DrawableProtoState;

  const draggable = useUpdatePositionOnDrag({
    initialPosition: props.position,
    // @ts-ignore
    name: props.name,
    userData,
  });

  const selection = useSelection({
    // @ts-ignore
    name: props.name,
    userData,
    materialColor: props.materialColor,
  });

  const hover = useHover();

  const draggableProps = draggable.bind();
  const meshProps = {
    name: props.name,
    userData: props.userData,
    position: draggable.position,
    onClick: selection.onClick,
    onPointerOver: hover.onPointerOver,
    onPointerOut: hover.onPointerOut,
    "rotation-x": -Math.PI / 2,
    ...draggableProps,
  };

  return {
    meshProps,
    selection,
  };
};
