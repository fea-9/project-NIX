import React, { Component } from 'react';

export default p => (
		<div className="arrow-icon">
			<svg onClick={p.click} xmlns="http://www.w3.org/2000/svg"
													width="9.856"
													height="6.182"
													viewBox="0 0 9.856 6.182">
				<path
							style={{
								fill: p.check ? "#4facfe" : "#989898",
								cursor: "pointer",
							 }}
							d="M5043.143,21.571H5053l-4.9,6.182Z"
							transform={
								 p.direct ? "translate(5053 27.755) rotate(180)"
								 	: "translate(-5043.143 -21.572)"
							}/>
			</svg>
		</div>
)
