const React = require("react")
const { create } = require("react-test-renderer")

const tw = require("./index.js").default

describe("Windsock", () => {
  it("should return one class", () => {
    const Component = tw.div`text-red-500`
    let wrapper = create(<Component />)
    const renderedComponent = wrapper.root.findByType("div")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("text-red-500")
  })

  it("should return multiple class", () => {
    const Component = tw.div`text-red-500 border`
    let wrapper = create(<Component />)
    const renderedComponent = wrapper.root.findByType("div")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("text-red-500 border")
  })

  it("should return multiple class with break lines", () => {
    const Component = tw.div`
      text-red-500
      flex 
     `
    let wrapper = create(<Component />)
    const renderedComponent = wrapper.root.findByType("div")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("text-red-500 flex")
  })

  it("should return an existing Component", () => {
    const ExistingComponent = (props) => (
      <p className={`${props.className} text-red-500`} />
    )
    const Component = tw(ExistingComponent)`border`
    const wrapper = create(<Component />)
    const renderedComponent = wrapper.root.findByType("p")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("border text-red-500")
  })

  it("should return a Component", () => {
    const Component = tw.yolo`text-red-500`
    const wrapper = create(<Component />)
    const renderedComponent = wrapper.root.findByType("yolo")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("text-red-500")
  })

  it("should return a Component forwarding props", () => {
    const Component = tw("code")`
        font-mono
        ${({ language }) => `language-${language}`}
      `
    const wrapper = create(<Component language="html" />)
    const renderedComponent = wrapper.root.findByType("code")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("font-mono language-html")
    expect(renderedComponent.props.language).toBe("html")
  })

  it("should return a Component without forwarding props", () => {
    const Component = tw("code", { noForward: ["language"] })`
        font-mono
        ${({ language }) => `language-${language}`}
      `
    const wrapper = create(<Component language="html" />)
    const renderedComponent = wrapper.root.findByType("code")
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.props.className).toBe("font-mono language-html")
    expect(renderedComponent.props.language).toBeFalsy()
  })
})
