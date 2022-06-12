import { CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import "./todoItem.scss";

const TodoItem = ({ text, removeTodo, id, updateTodo, isDone, update }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const [active, setActive] = useState(false);
  const [showAnimmation, setShowAnimmation] = useState(true);

  return (
    <motion.div
      className={showAnimmation ? "todoItem showAnimmation" : "todoItem"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <div
        className={isDone ? "checkBoxOn" : "checkBoxOff"}
        onClick={async () => updateTodo(id, editText, !isDone).then(update)}
      >
        <CheckOutlined
          style={{
            color: "#20212c",
            fontSize: 20,
          }}
        />
      </div>

      <div className={"flex items-center todo-main"}>
        {!edit ? (
          <div
            onClick={() => {
              setEdit(true);
            }}
            className={
              active || isDone
                ? "cursor-pointer w-96 taskText done"
                : "cursor-pointer w-96 taskText"
            }
          >
            <div className={"text-todo"}>{editText}</div>
          </div>
        ) : (
          <form
            action=""
            className={"m-0 p-0"}
            onSubmit={async (e) => {
              e.preventDefault();
              await updateTodo(id, editText, isDone);
              await update();
              setEdit(false);
            }}
          >
            <input
              type={"text"}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                setEdit(true);
              }}
              className={"editModal"}
            ></input>
          </form>
        )}
      </div>
      {edit ? (
        <div className={"editButtons"}>
          <button
            className={"removeBtn save"}
            onClick={async () => {
              await updateTodo(id, editText, isDone);
              await update();
              setEdit(false);
            }}
          >
            Сохранить
          </button>

          <button
            className={"removeBtn"}
            onClick={async (e) => {
              e.preventDefault();
              await removeTodo(id);
              update();
            }}
          >
            Удалить
          </button>
        </div>
      ) : null}
    </motion.div>
  );
};

export default TodoItem;
