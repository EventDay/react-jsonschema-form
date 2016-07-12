import React from "react";
import { expect } from "chai";

import TitleField from "../src/components/fields/TitleField";
import { createSandbox, createComponent } from "./test_utils";

describe("TitleField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // For some reason, stateless components needs to be wrapped into a stateful
  // one to be rendered into the document.
  class TitleFieldWrapper extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <TitleField {...this.props} />;
    }
  }

  it("should return a legend", () => {
    const props = {
      title: "Field title",
      required: true
    };
    const {node} = createComponent(TitleFieldWrapper, props);

    expect(node.tagName).eql("LEGEND");
  });

  it("should have the expected id", () => {
    const props = {
      title: "Field title",
      required: true,
      id: "sample_id"
    };
    const {node} = createComponent(TitleFieldWrapper, props);

    expect(node.id).eql("sample_id");
  });

  it("should denote an optional field", () => {
    const props = {
      title: "Field title",
      required: false
    };
    const {node} = createComponent(TitleFieldWrapper, props);

    expect(node.querySelector(".field-optional").textContent).eql("- Optional");
  });

  it("should add an asterisk to the title, when field is required", () => {
    const props = {
      title: "Field title",
      required: true
    };
    const {node} = createComponent(TitleFieldWrapper, props);

    expect(node.textContent).eql(props.title);
  });
});
