import { rendersManager } from "../ui/selectRendersManager";
import { isNil } from "../utils";
import { renderData, type ComponentData, type RenderData } from "./renderData";

let originalEnemyRenderMap: Record<EnemyType, (e: Enemy) => void> = {};

/**
 * A list of dummy objects used by {@linkcode generateImage} for generating
 * diffrently shaded images of each mob.
 */
const colourables = {
  normal: {
    team: "enemy",
    ticksSinceLastDamaged: 1001,
    lastTicksSinceLastDamaged: 1001,
  } as ColourableLikeEnemy,
  pet: {
    team: "flower",
    ticksSinceLastDamaged: 1001,
    lastTicksSinceLastDamaged: 1001,
  } as ColourableLikeEnemy,
  damaged: {
    team: "enemy",
    ticksSinceLastDamaged: 0,
    lastTicksSinceLastDamaged: 1001,
  } as ColourableLikeEnemy,
  damagedPet: {
    team: "flower",
    ticksSinceLastDamaged: 0,
    lastTicksSinceLastDamaged: 1001,
  } as ColourableLikeEnemy,
  damagedRed: {
    team: "enemy",
    ticksSinceLastDamaged: 0,
    lastTicksSinceLastDamaged: 0,
  } as ColourableLikeEnemy,
  damagedRedPet: {
    team: "flower",
    ticksSinceLastDamaged: 0,
    lastTicksSinceLastDamaged: 0,
  } as ColourableLikeEnemy,
};

type CachedRenders = {
  normal: OffscreenCanvas,
  pet: OffscreenCanvas,
  damaged: OffscreenCanvas,
  damagedPet: OffscreenCanvas,
  damagedRed: OffscreenCanvas,
  damagedRedPet: OffscreenCanvas,
}

/**
 * A record of cached images to be used for applicable mob types.
 */
const cachedCommunityRenders:
  Partial<Record<EnemyType, CachedRenders[]>> = {};

/**
 * The resolution used for each cached image.
 */
const resolution = 512;

/**
 * This feature tells {@linkcode enemyRenderMap} to use community renders for
 * certain mobs, instead of the base game's rendering function.
 */
export function applyCommunityRenders(): void {
  // Make a backup copy of `enemyRenderMap` before we overwrite it
  originalEnemyRenderMap = Object.freeze({...enemyRenderMap});

  // Tell rendering engine to use community renders for available mobs
  for (let enemyType of Object.keys(renderData)) {
    enemyRenderMap[enemyType] = function(enemy: Enemy) {
      communityRender(enemy, enemyType);
    }
  }
}

/**
 * A function to display mobs using the slightly different data format that
 * this script uses to store community-made renders. This code is adapted from
 * Flowr's `sharedRenders()` and `newRender()` functions.
 * 
 * Note: The `enemyType` param looks redundant, but it is actually required
 * because of some spaghetti in Flowr's base code that sometimes causes
 * `enemy.type` to be missing when drawing gallery entries.
 */
function communityRender(enemy: Enemy, enemyType: EnemyType): void {
  // Search up the rendering data for the selected artist
  const data = getRenderData(enemy, enemyType);
  if (isNil(data)) {
    originalEnemyRenderMap[enemyType](enemy);
    return;
  }

  // Apparently the base code generates gallery entries using a radius of 1 and
  // a render.radius of 25, so we need to set the radius to 25 in that case
  if (enemy.radius === 1 && enemy.render.radius === 25) {
    enemy.radius = 25;
  }

  if (data.useCaching) {
    if (isNil(cachedCommunityRenders[enemyType])) {
      cachedCommunityRenders[enemyType] = [];
      initCachedRenders(enemyType, data);
    }

    if (isNil(enemy.cachedAnimData)) {
      enemy.cachedAnimData = [];
      initComponentAnimData(enemy, data);
    }

    updateAnimationDataCached(enemy);

    applyCtxTransformationsCached(enemy, data);

    drawCachedRender(enemy, enemyType);

    // Restore the ctx to its pre-transformation state
    ctx.restore();
  } else {
    if (isNil(enemy.renderPaths)) {
      enemy.renderPaths = [];
      initRenderPaths(enemy, data);
    }

    updateAnimationData(enemy);

    applyCtxTransformations(enemy, data);

    // Get rid of the mess that is enemy.cachedRadius
    enemy.cachedRadius = enemy.radius;

    // Now draw the mob as usual, using the processed render data
    newRender(enemy);
    
    // Restore the ctx to its pre-transformation state
    ctx.restore();
  }
}

/**
 * A helper function to retrieve the rendering data for the artist that the
 * user had selected. This function also deletes the mob's `renderPaths` if it
 * is now using a different artist.
 * 
 * Returns `undefined` if the selected artist is "Base game" or if the selected
 * artist somehow has no associated render data.
 */
function getRenderData(
  enemy: Enemy, enemyType: EnemyType,
): RenderData | undefined {
  // Search up the rendering data for the artist that the user has selected
  const artist = rendersManager.get(enemyType);
  if (enemy.artist !== artist) {
    // If the artist changed, delete the `renderPaths` set by the previous
    // artist.
    enemy.renderPaths = undefined;
    enemy.artist = artist;
  }

  const data = renderData[enemyType]?.[artist];
  if (artist === "Base game" || isNil(data)) {
    return undefined;
  } else {
    return data;
  }
}

/**
 * A helper function to initialize the mob's own rendering data by making a
 * copy of the mob type's rendering data.
 * 
 * This is used for rendering in non-cached mode.
 */
function initRenderPaths(enemy: Enemy, data: RenderData): void {
  enemy.renderPaths = [];
  const pivot = data.rotationPivot;

  for (let component of data.components) {
    for (let pathData of component.paths) {
      const path: RenderPath = {
        baseFill: pathData.baseFill,
        baseStroke: pathData.baseStroke,
        baseStrokeWidth: pathData.baseStrokeWidth,
        fill: enemyColor(pathData.baseFill, enemy),
        stroke: enemyColor(pathData.baseStroke, enemy),
        strokeWidth: pathData.baseStrokeWidth / enemy.radius,

        rotationSpeed: component.rotationSpeed,
        wiggleInterval: component.wiggleInterval,
        wiggleMagnitude: component.wiggleMagnitude,
        wiggleOffset:
          component.randomWiggleOffset ? Math.random() * 2 * Math.PI : 0,
        finished: false,
        path: new Path2D(),
      };

      // Also initialize the actual Path2D object here
      const matrix = new DOMMatrix()
        .translate(
          component.adjustX - component.width / 2 - (pivot?.x ?? 0),
          component.adjustY - component.height / 2 - (pivot?.y ?? 0),
        );
      path.path.addPath(new Path2D(pathData.d), matrix);
      path.finished = true;

      enemy.renderPaths.push(path);
    }
  }
}

/**
 * A helper function to populate {@linkcode cachedCommunityRenders} for the
 * given mob type.
 * 
 * This is used for rendering in cached mode.
 */
function initCachedRenders(enemyType: EnemyType, data: RenderData): void {
  cachedCommunityRenders[enemyType] = [];
  for (let component of data.components) {
    cachedCommunityRenders[enemyType].push({
      normal: generateImage(component, "normal", data),
      pet: generateImage(component, "pet", data),
      damaged: generateImage(component, "damaged", data),
      damagedPet: generateImage(component, "damagedPet", data),
      damagedRed: generateImage(component, "damagedRed", data),
      damagedRedPet: generateImage(component, "damagedRedPet", data),
    });
  }
}

/**
 * A helper function to generate an image for a given mob component using the
 * style given by the given key.
 */
function generateImage(
  component: ComponentData,
  key: keyof CachedRenders,
  data: RenderData,
): OffscreenCanvas {
  const pivot = data.rotationPivot;
  const newCanvas = new OffscreenCanvas(resolution, resolution);
  const newCtx = newCanvas.getContext("2d");
  if (isNil(newCtx)) {
    console.warn("Warning: newCtx is somehow undefined!");

    // This could cause an infinite loop if the newCanvas somehow keeps failing
    // to generate a ctx, but that should never happen
    return generateImage(component, key, data);
  }

  // Set up the ctx at the centre of the canvas
  newCtx.translate(resolution * 0.5, resolution * 0.5);
  newCtx.scale(resolution * 0.25 / data.scale, resolution * 0.25 / data.scale);
  newCtx.lineCap = "round";
  newCtx.lineJoin = "round";

  // Loop through all of the paths to draw them
  for (let path of component.paths) {
    const matrix = new DOMMatrix()
      .translate(
        component.adjustX - component.width / 2 - (pivot?.x ?? 0),
        component.adjustY - component.height / 2 - (pivot?.y ?? 0),
      );
    const pathObj = new Path2D();
    pathObj.addPath(new Path2D(path.d), matrix);

    // Temporarily set `damageFlash` to `false` so that we can properly
    // generate red damage flashes
    const originalDamageFlash = damageFlash;
    damageFlash = false;

    newCtx.fillStyle = enemyColor(path.baseFill, colourables[key]);
    newCtx.strokeStyle = enemyColor(path.baseStroke, colourables[key]);
    newCtx.lineWidth = path.baseStrokeWidth;

    damageFlash = originalDamageFlash;

    newCtx.fill(pathObj);
    newCtx.stroke(pathObj);
  }

  return newCanvas;
}

/**
 * A helper function to initialize the mob's own rendering data by making a
 * copy of the mob type's rendering data.
 * 
 * This is used for rendering in cached mode.
 */
function initComponentAnimData(
  enemy: Enemy, data: RenderData,
): void {
  enemy.cachedAnimData = [];
  for (let component of data.components) {
    enemy.cachedAnimData.push({
      rotationSpeed: component.rotationSpeed,
      wiggleInterval: component.wiggleInterval,
      wiggleMagnitude: component.wiggleMagnitude,
      wiggleOffset:
        component.randomWiggleOffset ? Math.random() * 2 * Math.PI : 0,
    });
  }
}

/**
 * A helper function to update animation data for every component of the given
 * mob.
 * 
 * This is used for rendering in non-cached mode.
 */
function updateAnimationData(enemy: Enemy): void {
  if (isNil(enemy.renderPaths)) {
    console.warn("Enemy renderPaths is undefined!");
    console.warn(enemy);
    return;
  }

  // Increment `render.time` based on how far the mob moved on this frame
  enemy.render.time += Math.sqrt(
    (enemy.render.lastX - enemy.render.x) ** 2
    + (enemy.render.lastY - enemy.render.y) ** 2
  );
  enemy.render.lastX = enemy.render.x;
  enemy.render.lastY = enemy.render.y;

  // Loop through the mob's components to update animation data
  for (let entry of enemy.renderPaths) {
    // Apply shading for yellow pets and damage flashes
    if (entry.baseFill !== "none") {
      entry.fill = enemyColor(entry.baseFill, enemy);
    }
    if (entry.baseStroke !== "none") {
      entry.stroke = enemyColor(entry.baseStroke, enemy);
    }

    // Apply base rotation speed
    entry.rotation = (entry.rotationSpeed ?? 0) * time / 1000;

    // Apply component wiggling (e.g., legs/mandibles)
    if (!isNil(entry.wiggleInterval)) {
      entry.rotation += (entry.wiggleMagnitude ?? 0) * Math.cos(
        enemy.render.time / entry.wiggleInterval * 2 * Math.PI
        + entry.wiggleOffset
      );
    }

    // This is not a typo, the stroke width effectively gets multiplied by
    // radius^2 later in the code so we have to compensate here.
    entry.strokeWidth = entry.baseStrokeWidth / enemy.radius;
  }
}

/**
 * A helper function to update animation data for every component of the given
 * mob.
 * 
 * This is used for rendering in non-cached mode.
 */
function updateAnimationDataCached(enemy: Enemy): void {
  if (isNil(enemy.cachedAnimData)) {
    console.warn("Enemy cachedAnimData is undefined!");
    console.warn(enemy);
    return;
  }

  // Increment `render.time` based on how far the mob moved on this frame
  enemy.render.time += Math.sqrt(
    (enemy.render.lastX - enemy.render.x) ** 2
    + (enemy.render.lastY - enemy.render.y) ** 2
  );
  enemy.render.lastX = enemy.render.x;
  enemy.render.lastY = enemy.render.y;

  // Loop through the mob's components to update animation data
  for (let entry of enemy.cachedAnimData) {
    // Apply base rotation speed
    entry.rotation = (entry.rotationSpeed ?? 0) * time / 1000;

    // Apply component wiggling (e.g., legs/mandibles)
    if (!isNil(entry.wiggleInterval)) {
      entry.rotation += (entry.wiggleMagnitude ?? 0) * Math.cos(
        enemy.render.time / entry.wiggleInterval * 2 * Math.PI
        + entry.wiggleOffset
      );
    }
  }
}

/**
 * A helper function to draw cached renders for the given enemy after its
 * cached renders have been initialized by previous helper functions.
 * 
 * This is used for rendering in cached mode (what a surprise).
 */
function drawCachedRender(enemy: Enemy, enemyType: EnemyType): void {
  if (isNil(cachedCommunityRenders[enemyType])) {
    console.warn("cachedCommunityRenders is undefined!");
    console.warn(enemy);
    return;
  }

  for (let i = 0; i < cachedCommunityRenders[enemyType].length; i++) {
    const images = cachedCommunityRenders[enemyType][i];
    const rotation = enemy.cachedAnimData?.[i]?.rotation ?? 0;
    ctx.rotate(rotation);

    // Determine the correct images to draw, based on whether the "enemy" is
    // a pet, and whether the enemy has just been damaged.
    let image = images.normal;
    if (enemy.team === "flower") {
      image = images.pet;
    }
    
    let damagedImage = images.damaged;
    if (enemy.team === "flower") {
      if (checkForFirstFrame(enemy)) {
        damagedImage = images.damagedRedPet;
      } else {
        damagedImage = images.damagedPet;
      }
    } else {
      if (checkForFirstFrame(enemy)) {
        damagedImage = images.damagedRed;
      } else {
        damagedImage = images.damaged;
      }
    }

    const r = enemy.radius;
    ctx.drawImage(image, -2 * r, -2 * r, 4 * r, 4 * r);
    if (blendAmount(enemy) > 0) {
      // Set globalAlpha to apply the correct damage flash intensity
      ctx.globalAlpha = blendAmount(enemy);
      ctx.drawImage(damagedImage, -2 * r, -2 * r, 4 * r, 4 * r);
      ctx.globalAlpha = 1;
    }
    ctx.rotate(-rotation);
  }
}

/**
 * A helper function to transform the ctx as follows:
 * 1. Rotate the render to face the direction that the mob itself is facing
 * 2. Scale the render according to the mob's size
 * 3. Translate the render so that components rotate around the correct pivot
 * 
 * This is used for rendering in non-cached mode.
 */
function applyCtxTransformations(enemy: Enemy, data: RenderData): void {
  const scale = enemy.radius / data.scale;
  const pivot = data.rotationPivot;
  ctx.save();
  ctx.rotate(enemy.render.angle + (data.rotation ?? 0));
  ctx.scale(scale, scale);
  if (!isNil(pivot)) {
    ctx.translate(pivot.x, pivot.y);
  }
}

/**
 * A helper function to transform the ctx as follows:
 * 1. Rotate the render to face the direction that the mob itself is facing
 * 2. Translate the render so that components rotate around the correct pivot
 * 
 * This is used for rendering in cached mode.
 */
function applyCtxTransformationsCached(enemy: Enemy, data: RenderData): void {
  ctx.save();
  ctx.rotate(enemy.render.angle + (data.rotation ?? 0));
  const pivot = data.rotationPivot;
  if (!isNil(pivot)) {
    ctx.translate(
      pivot.x * enemy.radius / data.scale,
      pivot.y * enemy.radius / data.scale,
    );
  }
}