import { cubicOut } from "svelte/easing";

export function flyScale(node, { duration = 150, scale, y }) {
  const style = getComputedStyle(node);
  const sd = 1 - scale;

  return {
    duration,
    easing: cubicOut,
    css: (t, u) => {
      // prettier-ignore
      return `
					transform: ${style.transform || ''} scale(${1 - sd * u}) translate3d(0, ${u * y}px, 0);
					`;
    },
  };
}
