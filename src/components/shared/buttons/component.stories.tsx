import { AllButtons } from "@/components/shared/buttons/index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Buttons",
  component: AllButtons,
};

// @ts-ignore
const Template = (args) => <AllButtons {...args} />;
export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  onClick: action("clicked"),
};
