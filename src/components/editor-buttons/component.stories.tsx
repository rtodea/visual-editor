import {
  EditorButtons,
  useOnlyOneEditorButtonActive,
} from "@/components/editor-buttons/index";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";
import {
  ButtonColorClassName,
  MoveButtonId,
  SelectButtonId,
} from "@/components/shared/buttons";
import { expect } from "@storybook/jest";

export default {
  title: "Components/EditorButtons",
  component: EditorButtons,
};

// @ts-ignore
const Template = (args) => (
  <div style={{ width: 75 }}>
    <EditorButtons {...args} />
  </div>
);
export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  selectButton: {
    onClick: action("selectButton"),
    active: false,
  },
  moveButton: {
    onClick: action("moveButton"),
    active: false,
  },
  closestPointButton: {
    onClick: action("closestPointButton"),
    active: false,
  },
  squareButton: {
    onClick: action("squareButton"),
    active: false,
  },
  triangleButton: {
    onClick: action("triangleButton"),
    active: false,
  },
  hexagonButton: {
    onClick: action("hexagonButton"),
    active: false,
  },
  resetButton: {
    onClick: action("resetButton"),
  },
};

export const WithState = () => {
  const props = useOnlyOneEditorButtonActive();

  return <EditorButtons {...props} />;
};

// @ts-ignore
WithState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const selectButton = await canvas.findByTestId(SelectButtonId);
  await expect(selectButton.classList).toContain(ButtonColorClassName.Active);

  const moveButton = await canvas.findByTestId(MoveButtonId);
  await userEvent.click(moveButton);
  await expect(selectButton.classList).toContain(ButtonColorClassName.Default);
  await expect(moveButton.classList).toContain(ButtonColorClassName.Active);
};
