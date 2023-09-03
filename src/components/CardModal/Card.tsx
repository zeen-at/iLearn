import React, { FC } from "react";
import "./Card.css";
interface LayoutProps {
	children: React.ReactNode;
}
const Card: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="Card-Area">
			{" "}
			<div className="noti_p">{children}</div>{" "}
		</div>
	);
};
export default Card;
