const React = require("react")
const clsx = require("clsx")

function isFunction(object) {
  return Boolean(object && object.constructor && object.call && object.apply)
}

function makeStyles(props, styles, replacements) {
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

const windsock = (Component, options = {}) => (styles, ...replacements) => (
  props
) =>
  React.createElement(Component, {
    ...(options.noForward ? filterProps(props, options.noForward) : props),
    classNames: makeStyles(props, styles, replacements),
  })

Object.defineProperty(exports, "__esModule", {
  value: true,
})

exports.default = new Proxy(windsock, {
  get: (obj, prop) => {
    return obj(prop)
  },
})
