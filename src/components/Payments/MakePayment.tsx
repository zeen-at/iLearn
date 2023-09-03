import React, { useEffect, useState } from "react";
import { Course } from "../../utils/Interfaces/index.dto";
import { CourseModel } from "../../pages/courseDetails/interface";
import Modal from "antd/es/modal/Modal";
import { useAuth } from "../../useContext";

import PaystackPop from "@paystack/inline-js";
import { async } from "@firebase/util";
import { apiGet, apiPost } from "../../utils/api/axios";
import { string } from "prop-types";
// import Modal from "react-responsive-modal";
const MakePayment = ({
	course,
	openModal,
	closeModal,
	email,
}: {
	course: CourseModel;
	openModal: boolean;
	closeModal: () => void;
	email: string;
}) => {
	const [usermail, setUserEmail] = useState(email);
	const { isPaid, setIsPaid, checkIsPaid } = useAuth();

	// const [isPaid, setIsPaid] = useState(false);
	const changeMail = (e: any) => {
		setUserEmail(e.target.value);
	};

	// const checkIsPaid = async () => {
	// 	try {
	// 		const response = await apiGet(`/users/student/courses/${course.id}`);
	// 		if (response.data.message === "course found") {
	// 			setIsPaid(true);
	// 		}
	// 	} catch (error) {
	// 		//   console.log(error);
	// 	}
	// };

	useEffect(() => {
		return () => {
			void checkIsPaid(course.id);
		};
	}, [course]);
	// payment for paystack

	const handlePayment = async () => {
		try {
			const paystack = new PaystackPop();
			await paystack.newTransaction({
				key: import.meta.env.VITE_PAYSTACK_PKEY,
				email: usermail,
				amount: Number(course?.pricing) * 100,
				onSuccess: async (transaction: any) => {
					closeModal();
					try {
						const response = await apiPost(
							`/users/payments/${transaction.reference}`,
							{
								courseId: course.id,
							}
						);
						setIsPaid(true);
						console.log(response);
					} catch (error) {
						console.log(error);
					}

					// Payment complete! Reference: transaction.reference
					// window.alert(JSON.stringify(transaction));
					console.log(transaction);
				},
				onCancel: () => {
					setIsPaid(false);
					closeModal;
					// user closed popup
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Modal
				title={isPaid === true ? "you have paid already" : "Confirm Details"}
				okButtonProps={{
					size: "large",
					style: { width: "100%", backgroundColor: "#fd2959" },
					disabled: isPaid as boolean,
				}}
				okText={"Make Payment"}
				onOk={async () => await handlePayment()}
				onCancel={closeModal}
				cancelButtonProps={{ style: { display: "none" } }}
				open={openModal}
			>
				<br />
				<h2> {course?.title}</h2>
				<br />
				<div>
					<label>
						<h3>Email</h3>{" "}
						<p style={{ color: "orange" }}>
							you could change your email if you wish
						</p>
					</label>
					<input value={usermail} onChange={changeMail}></input>
				</div>

				<h1>₦ {Number(course?.pricing).toLocaleString()}</h1>
				{isPaid === true && (
					<p style={{ color: "red" }}>you have Already paid for this course</p>
				)}
			</Modal>
		</div>
	);
};

export default MakePayment;
