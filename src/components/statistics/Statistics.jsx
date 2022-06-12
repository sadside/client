import React from "react";
import Todo from "../todo/Todo";
import "./statistics.scss";

const Statistics = ({ width }) => {
  return (
    <div
      className={"max-w-7xl all-todo-wrapper mx-auto "}
      style={width ? { height: 400 } : { height: 640 }}
    >
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
      <Todo text={"Сделать домашку"} date={"22.05.2022"} />
    </div>
  );
};

export default Statistics;
