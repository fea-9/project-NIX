import React from "react";
import { PageTemplate } from "../../components/Templates/PageTemplate";
import { shallow } from "enzyme";

describe("Page template", () => {
  describe("Page template initial render", () => {
    const props = {
      header: React.createElement("Header"),
      sidebar: React.createElement("Sidebar"),
      content: React.createElement("Content")
    };

    const pageTemplate = shallow(<PageTemplate {...props} />);

    it("renders <Helmet />", () => {
      expect(pageTemplate.find("HelmetWrapper")).toHaveLength(1);
    });

    it("renders aside", () => {
      expect(pageTemplate.find("aside")).toHaveLength(1);
    });

    it("renders header", () => {
      expect(pageTemplate.find("header")).toHaveLength(1);
    });

    it("renders div for content", () => {
      expect(pageTemplate.find(".main__container__content")).toHaveLength(1);
    });

    it("renders header with props", () => {
      expect(pageTemplate.find("header").contains(props.header)).toEqual(true);
    });

    it("renders aside with props", () => {
      expect(pageTemplate.find("aside").contains(props.sidebar)).toEqual(true);
    });

    it("renders div for content with props", () => {
      expect(
        pageTemplate.find(".main__container__content").contains(props.content)
      ).toEqual(true);
    });
  });

  describe("Page template NO header", () => {
    const props = {
      sidebar: React.createElement("Sidebar"),
      content: React.createElement("Content")
    };

    const pageTemplate = shallow(<PageTemplate {...props} />);

    it("not render <header>", () => {
      expect(pageTemplate.find("header")).toHaveLength(0);
    });

    it("renders <Helmet />", () => {
      expect(pageTemplate.find("HelmetWrapper")).toHaveLength(1);
    });

    it("renders <aside>", () => {
      expect(pageTemplate.find("aside")).toHaveLength(1);
    });

    it("renders <div> for content", () => {
      expect(pageTemplate.find(".main__container__content")).toHaveLength(1);
    });

    it("renders aside with props", () => {
      expect(pageTemplate.find("aside").contains(props.sidebar)).toEqual(true);
    });

    it("renders <div> for content with props", () => {
      expect(
        pageTemplate.find(".main__container__content").contains(props.content)
      ).toEqual(true);
    });
  });

  describe("Page template NO sidebar", () => {
    const props = {
      header: React.createElement("Header"),
      content: React.createElement("Content")
    };

    const pageTemplate = shallow(<PageTemplate {...props} />);

    it("not render <aside>", () => {
      expect(pageTemplate.find("aside")).toHaveLength(0);
    });

    it("renders <Helmet />", () => {
      expect(pageTemplate.find("HelmetWrapper")).toHaveLength(1);
    });

    it("renders <header>", () => {
      expect(pageTemplate.find("header")).toHaveLength(1);
    });

    it("renders <div> for content", () => {
      expect(pageTemplate.find(".main__container__content")).toHaveLength(1);
    });

    it("renders header with props", () => {
      expect(pageTemplate.find("header").contains(props.header)).toEqual(true);
    });

    it("renders <div> for content with props", () => {
      expect(
        pageTemplate.find(".main__container__content").contains(props.content)
      ).toEqual(true);
    });
  });
});
