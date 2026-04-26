import { unsafeWindow } from "$";
import { SETTINGS_OPTION_HEIGHT, SCROLLBAR_LENGTH, SETTINGS_SCROLLBAR_MIN_POS } from "../constants/constants";
import { getAvailableArtists, type ArtistName } from "../features/renderData";
import { getAllBiomeEnemiesMap, isNil } from "../utils";
import { DropdownUI } from "./dropdownUi";
import { MenuInformationalText, MenuSectionHeading, MenuTitle } from "./menuTextItems";
import { rendersManager } from "./selectRendersManager";

type MenuItem = DropdownUI | MenuInformationalText;

/**
 * A menu for letting the player select which renders to use.
 * 
 * The scrollbar is somewhat adapted from Flowr's base code for its changelog.
 */
class SelectRendersMenu {
  private _scroll: number;

  /**
   * The x-position of the menu.
   */
  x: number;

  /**
   * The y-position of the menu before accounting for {@linkcode renderOffset},
   * which moves the menu off-screen when the menu is toggled off.
   */
  y: number;

  /**
   * The overall width of this menu.
   */
  w: number;

  /**
   * The overall height of this menu.
   */
  h: number;

  /**
   * Whether or not this menu is currently toggled on.
   */
  active: boolean;

  /**
   * The vertical offset applied to this component's render. This is coded to
   * approach {@linkcode targetOffset} smoothly.
   */
  renderOffset: number;

  /**
   * The contents of this selection menu.
   */
  options: readonly MenuItem[];

  /**
   * The y-position of the row currently being drawn, relative to the menu's
   * position.
   */
  currentHeight: number;

  /**
   * The vertical offset of the mouse from the scrollbar's centre if the user
   * is currently dragging the scrollbar, or `undefined` if the user is not
   * dragging the scrollbar.
   */
  draggingScrollbarOffset?: number;

  /**
   * The total height of this menu's contents.
   */
  totalHeight: number;

  /**
   * The ratio of scrollbar movement to actual content movement.
   */
  scrollbarRatio: number;

  constructor() {
    this._scroll = 0;
    this.currentHeight = 0;
    this.draggingScrollbarOffset = undefined;
    this.x = 110;
    this.y = 20;

    // The height is intentionally not a multiple of SETTINGS_OPTION_HEIGHT, to
    // make it clearer to the user that the menu should be scrollable.
    this.h = 13.2 * SETTINGS_OPTION_HEIGHT;
    this.w = 450;
    this.active = false;
    this.renderOffset = -this.h - 40;
  
    // Add the menu's title
    const rawOptions: MenuItem[] = [
      new MenuTitle("Renders Selection Menu", this),
    ];

    // Prepare to add dropdowns for all possible mob types
    const allEnemies = getAllBiomeEnemiesMap();
    const addedEnemies = new Set<EnemyType>();

    const addEnemies = (enemyList: EnemyType[]) => {
      for (let enemyType of enemyList) {
        // Only add a mob if it has not already been added
        if (!addedEnemies.has(enemyType)) {
          const newDropdown = new DropdownUI(
            enemyType,
            getAvailableArtists(enemyType),
            rendersManager.get(enemyType),
            this,
          );
          newDropdown.addListener((option: ArtistName) => {
            rendersManager.set(enemyType, option);
          }, false);
          rawOptions.push(newDropdown);
          addedEnemies.add(enemyType);
        }
      }
    }

    // Add all Garden mobs
    rawOptions.push(new MenuSectionHeading("Garden", this));
    addEnemies(allEnemies.garden);

    // Add all Desert mobs
    rawOptions.push(new MenuSectionHeading("Desert", this));
    addEnemies(allEnemies.desert);

    // Add all Ocean mobs
    rawOptions.push(new MenuSectionHeading("Ocean", this));
    addEnemies(allEnemies.ocean);

    // Freeze the final list of options
    this.options = Object.freeze(rawOptions);
    
    // Count the total vertical space used up by the list of options
    this.totalHeight = this.options.reduce(
      (previousValue, option) => previousValue + option.height, 0
    );
    this.scrollbarRatio = (this.h - 2 * SETTINGS_SCROLLBAR_MIN_POS)
      / (this.totalHeight + 10 - this.h);

    // Allow this menu to process mouse inputs
    const originalOnMouseDown = unsafeWindow.onmousedown;
    unsafeWindow.onmousedown = (e: MouseEvent) => {
      originalOnMouseDown?.apply(unsafeWindow, [e]);

      if (unsafeWindow.connected === true) {
        this.mouseDown();
      }
    }
    const originalOnMouseUp = unsafeWindow.onmouseup;
    unsafeWindow.onmouseup = (e: MouseEvent) => {
      originalOnMouseUp?.apply(unsafeWindow, [e]);

      if (unsafeWindow.connected === true) {
        this.mouseUp();
      }
    }
    
    // Allow this menu to be drawn
    const originalDraw = settingsMenu.draw;
    settingsMenu.draw = () => {
      originalDraw.apply(settingsMenu);
      this.draw();
    }

    // Allow this menu to respond to scrolling inputs
    document.addEventListener("wheel", (e: WheelEvent) => {
      this.updateScroll(e);
    });
  }

  /**
   * The y-position at the midpoint of the option currently being rendered.
   */
  get midHeight(): number {
    return this.currentHeight + SETTINGS_OPTION_HEIGHT / 2;
  }

  /**
   * How much the menu's contents are currently shifted due to scrolling.
   */
  get scroll(): number {
    return this._scroll;
  }

  set scroll(val: number) {
    // Enforce bounds here
    this._scroll = Math.min(Math.max(val, 0), this.totalHeight + 10 - this.h);
  }

  /**
   * The target vertical offset of this component. This is set to a negative
   * value to move the menu offscreen when the menu is toggled off.
   */
  get targetOffset(): number {
    return this.active ? 0 : -this.h - 40;
  }
  
  /**
   * The vertical position of the centre of this menu's scrollbar.
   */
  get scrollbarPos(): number {
    return this.scroll * this.scrollbarRatio + SETTINGS_SCROLLBAR_MIN_POS;
  };

  set scrollbarPos(pos: number) {
    if (!isNil(this.draggingScrollbarOffset)) {
      this.scroll = 
        (pos - SETTINGS_SCROLLBAR_MIN_POS - this.y - this.renderOffset)
        / this.scrollbarRatio;
    }
  }

  /**
   * The main function to draw this menu.
   */
  draw() {
    this.renderOffset = interpolate(this.renderOffset, this.targetOffset, 0.3);

    if (!isNil(this.draggingScrollbarOffset)) {
      this.scrollbarPos = mouse.canvasY - this.draggingScrollbarOffset;
    }
    
    // Clip to make sure that options do not get drawn outside the menu
    ctx.save();
    ctx.translate(this.x, this.y + this.renderOffset);
    ctx.beginPath();
    ctx.roundRect(0, 0, this.w, this.h, 3);
    ctx.clip();
    ctx.closePath();

    // Draw the menu's background before we apply scroll translation
    ctx.fillStyle = "#aaaaaa";
    ctx.beginPath();
    ctx.roundRect(0, 0, this.w, this.h, 3);
    ctx.fill();
    ctx.closePath();

    // Draw the scrollbar
    ctx.strokeStyle = "#7f7f7f";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.w - 16, this.scrollbarPos - SCROLLBAR_LENGTH / 2);
    ctx.lineTo(this.w - 16, this.scrollbarPos + SCROLLBAR_LENGTH / 2);
    ctx.stroke();
    ctx.closePath();
    // Set the cursor to "pointer" if it is hovering over the scrollbar
    if (this.active &&
      (this.mouseOnScrollbar() || !isNil(this.draggingScrollbarOffset))
    ) {
      setCursor("pointer");
    }

    // Apply translation due to scrolling
    ctx.translate(0, -this.scroll);

    // Render all items
    // TODO: Optimization - Do not render or process any off-screen options
    this.currentHeight = 5;
    for (let option of this.options) {
      option.draw();
      this.currentHeight += option.height;
    }

    // Draw the menu's border here so it does not get covered by the options
    ctx.restore(); // Reenable drawing outside the menu's border
    ctx.save();
    ctx.translate(this.x, this.y + this.renderOffset);
    ctx.strokeStyle = "#8a8a8a";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect(0, 0, this.w, this.h, 3);
    ctx.stroke();
    ctx.closePath();
    
    // Draw the expanded dropdowns last, since they are intended to be able to
    // expand past the bottom of the menu.
    ctx.translate(0, -this.scroll);
    this.currentHeight = 5;
    for (let option of this.options) {
      if (option.isDropdownUI() && option.expanded) {
        option.drawOptions();
      }

      this.currentHeight += option.height;
    }

    ctx.restore(); // Revert the most recent translations
  }

  /**
   * Processes the user clicking on this menu.
   */
  mouseDown(): void {
    if (!this.active) {
      return;
    }

    // Process clicking the scrollbar
    if (this.mouseOnScrollbar()) {
      this.draggingScrollbarOffset =
        mouse.canvasY - (this.y + this.renderOffset + this.scrollbarPos);
    }

    // Process clicking the dropdown menus
    for (let option of this.options) {
      if (option.isDropdownUI()) {
        option.mouseDown();
      }
    }
  }

  /**
   * Processes the user releasing a mouse click.
   */
  mouseUp(): void {
    // Release the scrollbar if it is currently being dragged
    this.draggingScrollbarOffset = undefined;
  }

  /**
   * Scrolls this menu up/down in response to a mouse wheel input.
   */
  updateScroll(e: WheelEvent) {
    if (this.active && this.mouseInMenu()) {
      this.scroll += e.deltaY / 2;
    }
  }

  /**
   * Toggles whether this menu is opened or closed.
   */
  toggle(): void {
    this.active = !this.active;

    if (!this.active) {
      // When closing this menu, also cancel dragging the scrollbar.
      this.mouseUp();

      // When closing this menu, also close all contained dropdown menus.
      for (let option of this.options) {
        if (option.isDropdownUI() && option.expanded) {
          option.toggleExpansion();
        }
      }
    }
  }

  /**
   * Checks whether the mouse is inside this menu, excluding its borders.
   */
  mouseInMenu(): boolean {
    return mouseInBox(
      {x: mouse.canvasX, y: mouse.canvasY},
      {x: this.x + 4, y: this.y + 4, w: this.w - 8, h: this.h - 8},
    );
  }

  /**
   * Checks whether the mouse is hovering over this menu's scrollbar.
   */
  mouseOnScrollbar(): boolean {
    return mouseInBox(
      {x: mouse.canvasX, y: mouse.canvasY},
      {
        x: this.x + this.w - 24,
        y: this.y + this.renderOffset + this.scrollbarPos
          - SCROLLBAR_LENGTH / 2,
        w: 16,
        h: SCROLLBAR_LENGTH,
      },
    );
  }
}

export const selectRendersMenu = new SelectRendersMenu();
export type { SelectRendersMenu };