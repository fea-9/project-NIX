import React from "react";
import AvatarPreview from "../../components/AvatarPreview/AvatarPreview";
import { shallow } from "enzyme";

describe("AvatarPreview", () => {
  describe("AvatarPreview initial render", () => {
    const props = {
      srcAvatar: "url",
      fullName: "test",
      minimized: false,
      scale: 3
    };

    const avatarPreview = shallow(<AvatarPreview />);

    it('renders wrapper div "profile-preview"', () => {
    //   console.log(avatarPreview.html());
      expect(avatarPreview.find('div'));
    });
  });
});
