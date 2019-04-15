import React from "react";
import { Loading } from "../../components/HOC/Loading";
import { mount } from "enzyme";

describe("Loading", () => {
  const props = {
    flag: false,
    children: React.createElement("div", { className: "children" })
  };

  describe("Loading with flag false", () => {
    const loading = mount(<Loading {...props} />);

    it("renders children", () => {
      expect(loading.find(".children")).toHaveLength(1);
    });

    it("NO renders spinner", () => {
      expect(loading.find(".spinner")).toHaveLength(0);
    });
  });

  describe("Loading with flag true", () => {
    const nextProps = {
      ...props,
      flag: true
    };

    const loading = mount(<Loading {...nextProps} />);

    it("NO renders children", () => {
      expect(loading.find(".children")).toHaveLength(0);
    });

    it("renders spinner", () => {
      expect(loading.find(".spinner")).toHaveLength(1);
    });
  });
});
