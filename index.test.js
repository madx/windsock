import React from "react"
import { render } from "@testing-library/react"
import { toHaveAttribute } from "@testing-library/jest-dom"

import tw from "./"

describe("Windsock", () => {
  it("should return one class", () => {
    const Component = tw.div`text-red-500`
    const { container } = render(<Component />)
    expect(container).toBeTruthy()
    expect(container.querySelector("div").className).toBe("text-red-500")
  })

  it("should return multiple class", () => {
    const Component = tw.div`text-red-500 border`
    let { container } = render(<Component />)
    expect(container).toBeTruthy()
    expect(container.querySelector("div").className).toBe("text-red-500 border")
  })

  it("should return multiple class with break lines", () => {
    const Component = tw.div`
      text-red-500
      flex 
     `
    let { container } = render(<Component />)
    expect(container).toBeTruthy()
    expect(container.querySelector("div").className).toBe("text-red-500 flex")
  })

  it("should return an existing Component", () => {
    const ExistingComponent = (props) => (
      <p className={`${props.className} text-red-500`} />
    )
    const Component = tw(ExistingComponent)`border`
    const { container } = render(<Component />)
    expect(container).toBeTruthy()
    expect(container.querySelector("p").className).toBe("border text-red-500")
  })

  it("should return a Component forwarding props", () => {
    const Component = tw("code")`
     font-mono
     ${({ language }) => `language-${language}`}
   `
    const { container } = render(<Component language="html" />)
    expect(container).toBeTruthy()
    expect(container.querySelector("code").className).toBe(
      "font-mono language-html"
    )
    expect(container.querySelector("code")).toHaveAttribute("language")
  })

  it("should return a Component without forwarding props", () => {
    const Component = tw("code", { noForward: ["language"] })`
     font-mono
     ${({ language }) => `language-${language}`}
   `
    const { container } = render(<Component language="html" />)
    expect(container).toBeTruthy()
    expect(container.querySelector("code").className).toBe(
      "font-mono language-html"
    )
    expect(container.querySelector("code")).not.toHaveAttribute("language")
  })
})
