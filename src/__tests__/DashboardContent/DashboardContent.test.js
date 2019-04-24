import React from "react";
import { shallow } from "enzyme";

import { DashboardContent } from "../../components/DashboardContent/DashboardContent";

describe("DashboardContent ", () => {
  describe("DashboardContent initial render", () => {
    const props = {
      mobile: false,
      data:  [],
      graph: {
          initial: true
      }
    };
    const dash = shallow(<DashboardContent {...props} />);
    it("render main element", () => {
      console.log(dash.debug());
      expect(dash.find(".dashboard-main")).toHaveLength(1);
    });
  });
});
