import { DrawableProtoState } from "@/components/drawing/models";
import { useDispatch } from "react-redux";
import { selectDrawable } from "@/store/slices/drawables";

export const SelectionColor = "hotpink";
export const useSelection = ({
  name,
  userData,
  materialColor,
}: {
  name: string | undefined;
  userData: DrawableProtoState;
  materialColor: string;
}) => {
  const dispatch = useDispatch();

  if (!userData) {
    return {
      onClick: () => {},
      color: materialColor,
    };
  }
  const onSelected = () => {
    if (!userData.isSelectable) {
      return;
    }

    dispatch(selectDrawable({ name, isSelected: !userData.isSelected }));
  };
  const color =
    userData.isSelectable && userData.isSelected
      ? SelectionColor
      : materialColor;
  return { onClick: onSelected, color };
};
