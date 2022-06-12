import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/Person=Mattew, Skin Tone=White, Posture=20 Like.svg";
import Menu from "../components/menu/Menu";
import Statistics from "../components/statistics/Statistics";
import useAuth from "../hooks/useAuth";
import "./styles/profile.scss";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [todosCount, setTodosCount] = useState(0);
  const [doneTodosCount, setDoneTodosCount] = useState(0);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  const { emailUser } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      fetch("http://localhost:8000/api/get-user-data/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setEmail(res.email);
          setUsername(res.username);
          setDoneTodosCount(res.todos_count);
          setTodosCount(res.not_done_to_count);
        });
    }
  }, []);

  const logout = () => {
    fetch("http://localhost:8000/api/auth/token/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Menu />
      <div className={"max-w-7xl m-auto"}>
        <div className="blocks mt-36">
          <div className="userInfo">
            <div className="profilePhoto">
              <img src={img} />
            </div>
            <div className={"userDecr"}>
              <div>
                <div className={"text-center text-xl my-4"}>Почта: {email}</div>
                <div className={"text-center text-xl"}>Логин: {username}</div>
              </div>
              <AnimatePresence>
                {edit && (
                  <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <input
                      type="text"
                      className={"edit-input"}
                      placeholder={"Новый email"}
                    />

                    <input
                      type="text"
                      className={"edit-input"}
                      placeholder={"Новый логин"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!edit ? (
                <div className={"btns"}>
                  <button onClick={handleEdit} className={"profile-btn"}>
                    Редактировать
                  </button>
                  <button onClick={logout} className={"logout"}>
                    Выйти
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={handleEdit} className={"save"}>
                    Загрузить фото
                  </button>

                  <button onClick={handleEdit} className={"save"}>
                    Сохранить
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={"user-base"}>
            <h2 className={"text-white font-medium text-center text-3xl mb-4"}>
              История активности
            </h2>
            <Statistics width={!edit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
