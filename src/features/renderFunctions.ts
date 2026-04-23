import { isNil } from "../utils";
import { renderData, renderDataKeys, renderDataRotationPivots, renderDataRotations, renderDataScales } from "./renderData";

/**
 * This feature tells {@linkcode enemyRenderMap} to use community renders for
 * certain mobs, instead of the base game's rendering function.
 * 
 * TODO: Rewrite this redirection to use user-selected dropdown options instead
 * of having only one option.
 */
export function applyCommunityRenders(): void {
  addCommunityRenders(["Beetle", "Desert Moth"]);
}

/**
 * A function to display mobs using the slightly different data format that
 * this script uses to store community-made renders. This code is adapted from
 * Flowr's `sharedRenders()` and `newRender()` functions.
 */
function communityRender(enemy: Enemy, type: EnemyType) {
  // Apparently the base code generates gallery entries using a radius of 1 and
  // a render.radius of 25, so we need to set the radius to 25 in that case
  if (enemy.radius === 1 && enemy.render.radius === 25) {
    enemy.radius = 25;
  }

  // Throughout the function, some positions/adjustments will be shifted around
  // in order to implement this pivot point.
  const pivot = renderDataRotationPivots[type];

  // Initialize the mob's own rendering data by making a copy of the mob type's
  // rendering data.
  if (isNil(enemy.renderPaths)) {
    enemy.renderPaths = [];
    for (let key of renderDataKeys[type]) {
      const rawPath = {
        ...renderData[key],
        rotation: 0,
        strokeWidth: 0,
      };

      if (pivot) {
        rawPath.adjustX -= pivot.x;
        rawPath.adjustY -= pivot.y;
      }

      enemy.renderPaths.push(rawPath);
    }
  }

  // Increment `render.time` based on how far the mob moved on this frame
  enemy.render.time += Math.sqrt(
    (enemy.render.lastX - enemy.render.x) ** 2
    + (enemy.render.lastY - enemy.render.y) ** 2
  );
  enemy.render.lastX = enemy.render.x;
  enemy.render.lastY = enemy.render.y;

  // Update animation data for all of the mob's components
  for (let i = 0; i < enemy.renderPaths.length; i++) {
    const entry = enemy.renderPaths[i];

    // Apply shading for yellow pets and damage flashes
    if (entry.baseFill !== "none") {
      entry.fill = enemyColor(entry.baseFill, enemy);
    }
    if (entry.baseStroke !== "none") {
      entry.stroke = enemyColor(entry.baseStroke, enemy);
    }

    // Apply base rotation speed
    entry.rotation = (entry.rotationSpeed ?? 0) * time / 1000;

    // Apply wiggle offset if uninitialized
    if (entry.wiggleOffset === undefined) {
      if (entry.randomWiggleOffset) {
        entry.wiggleOffset = Math.random() * 2 * Math.PI;
      } else {
        entry.wiggleOffset = 0;
      }
    }

    // Apply component wiggling (e.g., legs/mandibles)
    if (!!entry.wiggleInterval) {
      entry.rotation += (entry.wiggleMagnitude ?? 0) * Math.cos(
        enemy.render.time / entry.wiggleInterval * 2 * Math.PI
        + entry.wiggleOffset
      );
    }

    // This is not a typo, the stroke width effectively gets multiplied by
    // radius^2 later in the code so we have to compensate here.
    entry.strokeWidth = entry.baseStrokeWidth / enemy.radius;
  }

  // Apply ctx transformations:
  // 1. Rotate the render to face the direction that the mob itself it facing
  // 2. Scale the render according to the mob's size
  // 3. Translate the render so that components rotate around the correct pivot
  const scale = enemy.radius / renderDataScales[type];
  ctx.save();
  ctx.rotate(enemy.render.angle + (renderDataRotations[type] ?? 0));
  ctx.scale(scale, scale);
  if (pivot) {
    ctx.translate(pivot.x, pivot.y);
  }

  // Construct Path2D objects from the given render data, if this is the first
  // time the mob is being drawn
	for (let path of enemy.renderPaths) {
		if (!path.finished) {
			path.path = new Path2D();
			const matrix = new DOMMatrix()
        .translate(
          path.adjustX - path.componentW / 2,
          path.adjustY - path.componentH / 2
        );

			path.path.addPath(new Path2D(path.pathData), matrix);
			path.finished = true;
		}
	}

  // Get rid of the mess that is enemy.cachedRadius
  enemy.cachedRadius = enemy.radius;

  // Now draw the mob as usual, using the processed render data
  newRender(enemy);
  
  // Restore the ctx to its pre-transformation state
  ctx.restore();
}

/**
 * A helper function to tell {@linkcode enemyRenderMap} to use community-made
 * renders for the given list of mob types.
 */
function addCommunityRenders(types: EnemyType[]) {
  for (let type of types) {
    enemyRenderMap[type] = function(enemy: Enemy) {
      communityRender(enemy, type);
    }
  }
}