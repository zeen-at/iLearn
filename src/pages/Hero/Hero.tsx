import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import tutorLogo from "../../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Hero = () => {
	const [show, setShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const toggleNav = () => {
		setIsOpen(!isOpen);
		// setShow(!show);
	};

	const ref = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		setShow(!show);
	};
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current !== null && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return (
		<div className="hero">
			<nav className="heroNavbar">
				<div className="brand-title">
					<Link to="/">
						<img src={tutorLogo} alt="logo" />
					</Link>
					<span>iLearn</span>
				</div>
				<div className="homepage-navbar-toggle">
					{" "}
					{isOpen ? (
						<div ref={ref}>
							<ImCross
								onClick={toggleNav}
								className="homepage-navbar-toggle-icon"
							/>
							<div className="navbar-li">
								<ul className="navbarLinkUl">
									<div className="buttonCardOne">
										<Link to="/sign-up">
											<a href="/sign-up">Get Started</a>
										</Link>
									</div>
									<li>
										<Link to="/login">Login</Link>
									</li>
									<li>
										<Link to="/contact_us">About Us</Link>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<FaBars
							onClick={toggleNav}
							className="homepage-navbar-toggle-icon"
						/>
					)}
				</div>{" "}
				<div className="navbar-links">
					<ul>
						<li>
							<Link to="/">Tutors</Link>
						</li>
						<li>
							<Link to="/contact_us">About Us</Link>
						</li>
						<span className="line"></span>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<div className="buttonCardOne">
							<Link to="/sign-up">
								<a href="/sign-up">Get Started</a>
							</Link>
						</div>
					</ul>
				</div>
			</nav>
			<div className="heroContent">
				<div className="firstCard">
					<h1>
						Find the best online <br />
						tutor for you.
					</h1>
				</div>
				<div className="heroSecondCard">
					<p>
						This app is great for those wanting immediate help with completing
						an assignment, <br /> preparing for a test or understanding a
						concept.
						<br /> I-learn is a good choice for high school and college students
						who want to <br /> be able to get specific help with assignments
						quickly and easily.
					</p>
				</div>

				<div className="buttonCard">
					<Link to="/sign-up">Get Started</Link>
				</div>
			</div>
		</div>
	);
};
export default Hero;
