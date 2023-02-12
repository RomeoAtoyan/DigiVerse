import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();

  const returnTo = () => {
    navigate(`${props.page}`);
  };

  return (
    <>
      <div className="back_button">
        <i onClick={returnTo} className="fa-solid fa-arrow-left"></i>
      </div>
    </>
  );
};

export default BackButton;
