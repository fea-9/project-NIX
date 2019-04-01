import React from 'react'

export const BurgerMenu = props => (
    <svg
        className="burger-menu-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16">
        <g transform="translate(0.09 0.458)">
            <rect
                width="16"
                height="2"
                rx="1"
                transform="translate(-0.09 -0.458)"
            />
            <rect
                width="16"
                height="2"
                rx="1"
                transform="translate(-0.09 13.542)"
            />
            <rect
                width="10"
                height="2"
                rx="1"
                transform="translate(-0.09 6.542)"
            />
        </g>
    </svg>
);