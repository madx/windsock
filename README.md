# windsock

## Generate React components from Tailwind classes

## Install

You need to install clsx and react which are peer dependencies. You most likely
already have React and clsx is a very small addition to your bundle (if you
don't use it already).

```console
$ npm install --save windsock clsx react
```

## Usage

```js
import tw from "windsock"

//------------------------------------------------------------------------------
// Simple component with an HTML tag

const RedParagraph = tw.p`text-red-500`

// => <p class="text-red-500"></p>


//------------------------------------------------------------------------------
// You can use line breaks too

const MoreStyles = tw.div`
  border
  border-blue-300
  p-2
`

// => <div class="border border-blue-300 p-2"></p>


//------------------------------------------------------------------------------
// Simple component using another React component

const RedUnderlineParagraph = tw(RedParagraph)`underline`

// => <p class="text-red-500 underline"></p>


//------------------------------------------------------------------------------
// Interpolation with a function. The function receives the props as first arg

const Code = tw.code`
  text-base
  font-mono
  text-gray-800
  bg-gray-200
  p-1
  ${({ language }) => `language-${language}`}
`


//------------------------------------------------------------------------------
// Prevent forwarding unwanted props to HTML tags

const Code = tw("code", { noForward: ["language"] })`
  text-base
  font-mono
  text-gray-800
  bg-gray-200
  p-1
  ${({ language }) => `language-${language}`}
`
```
