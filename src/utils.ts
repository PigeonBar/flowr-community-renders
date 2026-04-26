export type nil = null | undefined;

/**
 * @returns `true` if `arg` is `null` or `undefined`, `false` otherwise.
 */
export function isNil(arg: any): arg is nil {
  return arg === undefined || arg === null;
}

/**
 * Returns the result from concatenating {@linkcode biomeEnemyMap},
 * {@linkcode rareBiomeEnemyMap}, and {@linkcode secretBiomeEnemyMap}, without
 * modifying any of the original maps.
 */
export function getAllBiomeEnemiesMap(): BiomeEnemyMap {
  return {
    garden: [
      ...biomeEnemyMap.garden,
      ...rareBiomeEnemyMap.garden,
      ...secretBiomeEnemyMap.garden,
    ],
    desert: [
      ...biomeEnemyMap.desert,
      ...rareBiomeEnemyMap.desert,
      ...secretBiomeEnemyMap.desert,
    ],
    ocean: [
      ...biomeEnemyMap.ocean,
      ...rareBiomeEnemyMap.ocean,
      ...secretBiomeEnemyMap.ocean,
    ],
  };
}
