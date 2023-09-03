import React from "react";
import "./Footer.css";
import footerLogo from "../../assets/footerImage.png";
import SocialMedia from "../SocialMedia/SocialMedia";
import youtubeLogo from "../../assets/youtube.png";
import instagramLogo from "../../assets/instagram.png";
import twitterLogo from "../../assets/twitter.png";

const Footer = () => {
	return (
		<div className="footer">
			{/* <div className="divider"></div> */}
			<div className="footerGroup">
				<div>
					<h4>
						<span>
							<img src={footerLogo} alt="footerImage" width="20em"/>
						</span>
						<span id="footerText">iLearn </span>
					</h4>
				</div>
			</div>
			<div className="footer-allRightsContainer">
				<div className="footerHr">
					<hr style={{ border: "1px solid #F5FAFA", opacity: "0.2" }} />
				</div>
				<div className="footer-All-rightsFlexContainer">
					<div className="footer-AllRightsReserved">
						<h4 id="reserved">© 2022 iLearn. All rights reserved</h4>
					</div>
					<div id="footerHolder">
						<div className="socialImage">
							<a href="#">
								<img
									src={instagramLogo}
									alt="instagram-icon"
									id="socialIcons"
									width="25px"
								/>
							</a>
						</div>
						<div className="socialImage">
							<a href="#">
								<img
									src={twitterLogo}
									alt="twitter-icon"
									id="socialIcons"
									width="25px"
								/>
							</a>
						</div>
						<div className="socialImage">
							<a href="#">
								<img
									src={youtubeLogo}
									alt="youtube-icon"
									id="socialIcons"
									width="25px"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
