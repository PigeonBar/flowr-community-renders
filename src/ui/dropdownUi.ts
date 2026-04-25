import { DROPDOWN_GREEN_TEXT_FLASH, DROPDOWN_UI_PADDING, SETTINGS_OPTION_HEIGHT } from "../constants/constants";
import type { ArtistName } from "../features/renderData";
import { rendersManager } from "./selectRendersManager";
import type { SelectRendersMenu } from "./selectRendersMenu";

type DropdownListener = (option: ArtistName) => void;

/**
 * A full dropdown UI, including its label text.
 * 
 * Some more details regarding its behaviour in scrollable parent menus:
 * - While the dropdown menu is closed, it cannot be clicked outside the parent
 *   menu's main area.
 * - While the dropdown menu is open and partially inside the parent menu's
 *   main area, it can be clicked outside the parent menu's area, so that the
 *   user can properly use a dropdown menu at the bottom of the parent menu.
 * - If an open dropdown menu completely leaves the parent menu's main area, it
 *   automatically closes.
 */
export class DropdownUI {
  /**
   * The vertical space taken up by this dropdown UI in the parent menu,
   * excluding the expanded list of options.
   */
  height: number = SETTINGS_OPTION_HEIGHT;

  /**
   * The position of the top-left corner of this UI's clickable dropdown menu.
   * This is updated every frame based on the parent menu's position and scroll
   * position, and then used for mouse-related calculations.
   */
  screenPosition: { x: number, y: number };

  /**
   * The mob type that this menu selects renders for.
   */
  enemyType: EnemyType;

  /**
   * The width of the {@linkcode labelText}.
   */
  labelWidth: number;

  /**
   * The options that the user can select in this dropdown menu.
   */
  options: ArtistName[];

  /**
   * The width used to display the dropdown itself, based on the widths of its
   * contents.
   */
  optionsWidth: number;

  /**
   * The height that each dropdown option will take up.
   */
  heightPerOption: number = 30;

  /**
   * The choice that the user has currently selected.
   */
  currentChoice: ArtistName;

  /**
   * Whether or not the user has expanded the dropdown menu to display its list
   * of options.
   */
  expanded: boolean;

  /**
   * The vertical translation of the list of options, relative to its fully
   * expanded position. (This number is negative when the list of options is
   * retracted.)
   */
  optionsTranslateY: number;

  /**
   * A list of listeners to listen to the user selecting options in this
   * dropdown menu.
   */
  listeners: DropdownListener[];

  /**
   * The timestamp of the most recent time that the user clicked on an option.
   */
  optionSelectedTime: number;

  /**
   * The parent menu that this dropdown menu belongs to.
   */
  parentMenu: SelectRendersMenu;

  constructor(
    enemyType: EnemyType,
    options: ArtistName[],
    currentChoice: ArtistName,
    parentMenu: SelectRendersMenu,
  ) {
    this.enemyType = enemyType;
    this.options = options;
    this.currentChoice = currentChoice;
    this.parentMenu = parentMenu;
    this.screenPosition = { x: 0, y: 0 };
    this.expanded = false;
    this.optionsTranslateY = -this.totalOptionsHeight;
    this.listeners = [];
    this.optionSelectedTime = time - 10000;

    // Measure the width of the given options
    this.optionsWidth = 60;
    ctx.font = "900 17px Ubuntu";
    for (let name of this.options) {
      this.optionsWidth =
        Math.max(this.optionsWidth, ctx.measureText(name).width + 60);
    }

    // Measure the width of the label text
    ctx.font = "900 22px Ubuntu";
    this.labelWidth = ctx.measureText(this.labelText).width;
  }

  /**
   * The total height taken up by this menu's list of options, equal to
   * {@linkcode options options.length} times {@linkcode heightPerOption}.
   */
  get totalOptionsHeight(): number {
    return this.options.length * this.heightPerOption;
  }

  /**
   * The label for the dropdown menu, displayed to the left of the menu.
   */
  get labelText(): string {
    return "- " + this.enemyType + ":";
  }
  
  /**
   * @returns `true` iff this is a {@linkcode DropdownUI}.
   */
  isDropdownUI(): this is this {
    return true;
  }

  /**
   * This function sets {@linkcode currentChoice} to the given option, saves it
   * to the manager, and triggers all of the {@linkcode listeners}.
   */
  setOption(option: ArtistName): void {
    this.currentChoice = option;
    rendersManager.set(this.enemyType, option);
    for (let fn of this.listeners) {
      fn(option);
    }
  }

  /**
   * Toggles whether or not the dropdown menu is opened or closed.
   */
  toggleExpansion(): void {
    this.expanded = !this.expanded;
  }

  /**
   * The main function to draw this UI. This also handles setting the cursor to
   * "pointer" if it is hovering over this dropdown menu, and also updating
   * {@linkcode screenPosition} based on the parent menu's scrolling.
   */
  draw(): void {
    // Update the screen position of the dropdown menu itself
    this.screenPosition = {
      x: this.parentMenu.x + DROPDOWN_UI_PADDING
        + this.labelWidth + DROPDOWN_UI_PADDING,
      y: this.parentMenu.y + this.parentMenu.renderOffset
        + this.parentMenu.midHeight - this.parentMenu.scroll
        - this.heightPerOption / 2,
    };

    // If the dropdown menu is completely outside the parent menu's main area,
    // retract the dropdown.
    if (
      this.screenPosition.y > this.parentMenu.y + this.parentMenu.h
        + this.parentMenu.renderOffset
      || this.screenPosition.y + this.heightPerOption < this.parentMenu.y
        + this.parentMenu.renderOffset
    ) {
      if (this.expanded) {
        this.toggleExpansion();
      }
    }

    this.drawLabel();
    this.drawOptions();
  }

  /**
   * Draws the menu's lebel text.
   * 
   * This function exists to help with splitting {@linkcode draw} into multiple
   * steps.
   */
  drawLabel(): void {
    ctx.font = "900 22px Ubuntu";
    ctx.lineWidth = 3;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.strokeText(
      this.labelText, DROPDOWN_UI_PADDING, this.parentMenu.midHeight,
    );
    ctx.fillText(
      this.labelText, DROPDOWN_UI_PADDING, this.parentMenu.midHeight,
    );
  }

  /**
   * Draws the menu's currently selected option and expanded list of options.
   * This also handles setting the cursor to "pointer" if it is hovering over
   * this dropdown menu.
   * 
   * This function exists to help with splitting {@linkcode draw} into multiple
   * steps.
   */
  drawOptions(): void {
    // The positions to render the currently selected option, relative to the
    // parent menu's location.
    let renderX = DROPDOWN_UI_PADDING + this.labelWidth + DROPDOWN_UI_PADDING;
    let renderY = this.parentMenu.midHeight;

    ctx.font = "900 17px Ubuntu";
    ctx.lineWidth = 2;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    // Update the options' vertical translation depending on whether they are
    // being opened or closed
    if (this.expanded) {
      this.optionsTranslateY = interpolate(this.optionsTranslateY, 0, 0.3);
    } else {
      this.optionsTranslateY = interpolate(
        this.optionsTranslateY, -this.totalOptionsHeight, 0.3
      );
    }

    // Clip before drawing list of options, so only expanded options get drawn
    ctx.save();
    ctx.beginPath();
    ctx.rect(
      renderX - 10, 
      renderY + this.heightPerOption / 2 - 10,
      this.optionsWidth + 20,
      (this.options.length + 1) * this.heightPerOption,
    )
    ctx.clip();
    ctx.closePath();

    // Draw the menu's list of options
    const hoveredOption = this.hoveredOptionIndex();
    ctx.translate(0, this.optionsTranslateY);
    let currentY = renderY + this.heightPerOption;
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];

      // Draw a rectangle to contain the option's text, highlighting it in gray
      // if it is being hovered.
      ctx.fillStyle = (i === hoveredOption) ? "#bfbfbf" : "white";
      ctx.beginPath();
      ctx.rect(
        renderX,
        currentY - this.heightPerOption / 2,
        this.optionsWidth,
        this.heightPerOption,
      );
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      // Draw the option's text
      ctx.fillStyle = "white";
      ctx.strokeText(option, renderX + 5, currentY);
      ctx.fillText(option, renderX + 5, currentY);

      currentY += this.heightPerOption;
    }

    // Move on to currently selected option
    ctx.restore();

    // Draw the menu's currently selected option, highlighting it in gray if it
    // has only 1 option.
    ctx.fillStyle = (this.options.length <= 1) ? "#bfbfbf" : "white";
    ctx.beginPath();
    ctx.rect(
      renderX,
      renderY - this.heightPerOption / 2,
      this.optionsWidth,
      this.heightPerOption,
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // Draw the option's text
    ctx.fillStyle = this.getCurrentChoiceColour();
    ctx.strokeText(this.currentChoice, renderX + 5, renderY);
    ctx.fillText(this.currentChoice, renderX + 5, renderY);

    // Draw the downward arrow
    ctx.beginPath();
    ctx.moveTo(renderX + this.optionsWidth - 5, renderY - 5);
    ctx.lineTo(renderX + this.optionsWidth - 15, renderY + 5);
    ctx.lineTo(renderX + this.optionsWidth - 25, renderY - 5);
    ctx.stroke();
    ctx.closePath();

    // If user is hovering over this dropdown menu, change cursor to "pointer"
    if (this.hoveringOverOpener() || hoveredOption > -1) {
      setCursor("pointer");
    }
  }

  /**
   * Determines whether or not the user is hovering over the dropdown menu to
   * open/close it.
   * 
   * Note that if this dropdown menu has only 1 option, the menu becomes
   * unopenable and is treated as never being hovered.
   */
  hoveringOverOpener(): boolean {
    // If this menu is closed and the cursor is not inside the parent menu,
    // return false.
    if (!this.expanded && !this.parentMenu.mouseInMenu()) {
      return false;
    }

    // If this dropdown menu has only 1 option, return false.
    if (this.options.length <= 1) {
      return false;
    }

    return mouseInBox(
      { x: mouse.canvasX, y: mouse.canvasY },
      {
        x: this.screenPosition.x,
        y: this.screenPosition.y,
        w: this.optionsWidth,
        h: this.heightPerOption,
      }
    );
  }

  /**
   * Returns the index of the option that the user is currently hovering over,
   * or -1 if the user is currently not hovering over any option.
   */
  hoveredOptionIndex(): number {
    // If this menu is closed and the cursor is not inside the parent menu,
    // return -1.
    if (!this.expanded && !this.parentMenu.mouseInMenu()) {
      return -1;
    }

    // If the cursor is not below the dropdown opener, return -1.
    if (mouse.canvasY <= this.screenPosition.y + this.heightPerOption) {
      return -1;
    }

    // If the cursor is outside the rectangle containing the full list of
    // options, return -1.
    if (!mouseInBox(
      { x: mouse.canvasX, y: mouse.canvasY },
      {
        x: this.screenPosition.x,
        y: this.screenPosition.y + this.heightPerOption
          + this.optionsTranslateY,
        w: this.optionsWidth,
        h: this.totalOptionsHeight,
      }
    )) {
      return -1;
    }
    
    // Compute the index that the user is hovering over
    const relativeY = mouse.canvasY
      - (this.screenPosition.y + this.heightPerOption + this.optionsTranslateY);
    const index = Math.floor(relativeY / this.heightPerOption);
    
    // Apply bounds just in case
    return Math.max(Math.min(index, this.options.length - 1), 0);
  }

  /**
   * Processes a mouse click input.
   */
  mouseDown() {
    const hoveredOption = this.hoveredOptionIndex();
    if (this.hoveringOverOpener()) {
      this.toggleExpansion();
    } else if (hoveredOption > -1) {
      // Set this menu's current choice to the user's selected option, then
      // fully retract the dropdown menu.
      this.setOption(this.options[hoveredOption]);
      this.optionSelectedTime = time;
      this.expanded = false;
      this.optionsTranslateY = -this.totalOptionsHeight;
    } else if (this.expanded) {
      // If the menu is expanded but the user clicked somewhere else, retract
      // the menu.
      this.toggleExpansion();
    }
  }

  /**
   * Adds a listener to {@linkcode listeners}, which will allow it to listen to
   * all *future* choices made by the user.
   * @param fn The listener to be added.
   * @param applyCurrent Whether or not to also apply `fn` to the
   * {@linkcode currentChoice currently selected option}. Default: `true`.
   */
  addListener(fn: DropdownListener, applyCurrent: boolean = true) {
    this.listeners.push(fn);
    if (applyCurrent) {
      fn(this.currentChoice);
    }
  }

  /**
   * Returns the colour that should be used for the current option's text. This
   * text is usually white, and it flashes green for 600ms when the user
   * successfully selects an option.
   */
  getCurrentChoiceColour(): string {
    if (time - this.optionSelectedTime < 600) {
      const ratio = (time - this.optionSelectedTime) / 600;
      return blendColor(DROPDOWN_GREEN_TEXT_FLASH, "#ffffff", ratio);
    } else {
      return "#ffffff";
    }
  }
}