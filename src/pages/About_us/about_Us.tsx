import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "./about_Us.css";
import tutorLogo from "../../assets/logo.png";



const About = ({ mystyle }: any) => {
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
			<nav className="navbar">
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
				<div className="card1">
					<h1>OUR TEAM</h1>
				</div>

				<div>
					<p>
						We are made up of <span id="num">18</span> team members by names:{" "}
					</p>
					<p id="us">
						Samuel Adigun, <span id="naming">Ifiok Inyang, </span> Charles
						Chijuka, <br /> Chiemeka Elumeziem,
						<span id="naming">
							Kosisochukwu Chinweuba, <br />
						</span>{" "}
						Zinat Sanni, Olaitan Olanrewaju,{" "}
						<span id="naming">Victor Olufade</span>
						<br />
						Oluwatobiloba Akinrimisi, Mercy Ogbenjuwa, Theresa Oyim,
						<br /> <span id="naming">Oluwaseyi Makinde</span>, Samuel Ajalode,
						Kingsley Ogbonnaya, <br />
						Mustapha Muhammed,
						<span id="naming">Daniel Iwegbue</span> Abdullahi Aliyu
					</p>
				</div>
			</div>
		</div>
	);
};
export default About;
