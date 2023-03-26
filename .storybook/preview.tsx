import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { Fonts } from "../src/styles/theme/fonts";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Fonts></Fonts>
      {Story()}
    </>
  ),
];

export default preview;
