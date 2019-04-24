import React from "react";
import { Social } from "../../components/Social/Social";
import { shallow } from "enzyme";

describe("Social", () => {
  describe("Social initial renders", () => {
    const props = {
      minimized: false
    };

    const social = shallow(<Social {...props} />);

    it("renders list", () => {
      expect(social.find(".social-list")).toHaveLength(1);
      expect(social.find(".social-list_minimized")).toHaveLength(0);
    });

    it("renders list-item", () => {
      expect(social.find(".social-list-item")).toHaveLength(3);
    });

    it("renders links", () => {
      expect(social.find("a")).toHaveLength(3);
    });

    it("renders Icons", () => {
      expect(social.find(".social-icon")).toHaveLength(3);
    });

    it("renders Icon youtube", () => {
      expect(social.find(".youtube-icon")).toHaveLength(1);
    });
    it("renders Icon facebbok", () => {
      expect(social.find(".facebook-icon")).toHaveLength(1);
    });
    it("renders Icon twitter", () => {
      expect(social.find(".twitter-icon")).toHaveLength(1);
    });
  });

  describe("Social minimized renders", () => {
    const props = {
      minimized: true
    };

    const social = shallow(<Social {...props} />);

    it("renders list", () => {
      expect(social.find(".social-list")).toHaveLength(1);
      expect(social.find(".social-list_minimized")).toHaveLength(1);
    });

    it("renders list-item", () => {
      expect(social.find(".social-list-item")).toHaveLength(3);
    });

    it("renders links", () => {
      expect(social.find("a")).toHaveLength(3);
    });

    it("renders Icons", () => {
      expect(social.find(".social-icon")).toHaveLength(3);
    });

    it("renders Icon youtube", () => {
      expect(social.find(".youtube-icon")).toHaveLength(1);
    });
    it("renders Icon facebbok", () => {
      expect(social.find(".facebook-icon")).toHaveLength(1);
    });
    it("renders Icon twitter", () => {
      expect(social.find(".twitter-icon")).toHaveLength(1);
    });
  });
});
