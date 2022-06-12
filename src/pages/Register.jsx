import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Menu from "../components/menu/Menu";
import { ErrorMessage } from "./Login";
import "./styles/login.scss";

const Register = () => {
  const [error, setError] = useState("");
  const [code, setCode] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/profile");
    }
  }, []);

  const handleSubmitForm = async (data) => {
    console.log(data);

    await fetch("http://localhost:8000/api/auth/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: data.login,
        email: data.email,
        password: data.password,
      }),
    });

    fetch("http://localhost:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: data.login,
        password: data.password,
        email: data.email,
      }),
    }).then(async (res) => {
      if (res.status === 200 || res.status === 201) {
        // const token = await res.json();
        // localStorage.setItem("token", token.token);
        // navigate("/");
        // reset();
        setCode(true);
      } else if (res.status === 400) {
        setError("Пользователь с таким логином или email'ом уже существует!");
      }
    });
  };

  return (
    <>
      <Menu />
      <div className={"loginWrap"}>
        <div className={"loginForm"}>
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <input
              type="text"
              placeholder={"Login"}
              {...register("login", {
                required: "Введите логин",
                minLength: {
                  value: 3,
                  message: "Минимальная длина 3 символа!",
                },
              })}
            />

            <label>
              {errors?.login && <ErrorMessage text={errors?.login?.message} />}
            </label>

            <input
              type="text"
              placeholder={"Email"}
              {...register("email", {
                required: "Введите email",
                minLength: {
                  value: 3,
                  message: "Минимальная длина 3 символа!",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Введите корректный email",
                },
              })}
            />
            <label>
              {errors?.email && <ErrorMessage text={errors?.email?.message} />}
            </label>
            <input
              type="password"
              placeholder={"Password"}
              {...register("password", {
                required: "Введите пароль",
                minLength: {
                  value: 8,
                  message: "Минимальная длина 8 символов!",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
                  message:
                    "Пароль слишком простой! Пароль должен содержать не менее восьми символов, включая хотя бы одно число, и включает в себя как нижние, так и прописные буквы и специальные символы. ",
                },
              })}
            />

            <AnimatePresence>
              {code && (
                <motion.div
                  style={{ overflow: "hidden" }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className={"w-96 text-white"}>
                    На вашу почту было отправлено письмо с кодом для
                    подтверждения регистрации.
                  </p>
                  <input
                    type="text"
                    className={"edit-input"}
                    placeholder={"Код с почты"}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <label>
              {errors?.password && (
                <ErrorMessage text={errors?.password?.message} />
              )}
              {error.length > 0 ? <ErrorMessage text={error} /> : null}
            </label>
            <button
              className={"removeBtn save"}
              onClick={handleSubmit(handleSubmitForm)}
            >
              Регистрация
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
