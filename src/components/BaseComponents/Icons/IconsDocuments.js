import React from 'react'

export const CheckedIcon = props => (
    <svg
        className="checked-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="19.382"
        height="12.787"
        viewBox="0 0 19.382 12.787"
    >
        <g
            transform="translate(-3447.048 -6449.159)"
        >
            <g
                transform="translate(3447.049 6449.159)"
            >
                <path  d="M19.032.351h0A1.188,1.188,0,0,0,18.186,0h0a1.19,1.19,0,0,0-.847.351L7.8,9.892,2.045,4.136a1.2,1.2,0,0,0-1.7,1.7l6.6,6.6a1.2,1.2,0,0,0,1.695,0L12.409,8.67l.021-.02,6.6-6.6A1.2,1.2,0,0,0,19.032.351Z"
                       transform="translate(0 0)"
                />
            </g>
        </g>
    </svg>
);

export const ArrowUpIcon = (className = "arrow-icon", props) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="9.858" height="6.184"
        viewBox="0 0 9.858 6.184">
        <path
            d="M5043.143,21.571H5053l-4.9,6.184Z"
            transform="translate(5053 27.755) rotate(180)"
        />
    </svg>
);

export const ArrowDownIcon = (className = "arrow-icon", props) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="9.856"
        height="6.182"
        viewBox="0 0 9.856 6.182">
        <path
            d="M5043.143,21.571H5053l-4.9,6.182Z"
            transform="translate(-5043.143 -21.571)"
        />
    </svg>
);