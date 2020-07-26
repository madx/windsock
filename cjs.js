'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var clsx = _interopDefault(require('clsx'));

function isFunction(object) {
  return Boolean(object && object.constructor && object.call && object.apply)
}

function resolveStyles(props, styles, replacements) {
  const resolved = styles.flatMap((s, i) => [
    s.replace(/\s+/g, " ").trim(),
    replacements[i] && isFunction(replacements[i])
      ? replacements[i](props)
      : replacements[i],
  ]);
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

const windsock = (Component, options = {}) => (styles, ...replacements) => (
  props
) =>
  React.createElement(Component, {
    ...(options.noForward ? filterProps(props, options.noForward) : props),
    className: resolveStyles(props, styles, replacements),
  });

var index = new Proxy(windsock, {
  get: (obj, prop) => {
    return obj(prop)
  },
});

exports.default = index;
