import Footer from "../../components/Footer/Footer";
import About from "../About_us/about_Us";

const Contact = () => {
	return (
		<div>
			<About mystyle={style} />
			<Footer />
		</div>
	);
};
const style = {
	border: ".1px solid grey",
};

export default Contact;
