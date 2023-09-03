import StudentHistoryPage from "../../components/studentHistoryPage/studentHistoryPage";

import ResetPassword from "../ResetPassword/resetPassword";
import SetNewPassword from "../ResetPassword/setNewPassword";

const Home = () => {
	return (
		<div>
			<StudentHistoryPage />
			<ResetPassword />
			<SetNewPassword />
		</div>
	);
};

export default Home;
