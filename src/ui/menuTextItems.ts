import { SETTINGS_BUTTON_PADDING, SETTINGS_OPTION_HEIGHT } from "../constants/constants";
import type { SelectRendersMenu } from "./selectRendersMenu";
import type { DropdownUI } from "./dropdownUi";

/**
 * An item to display a row of informational text.
 */
export class MenuInformationalText {
  /**
   * The vertical space taken up by this item in the parent menu.
   */
  height: number = SETTINGS_OPTION_HEIGHT;

  /**
   * The font used to display this text.
   */
  font: string = "900 17px Ubuntu";

  /**
   * The `textBaseline` to be used by the canvas rendering engine.
   */
  textBaseline: CanvasTextBaseline = "middle";

  /**
   * The border width to be used for displaying this text.
   */
  lineWidth: number = 2;

  /**
   * The text to be displayed.
   */
  text: string;

  /**
   * The parent menu that this item belongs to.
   */
  parentMenu: SelectRendersMenu;

  constructor(text: string, parentMenu: SelectRendersMenu) {
    this.text = text;
    this.parentMenu = parentMenu;
  }

  /**
   * @returns `true` iff this is a {@linkcode DropdownUI}.
   */
  isDropdownUI(): this is never {
    return false;
  }

  /**
   * Draws the row of text inside the parent menu.
   */
  draw(): void {
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = this.textBaseline;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = this.lineWidth;
    ctx.strokeText(
      this.text, this.parentMenu.w / 2, this.parentMenu.midHeight,
    );
    ctx.fillText(this.text, this.parentMenu.w / 2, this.parentMenu.midHeight);
  }
}

/**
 * A menu item to display the menu's overall title. This is equivalent to
 * {@linkcode MenuInformationalText}, except it has a larger font size and
 * takes up 1.5 rows of space.
 */
export class MenuTitle extends MenuInformationalText {
  height: number = 1.5 * SETTINGS_OPTION_HEIGHT;

  font: string = "900 32px Ubuntu";

  textBaseline: CanvasTextBaseline = "top";

  lineWidth: number = 3.75;
}

/**
 * Identical to {@linkcode MenuInformationalText}, except it also contains a
 * horizontal separator line. This is used for separating mobs by biome.
 * 
 * This is based on Cinderscript's section headings, except without tooltips.
 */
export class MenuSectionHeading extends MenuInformationalText {
  /**
   * Draws this header inside the parent menu.
   * 
   * This code is adapted from the Flowr changelog's horizontal dividers.
   */
  draw(): void {
    // Draw the text for the section heading
    super.draw();

    // Determine the locations to draw each item
    const textWidth = ctx.measureText(this.text).width;
    let textLeftPos = this.parentMenu.w / 2 - textWidth / 2;
    let textRightPos = this.parentMenu.w / 2 + textWidth / 2;
    
    // Display the separator line (with a space in between for the header text)
    ctx.strokeStyle = "#7f7f7f";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(
      SETTINGS_BUTTON_PADDING,
      this.parentMenu.midHeight,
    );
    ctx.lineTo(
      textLeftPos - SETTINGS_BUTTON_PADDING,
      this.parentMenu.midHeight,
    );
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(
      textRightPos + SETTINGS_BUTTON_PADDING,
      this.parentMenu.midHeight,
    );
    // The extra -16 is to make room for the scrollbar
    ctx.lineTo(
      this.parentMenu.w - SETTINGS_BUTTON_PADDING - 16,
      this.parentMenu.midHeight,
    );
    ctx.stroke();
    ctx.closePath();
  }
}