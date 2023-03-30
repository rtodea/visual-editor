import { Editor } from "./index";
import { useDispatch } from "react-redux";
import { loadDrawables } from "@/store/slices/drawables";
import { useEffect } from "react";
import { MockedState, withMockedRedux } from "@/stories/helpers";

export default {
  title: "Pages / Editor",
  component: Editor,
  layout: "fullscreen",
  decorators: [withMockedRedux],
};

export const Default = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDrawables(MockedState.drawables.value));
  }, [dispatch]);

  return <Editor />;
};
