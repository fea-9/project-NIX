import React from "react";
import { AvatarPreview } from "../../components/AvatarPreview/AvatarPreview";
import { shallow } from "enzyme";

describe("Avatar preview", () => {
  const props = {
    srcAvatar: "urlavatar",
    fullName: "name",
    minimized: false
  };

  describe("Avatar preview initial render", () => {
    const avatarPreview = shallow(<AvatarPreview {...props} />);

    it("renders main container", () => {
      expect(avatarPreview.find(".profile-preview")).toHaveLength(1);
      expect(avatarPreview.find(".profile-preview_minimized")).toHaveLength(0);
    });

    it("renders container for image and icon", () => {
      expect(avatarPreview.find(".container-scale")).toHaveLength(1);
    });

    it("renders image wrapper", () => {
      expect(avatarPreview.find(".img-wrapper")).toHaveLength(1);
    });

    it("renders image", () => {
      expect(avatarPreview.find(".profile-preview__img")).toHaveLength(1);
    });

    it("renders image with props srcAvatar", () => {
      expect(avatarPreview.find(".profile-preview__img").prop("src")).toEqual(
        props.srcAvatar
      );
    });

    it("renders image with props width", () => {
      expect(avatarPreview.find(".settings-icon").prop("width")).toEqual(13);
    });

    it("renders image with props height", () => {
      expect(avatarPreview.find(".settings-icon").prop("height")).toEqual(13);
    });

    it("renders icon wrapper", () => {
      expect(avatarPreview.find(".profile-preview__icon")).toHaveLength(1);
    });

    it("renders icon", () => {
      expect(avatarPreview.find(".settings-icon")).toHaveLength(1);
    });

    it("renders paragraph", () => {
      expect(avatarPreview.find(".profile-preview__name")).toHaveLength(1);
      expect(avatarPreview.find(".profile-preview__name").text()).toBe(
        props.fullName
      );
    });
  });

  describe("Avatar preview renders minimized", () => {
    const nextProps = {
      ...props,
      minimized: true
    };

    const avatarPreview = shallow(<AvatarPreview {...nextProps} />);

    it("renders main container", () => {
      expect(avatarPreview.find(".profile-preview")).toHaveLength(1);
      expect(avatarPreview.find(".profile-preview_minimized")).toHaveLength(1);
    });

    it("renders container for image and icon", () => {
      expect(avatarPreview.find(".container-scale")).toHaveLength(1);
    });

    it("renders image wrapper", () => {
      expect(avatarPreview.find(".img-wrapper")).toHaveLength(1);
    });

    it("renders image", () => {
      expect(avatarPreview.find(".profile-preview__img")).toHaveLength(1);
    });

    it("renders image with props srcAvatar", () => {
      expect(avatarPreview.find(".profile-preview__img").prop("src")).toEqual(
        props.srcAvatar
      );
    });

    it("renders image with props width", () => {
      expect(avatarPreview.find(".settings-icon").prop("width")).toEqual(6);
    });

    it("renders image with props height", () => {
      expect(avatarPreview.find(".settings-icon").prop("height")).toEqual(6);
    });

    it("renders icon wrapper", () => {
      expect(avatarPreview.find(".profile-preview__icon")).toHaveLength(1);
    });

    it("renders icon", () => {
      expect(avatarPreview.find(".settings-icon")).toHaveLength(1);
    });

    it("renders paragraph", () => {
      expect(avatarPreview.find(".profile-preview__name")).toHaveLength(0);
    });
  });
});
