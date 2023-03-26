import { SideMenu } from "@/components/shared/side-menu/index";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Inbox, Mail } from "@mui/icons-material";
import React from "react";
import { SelectButtonId } from "@/components/shared/buttons";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";
import { EditorButtons } from "@/components/editor-buttons";

export default {
  title: "Components/SideMenu",
  component: SideMenu,
};

// @ts-ignore
const Template = (args) => <SideMenu {...args} />;

export const Sample = Template.bind({});
// @ts-ignore
Sample.args = {
  sideItemsWidth: 166,
  sideItems: (
    <>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  ),
  mainContent: (
    <>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </>
  ),
};

const useSideMenuButtonsWithState = () => {
  return {
    selectButton: {
      onClick: action("selectButton"),
      active: true,
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
  };
};

const SideMenuButtonsWithState = () => {
  const {
    selectButton,
    moveButton,
    closestPointButton,
    squareButton,
    triangleButton,
    hexagonButton,
  } = useSideMenuButtonsWithState();

  return (
    <EditorButtons
      selectButton={selectButton}
      moveButton={moveButton}
      closestPointButton={closestPointButton}
      squareButton={squareButton}
      triangleButton={triangleButton}
      hexagonButton={hexagonButton}
    />
  );
};

export const SideMenuWithButtons = Template.bind({});
// @ts-ignore
SideMenuWithButtons.args = {
  sideItemsWidth: 75,
  sideItems: <SideMenuButtonsWithState />,
  mainContent: <pre>Drawing</pre>,
};
// @ts-ignore
SideMenuWithButtons.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const selectButton = await canvas.findByTestId(SelectButtonId);
  await userEvent.click(selectButton);
};
