import React from "react";
import { useNavigate } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="not-found-container">
        <p className="not-found-message">페이지를 찾을 수 없습니다.</p>
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
