import React from "react";
import Button from "./Button";
import Icon from "./icon";

export const BurgerButton = ({ isOpen, onClick }) =>
  isOpen ? (
    <Button onClick={onClick} className="btn-close" children="X" />
  ) : (
    <Button onClick={onClick} className="btn-burger">
      <Icon
        className="burger-menu-btn-mobile"
        type="burgerMenuIcon"
        width={15}
        height={16}
        viewBox="0 0 14 16"
      />
    </Button>
  );
