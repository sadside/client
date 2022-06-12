import { Link } from "react-router-dom";
import "./menu.scss";

const Menu = () => {
  return (
    <div className={"wrap-menu"}>
      <div className={"menu m-auto"}>
        <Link to={"/"}>
          <h2>
            Todo <span className={"list"}>List</span>
          </h2>
        </Link>
        <div className={"links"}>
          {localStorage.getItem("token") !== null ? (
            <Link to={"/"} className={"link"}>
              Главная
            </Link>
          ) : null}
          {localStorage.getItem("token") === null ? (
            <Link to={"/register"} className={"link"}>
              Регистрация
            </Link>
          ) : null}
          {localStorage.getItem("token") === null ? (
            <Link to={"/login"} className={"link"}>
              Авторизация
            </Link>
          ) : null}
          {localStorage.getItem("token") !== null ? (
            <Link to={"/profile"} className={"link"}>
              Профиль
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Menu;
