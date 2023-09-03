import React from "react";
import { Buttons } from "../../utils/Interfaces/index.dto";


const Button = ({ type, onClick, className, title }: Buttons) => {
	return (
		<div>
			<button type={type} onClick={onClick} className={className}>
				{title}
			</button>
		</div>
	);
};

export default Button;
