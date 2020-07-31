import React from "react"
import clsx from "clsx"

function isFunction(object) {
  return Boolean(object && object.constructor && object.call && object.apply)
}

function resolveStyles(props, styles, replacements) {
  const resolved = styles.flatMap((s, i) => [
    s.replace(/\s+/g, " ").trim(),
    replacements[i] && isFunction(replacements[i])
      ? replacements[i](props)
      : replacements[i],
  ])
  return clsx(resolved, props.className)
}

function filterProps(props, noForward) {
  return Object.entries(props).reduce(
    (filteredProps, [propName, propValue]) =>
      noForward.includes(propName)
        ? filteredProps
        : { ...filteredProps, [propName]: propValue },
    {}
  )
}

const windsock = (Component, options = {}) => (styles, ...replacements) =>
  React.forwardRef((props, ref) =>
    React.createElement(Component, {
      ...(options.noForward ? filterProps(props, options.noForward) : props),
      className: resolveStyles(props, styles, replacements),
      ref,
    })
  )

export default new Proxy(windsock, {
  get: (obj, prop) => {
    return obj(prop)
  },
})
