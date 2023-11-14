export default function fadeScale(
  node, { delay = 0, duration = 200, easing = x => x, scale = 0 }
) {
  const o = +getComputedStyle(node).opacity;
  const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
  const s = m ? m[1] : 1;
  const is = 1 - scale;

  return {
    delay,
    duration,
    css: t => {
      const eased = easing(t);
      return `opacity: ${eased * o}; transform: scale(${(eased * s * is) + scale})`;
    }
  };
}
