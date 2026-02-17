/**
 * app/utils/geometry.ts v0.7.1
 */
import { Point } from '../types';

export const getMedianPath = (points: number[][]): string => {
  if (!points || points.length === 0) return '';
  return points.reduce((acc, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${acc} ${command} ${point[0]} ${point[1]}`;
  }, '');
};

export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const getPathLength = (points: number[][]): number => {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    total += Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  }
  return total;
};

// --- Spec 13 Algorithms ---

export const subtract = (p1: Point, p2: Point): Point => ({ x: p1.x - p2.x, y: p1.y - p2.y });
export const dot = (p1: Point, p2: Point): number => p1.x * p2.x + p1.y * p2.y;
export const magnitude = (p: Point): number => Math.sqrt(p.x * p.x + p.y * p.y);

/**
 * Calculates Cosine Similarity between two vectors.
 * Returns value between -1 and 1.
 * 1 = same direction, -1 = opposite direction, 0 = orthogonal.
 */
export const cosineSimilarity = (v1: Point, v2: Point): number => {
    const m1 = magnitude(v1);
    const m2 = magnitude(v2);
    if (m1 === 0 || m2 === 0) return 0;
    return dot(v1, v2) / (m1 * m2);
};

/**
 * Resamples a path to a fixed number of equidistant points.
 * Crucial for comparing user input with median stroke data.
 * @param points The original array of points defining the path.
 * @param numPoints The desired number of points in the output path.
 * @returns A new array of points, resampled to be equidistant.
 */
export const resample = (points: Point[], numPoints: number): Point[] => {
    if (!points || points.length === 0) return [];
    if (points.length === 1) return Array(numPoints).fill(points[0]);

    // 1. Calculate the total length of the path.
    const pathLength = points.reduce((acc, p, i) => {
        if (i === 0) return 0;
        return acc + getDistance(points[i-1], p);
    }, 0);

    // 2. Determine the distance between each new point.
    const interval = pathLength / (numPoints - 1);
    const newPoints: Point[] = [points[0]];
    
    let currentDist = 0;
    let nextPointIndex = 1;
    let lastPoint = points[0];

    // 3. Iterate to create the desired number of points.
    for (let i = 1; i < numPoints; i++) {
        let targetDist = i * interval;
        // 4. Walk along the original path segments.
        while (nextPointIndex < points.length) {
            const p1 = lastPoint;
            const p2 = points[nextPointIndex];
            const segmentDist = getDistance(p1, p2);
            
            // 5. If the target point is on the current segment, interpolate its position.
            if (currentDist + segmentDist >= targetDist) {
                const ratio = (targetDist - currentDist) / segmentDist;
                const newX = p1.x + (p2.x - p1.x) * ratio;
                const newY = p1.y + (p2.y - p1.y) * ratio;
                const interpolatedPoint = { x: newX, y: newY };
                newPoints.push(interpolatedPoint);

                // Start the next search from the newly created point.
                lastPoint = interpolatedPoint; 
                currentDist = targetDist;
                break;
            } else {
                // Move to the next segment.
                currentDist += segmentDist;
                lastPoint = p2;
                nextPointIndex++;
            }
        }
    }
    
    // 6. Safeguard: if floating point errors caused a miss, add the last point.
    while (newPoints.length < numPoints) {
        newPoints.push(points[points.length - 1]);
    }
    
    return newPoints;
};

/**
 * Calculates Average Distance between two point sets (Simplified Fréchet).
 * Assumes both sets are resampled to the same count.
 */
export const calculateShapeScore = (userPoints: Point[], targetPoints: Point[]): number => {
    if (userPoints.length !== targetPoints.length) return Infinity;
    
    let sumDist = 0;
    for (let i = 0; i < userPoints.length; i++) {
        sumDist += getDistance(userPoints[i], targetPoints[i]);
    }
    return sumDist / userPoints.length;
};