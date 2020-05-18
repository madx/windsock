import React from "react"
import clsx from "clsx"

function isFunction(object) {
  return Boolean(object && object.constructor && object.call && object.apply)
}

function makeStyles(props, styles, ...replacements) {
  const validStyles = styles
    .flatMap((s, i) => [
      s.split(/\s+/g).join(" "),
      replacements[i]
        ? isFunction(replacements[i])
          ? clsx(replacements[i](props))
          : replacements[i]
        : "",
    ])
    .map((s) => s.trim())
    .filter((s) => s.length)
  return clsx(validStyles, props.className)
}

function filterProps(props, noForward) {
  return Object.keys(props).reduce(
    (a, e) => (noForward.includes(e) ? a : { ...a, [e]: props[e] }),
    {}
  )
}

const twBuilder = (Component, options = {}) => (styles, ...replacements) => (
  props
) => (
  <Component
    {...(options.noForward ? filterProps(props, options.noForward) : props)}
    className={makeStyles(props, styles, ...replacements)}
  />
)

export default new Proxy(twBuilder, {
  get: (obj, prop) => {
    return obj(prop)
  },
})
