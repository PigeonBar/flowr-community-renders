import type { ArtistName } from "../features/renderData";

type SelectedRenders = Partial<Record<EnemyType, ArtistName>>;

export class SelectRendersManager {
  /**
   * A saved record of the renders selected by the player.
   */
  savedSelections: SelectedRenders;

  constructor() {
    // Retrieve saved selections from local storage
    this.savedSelections = JSON.parse(
      localStorage.getItem("communityRenderSelections") ?? "{}"
    );
  }

  /**
   * Retrieves the render selected by the player, or "Base game" if the player
   * has not made a selection.
   */
  get(enemyType: EnemyType): ArtistName {
    return this.savedSelections[enemyType] ?? "Base game";
  }

  /**
   * Saves a new selection to local storage.
   * @param enemyType The {@linkcode EnemyType} being written to.
   * @param option The {@linkcode ArtistName} to write.
   */
  set(enemyType: EnemyType, option: ArtistName): void {
    this.savedSelections[enemyType] = option;
    localStorage.setItem(
      "communityRenderSelections", JSON.stringify(this.savedSelections)
    );
  }
}

export const rendersManager = new SelectRendersManager();