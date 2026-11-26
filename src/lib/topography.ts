/**
 * Pure helpers for the topographic background: a smooth height field
 * (value noise) and marching squares to trace contour lines through it.
 * No DOM access here, so it's easy to test and reason about.
 */

/** Small deterministic PRNG-based hash so the terrain looks the same on every visit. */
function hash(x: number, y: number, seed: number): number {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** 2D value noise in [0, 1]. */
function valueNoise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smooth(x - x0);
  const ty = smooth(y - y0);
  const a = hash(x0, y0, seed);
  const b = hash(x0 + 1, y0, seed);
  const c = hash(x0, y0 + 1, seed);
  const d = hash(x0 + 1, y0 + 1, seed);
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

/** Layered noise (fBm) gives natural-looking hills. Returns roughly [0, 1]. */
export function terrainHeight(x: number, y: number, seed = 7): number {
  let amplitude = 0.55;
  let frequency = 1;
  let total = 0;
  let norm = 0;
  for (let octave = 0; octave < 3; octave++) {
    total += valueNoise(x * frequency, y * frequency, seed + octave) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2.1;
  }
  return total / norm;
}

/** Height values sampled on a regular grid (row-major). */
export type HeightGrid = { values: Float32Array; cols: number; rows: number; cell: number };

export function sampleGrid(
  width: number,
  height: number,
  cell: number,
  offsetY: number,
  scale: number,
): HeightGrid {
  const cols = Math.ceil(width / cell) + 1;
  const rows = Math.ceil(height / cell) + 1;
  const values = new Float32Array(cols * rows);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      values[row * cols + col] = terrainHeight((col * cell) / scale, (row * cell + offsetY) / scale);
    }
  }
  return { values, cols, rows, cell };
}

/** Bilinear height lookup at a pixel position (used to find the contour under the cursor). */
export function heightAt(grid: HeightGrid, px: number, py: number): number {
  const { values, cols, rows, cell } = grid;
  const gx = Math.min(Math.max(px / cell, 0), cols - 1.001);
  const gy = Math.min(Math.max(py / cell, 0), rows - 1.001);
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const tx = gx - x0;
  const ty = gy - y0;
  const i = y0 * cols + x0;
  const top = values[i] + (values[i + 1] - values[i]) * tx;
  const bottom = values[i + cols] + (values[i + cols + 1] - values[i + cols]) * tx;
  return top + (bottom - top) * ty;
}

/**
 * Marching squares: appends the line segments where the field crosses `level`
 * to the current canvas path (caller sets style and calls stroke()).
 */
export function traceContour(ctx: CanvasRenderingContext2D, grid: HeightGrid, level: number): void {
  const { values, cols, rows, cell } = grid;
  const lerp = (a: number, b: number) => (level - a) / (b - a);

  for (let row = 0; row < rows - 1; row++) {
    for (let col = 0; col < cols - 1; col++) {
      const i = row * cols + col;
      const tl = values[i];
      const tr = values[i + 1];
      const br = values[i + cols + 1];
      const bl = values[i + cols];
      const index = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
      if (index === 0 || index === 15) continue;

      const x = col * cell;
      const y = row * cell;
      // Crossing points on each edge of the cell.
      const top: [number, number] = [x + lerp(tl, tr) * cell, y];
      const right: [number, number] = [x + cell, y + lerp(tr, br) * cell];
      const bottom: [number, number] = [x + lerp(bl, br) * cell, y + cell];
      const left: [number, number] = [x, y + lerp(tl, bl) * cell];

      const segment = (a: [number, number], b: [number, number]) => {
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      };

      switch (index) {
        case 1: case 14: segment(left, bottom); break;
        case 2: case 13: segment(bottom, right); break;
        case 3: case 12: segment(left, right); break;
        case 4: case 11: segment(top, right); break;
        case 6: case 9: segment(top, bottom); break;
        case 7: case 8: segment(left, top); break;
        case 5: segment(left, top); segment(bottom, right); break;
        case 10: segment(top, right); segment(left, bottom); break;
      }
    }
  }
}
