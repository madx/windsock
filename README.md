# windsock

Generate React components from Tailwind classes

## Install

You need to install [`clsx`](https://www.npmjs.com/package/clsx) and
[`react`](https://www.npmjs.com/package/react) which are peer dependencies. You
most likely already have React and `clsx` is a very small addition to your bundle
(if you're not using it already).

```console
$ npm install --save windsock clsx react
# or
$ yarn add windsock clsx react
```

## Usage

```js
import tag from "windsock"
```

Simple component with an HTML tag:

```js
const RedParagraph = tag.p`text-red-500`
// => <p class="text-red-500"></p>
```

You can use line breaks for readability:

```js
const MoreStyles = tag.div`
  border
  border-blue-300
  p-2
`
// => <div class="border border-blue-300 p-2"></p>
```

Extend an existing component:

```js
const RedParagraphWithUnderline = tag(RedParagraph)`underline`
// => <p class="text-red-500 underline"></p>
```

Interpolation with a function. The function receives the props as first
argument:

```js
const Code = tag.code`
  font-mono
  ${({ language }) => `language-${language}`}
`
// => <code class="font-mono language-html" language="html"></code>
```

Prevent forwarding unwanted props to HTML tags:

```js
const Code = tag("code", { noForward: ["language"] })`
  font-mono
  ${({ language }) => `language-${language}`}
`
// => <code class="font-mono language-html"></code>
```

As a bonus, since we're using `clsx` internally, you can pass objects, arrays
and strings as a `className` prop on the generated components to extend the
styles with custom classes.

## Usage without Tailwind

As you may have noticed there is no dependency to Tailwind because it is not
needed! This also means that `windsock` works with any atomic CSS framework,
even your in-house one!

## Tests

Just execute `yarn test` !
