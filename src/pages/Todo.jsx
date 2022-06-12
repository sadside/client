import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import doneImg from "../assets/images/Person=Mattew, Skin Tone=White, Posture=20 Like.svg";
import AddForm from "../components/addForm/AddForm";
import Menu from "../components/menu/Menu";
import TodoList from "../components/todoList/TodoList";
import "./styles/todo.scss";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
      console.log("ты не авторизован");
    } else {
      console.log("ты авторизован");

      getAllTodo("http://localhost:8000/api/todo/").then((data) => {
        setTodoList([...data]);
      });
    }
  }, []);

  async function getAllTodo(url, method = "GET", body = null) {
    setLoading(true);

    const request = await fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    const response = await request.json();
    setLoading(false);
    return response;
  }

  async function removeTodo(id) {
    setLoading(true);
    console.log(id);
    fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
      })
      .then(() => {
        console.log(todoList);
      });
  }

  function updateTodo(id, text, done) {
    return fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text, is_done: done }),
    });
  }

  const DoneBlock = () => {
    return (
      <div className={"flex items-center justify-center h-80 doneBlock"}>
        <div className={"flex items-center"}>
          <h2 className={"mr-8"}>Ты все сделал!</h2>
          <img src={doneImg} alt="" />
        </div>
      </div>
    );
  };

  const updateStatus = () => {
    getAllTodo("http://localhost:8000/api/todo/").then((data) => {
      setTodoList([...data]);
    });
  };

  const haveNotDone = todoList.filter((todo) => !todo.is_done).length;

  const content = loading ? null : (
    <div>
      {haveNotDone === 0 ? (
        <DoneBlock />
      ) : (
        <h2 className={"text-white mt-10 text-2xl"}>
          Задачи - {todoList.filter((item) => !item.is_done).length}
        </h2>
      )}
      <TodoList
        todoArr={todoList.filter((item) => !item.is_done)}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        update={updateStatus}
      />
      {todoList.length === 0 ? null : (
        <h2 className={"text-white mt-10 text-2xl"}>
          Выполненные задачи - {todoList.filter((item) => item.is_done).length}
        </h2>
      )}
      <TodoList
        todoArr={todoList.filter((item) => item.is_done)}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        update={updateStatus}
      />
    </div>
  );

  const addTodo = (text) => {
    setTodoList((prev) => [...prev, { text, is_done: false }]);

    getAllTodo(
      "http://localhost:8000/api/todo/",
      "POST",
      JSON.stringify({ text, is_done: false })
    ).then(updateStatus);
  };

  return (
    <>
      <Menu />
      <div className={"App"}>
        <div className={"wrap-todo"}>
          <h1 className={"text-white font-medium text-5xl my-20 text-center"}>
            Список задач
          </h1>
          <AddForm addTodo={addTodo} />
          {content}
        </div>
      </div>
    </>
  );
}

export default Todo;
