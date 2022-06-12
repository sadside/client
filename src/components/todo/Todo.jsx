import React from "react";
import "./todo.scss";

const Todo = ({ text, date, number }) => {
  return (
    <div className={"todo"}>
      <h2>
        Todo <span>№{number}</span>
      </h2>
      <div>{text}</div>
      <div>
        <span className={"date"}>Дата добавления:</span> {date}
      </div>
    </div>
  );
};

export default Todo;
