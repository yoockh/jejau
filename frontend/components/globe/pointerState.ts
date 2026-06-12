/** Mutable cursor state shared between the DOM wrapper and the R3F scene. */
export type PointerState = {
  /** -1 (left) … 1 (right), relative to the globe container */
  x: number;
  /** -1 (top) … 1 (bottom) */
  y: number;
  hovering: boolean;
};

export function createPointerState(): PointerState {
  return { x: 0, y: 0, hovering: false };
}
