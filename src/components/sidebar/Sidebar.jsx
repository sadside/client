import React from "react";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className={"sidebar"}>
      <h2>Категории:</h2>
      <div className={"flex items-center my-2 wrap-category"}>
        <div className="circle"></div>
        <div className={"text-white text"}>Работа</div>
      </div>
    </div>
  );
};

export default Sidebar;
