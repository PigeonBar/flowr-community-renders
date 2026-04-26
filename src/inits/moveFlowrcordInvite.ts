import { addNewMenuButtons } from "./newMenuButtons";

const flowrcordLink = "https://discord.com/invite/wJJPU9c6zW";

/**
 * This initializer moves Flowrcord's invite button to the base game's settings
 * menu, so that {@linkcode addNewMenuButtons} can replace the original invite
 * button with a new button to open this script's dropdown menu for selecting
 * mob renders.
 */
export function moveFlowrcordInvite(): void {
  const flowrcordButton: ButtonOption = {
    type: "button",
    name: "Flowr's Official Discord",
    changeTime: 0,
    clickFn: () => {
      window.location.href = flowrcordLink;
    },
    hovered: false,
    screenPosition: { x: 0, y: 0, w: 0, h: 0 },
  };

  // Add Flowrcord's invite button to the base game's settings menu, ahead of
  // its other buttons.
  const options = settingsMenu.options;
  const buttonIndex = options.findIndex(value => value.type === "button");
  options.splice(buttonIndex, 0, flowrcordButton);

  // Also make room for the new button
  settingsMenu.h += 50;
  settingsMenu.targetOffset -= 50;
}