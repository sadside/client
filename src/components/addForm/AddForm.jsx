import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./addForm.scss";

const AddForm = ({ addTodo }) => {
  const [textTodo, setTextTodo] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const ErrorMessage = ({ text }) => {
    return (
      <div
        className={
          "flex justify-center items-center py-4 errorMessage bg-white mt-12 mb-2 rounded"
        }
      >
        <div className={"text-2xl"}>{text}</div>
      </div>
    );
  };

  return (
    <>
      <div className={"flex wrapper items-center"}>
        <button
          onClick={(e) => {
            e.preventDefault();
            addTodo(textTodo);
            setTextTodo("");
          }}
        >
          <PlusCircleOutlined
            style={{
              color: "#fb76a3",
              fontSize: 40,
            }}
          />
        </button>
        <form
          action=""
          className="addform flex-1"
          onSubmit={handleSubmit((data) => {
            addTodo(data.todoText);
            reset();
          })}
        >
          <input
            type="text"
            className={"block flex-1 ml-7 addTask"}
            placeholder={"Добавить задачу"}
            {...register("todoText", {
              required: "Ты собрался делать ничего ?!",
            })}
          />
        </form>
      </div>
    </>
  );
};

export default AddForm;
