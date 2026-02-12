/**
 * HanziMaster v0.4.2
 */
/**
 * Geometry utility functions for SVG path calculations
 */

// Helper to convert median points to SVG Path command
export const getMedianPath = (points: number[][]): string => {
  if (!points || points.length === 0) return '';
  return points.reduce((acc, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${acc} ${command} ${point[0]} ${point[1]}`;
  }, '');
};

// Calculate Euclidean distance between two points
export const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// Helper to calculate total length of a stroke path composed of points
export const getPathLength = (points: number[][]): number => {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dist = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    total += dist;
  }
  return total;
};