import React from "react";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import Navbar from "../../components/navBar/navBar";
// import Navbar from "../../components/Navbar/Navbar";
import "./paymentSummary.css";
interface Props {
  title: string;
  price: string;
  imageUrl: string;
}

const PaymentSummaryPage: React.FC<Props> = ({ title, price, imageUrl }) => {
  return (
    <>
      <div className="payment_summary_page">
        <Navbar />
        <SubNavbar name={undefined} welcome={undefined} />
        <div className="payment_summary_general">
          <div className="payment_summary_header">
            <h1 className="payment_summary_header_text">Payment Summary</h1>
          </div>
          <div className="payment_summary_details">
            <img
              className="payment_summary_image"
              src={
                "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg"
              }
              alt={title}
            />
          </div>
          <div className="payment_summary_title">
            <h3 className="payment_summary_title_text">Title:{title}</h3>
          </div>
          <div className="payment_summary_price">
            <h3 className="payment_summary_price_text">Price: {price}</h3>
          </div>
          <div className="payment_summary_btn">
            <button className="payment_summary_button">Pay</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSummaryPage;
