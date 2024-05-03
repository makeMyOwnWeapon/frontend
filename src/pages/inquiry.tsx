import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/public/navbar_default";
import "../styles/css/inquiry.css";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <br></br>
      <br></br>
      <div className="not-found-container">
      <br></br>
        <h1 className="not-found-title">404 Not Found</h1>
        <p className="not-found-message">
        <br></br>
          Oops! The page you're looking for doesn't exist.
        </p>
        <br></br>
        <br></br>
        <img
          className="not-found-image"
          src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcT7w8ghJuK7sAjR7DuDbfxR64WsexiDx8-tEsczukbLkguxpkkMHLPX2t5chRWRJcRE"
          alt="Cute Not Found"
        />
        <button className="go-back-button" onClick={goBack}>
          Go Back
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="not-found-container">
        <p className="not-found-message">We are kts5927, UkdongKim, 10kseok, jeemh, yunsejin</p>
        <img
            className="not-found-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuYlFidLek1_MFumIZa_Ag4ogZ4z8LbN1xQCO-y52mmWUInwIO"
            alt="Cute Not Found"
          />
      </div>
    </>
  );
};

export default NotFoundPage;
