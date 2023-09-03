import React, { FC } from "react";
import "./Modal.css";
interface LayoutProps {
	children: React.ReactNode;
}
const Modal: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="Modal-Area">
			<div className="Modal-content">
				<div></div>
				<div>{children}</div>
			</div>
		</div>
	);
};
export default Modal;
