import { throttleRAF } from "$lib/throttleRAF";

export function property(el, props) {
  if (!props) return

  Object.assign(el, props)

  return {
    update(props) {
      Object.assign(el, props)
    },
  };
}

export function portal(el, target) {
  if (!target) return

  target.append(el);

  return {
    destroy() {
      el.remove();
    },
  };
}

export function toggle(el, name) {
  if (!name) return

  el.addEventListener('click', () => {
    let targets = document.querySelectorAll(`[data-toggle="${name}"]`)
    let targetsClass = document.querySelectorAll(`[data-toggle-class^="${name}"]`)

    targets.forEach(target => target.hidden = !target.hidden)
    targetsClass.forEach(target => {
      target.getAttribute('data-toggle-class')
        .replace(/.+-> */, '')
        .split(/\s+/)
        .forEach(kelas => target.classList.toggle(kelas))
    })
  })
}

export function key(el, [keyNames, cb]) {
  if (typeof keyNames === 'string')
    keyNames = [keyNames]

  const down = (e) => {
    if (keyNames.includes(e.key)) {
      cb(e)
    }
  }

  el.addEventListener('keydown', down)

  return {
    destroy() {
      el.removeEventListener('keydown', down)
    }
  }
}

export function clickOutside(element, cb) {
  function onClick(e) {
    if (!element.contains(e.target)) {
      cb(e);
    }
  }

  const blur = (e) => {
    if (document.activeElement.tagName === 'IFRAME') {
      cb(e)
    }
  }

  document.addEventListener('click', onClick);
  window.addEventListener('blur', blur);

  return {
    // update() {
    //   console.log('update')
    // },
    destroy() {
      document.removeEventListener('click', onClick);
      window.removeEventListener('blur', blur);
    }
  }
}

export function pull(el, cb) {
  if (!cb)
    return

  let cbs = {}

  let isDrag
  let anchor = { x: 0, y: 0 }

  let throttle = throttleRAF()

  const down = (e) => {
    isDrag = false
    anchor = { x: e.clientX, y: e.clientY }

    if (cb(e, ...['move', 'up'].map(key => (fn) => cbs[key] = fn)) === false)
      return

    if (!cbs.move)
      return

    el.setPointerCapture(e.pointerId)

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
  }

  let unthrottle
  const move = (e) => {
    throttle(() => {
      let delta = {
        x: e.clientX - anchor.x,
        y: e.clientY - anchor.y,
      }

      isDrag = true

      cbs.move?.(e, delta, anchor, (fn) => unthrottle = fn)
    })
    unthrottle?.()
  }

  const up = (e) => {
    // Auto released by browser
    // el.releasePointerCapture(e.pointerId)

    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerup', up)

    cbs.up?.(e, isDrag)
  }

  el.addEventListener('pointerdown', down)

  return {
    destroy() {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
    }
  }
}

// const pointerclick = (el, cb) => {
//   let x;
//
//   const down = (e) => {
//     x = e.target;
//   };
//
//   const up = (e) => {
//     e.stopPropagation();
//     if (e.target === x) cb(e);
//     x = null;
//   };
//
//   el.addEventListener("pointerdown", down);
//   el.addEventListener("pointerup", up);
//
//   return {
//     destroy() {
//       el.removeEventListener("pointerdown", down);
//       el.removeEventListener("pointerup", up);
//     },
//   };
// };
