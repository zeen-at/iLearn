import React from "react";
import youtubeLogo from "../../assets/youtube.png";
import instagramLogo from "../../assets/instagram.png";
import twitterLogo from "../../assets/twitter.png";

const SocialMedia = () => {
	return (
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
	);
};

export default SocialMedia;
