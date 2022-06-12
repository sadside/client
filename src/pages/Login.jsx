import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Menu from "../components/menu/Menu";
import "./styles/login.scss";

export const ErrorMessage = ({ text }) => {
  return (
    <div
      className={
        "flex justify-center items-center p-3 bg-white mt-2 mb-2 rounded"
      }
    >
      <div className={"text-md"}>{text}</div>
    </div>
  );
};

const Login = () => {
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  }, []);

  const handleSubmitForm = (data) => {
    fetch("http://localhost:8000/api/auth/token/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: data.login, password: data.password }),
    }).then(async (res) => {
      if (res.status < 400) {
        const token = await res.json();
        await localStorage.setItem("token", token.auth_token);
        navigate("/");
      } else {
        setError("Неверный логин или пароль!");
      }
    });
  };

  return (
    <>
      <Menu />
      <div className={"loginWrap"}>
        <div className={"loginForm"}>
          <h2>Вход</h2>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <input
              type="text"
              placeholder={"Login"}
              {...register("login", {
                required: "Введите логин!",
              })}
            />
            <label>
              {errors?.login && (
                <ErrorMessage text={errors?.login?.message} key={1} />
              )}
            </label>
            <input
              type="password"
              placeholder={"Password"}
              {...register("password", {
                required: "Введите пароль!",
              })}
            />
            <label>
              {errors?.password && (
                <ErrorMessage text={errors?.password?.message} key={2} />
              )}
              {error.length > 0 ? <ErrorMessage text={error} key={3} /> : null}
            </label>
            <button
              className={"removeBtn save"}
              onClick={handleSubmit(handleSubmitForm)}
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
