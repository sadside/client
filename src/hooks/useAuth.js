import { useState } from "react";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [todosCount, setTodosCount] = useState(0);
  const [doneTodosCount, setDoneTodosCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const token = localStorage.getItem("token");

  fetch("http://localhost:8000/api/get-user-data/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.status < 400) {
        setIsAuth(true);
        return res.json();
      } else {
        setIsAuth(false);
        return null;
      }
    })
    .then((res) => {
      setEmail(res.email);
      setUsername(res.username);
      setDoneTodosCount(res.todos_count);
      setTodosCount(res.not_done_to_count);
    });

  return {
    email,
    username,
    todosCount,
    doneTodosCount,
    isAuth,
  };
};

export default useAuth;
