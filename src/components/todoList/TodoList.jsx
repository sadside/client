import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";

const TodoList = ({ todoArr, removeTodo, updateTodo, update }) => {
  return (
    <div className={"mt-4"}>
      {todoArr.reverse().map((todo) => {
        return (
          <TodoItem
            text={todo.text}
            removeTodo={removeTodo}
            id={todo.id}
            updateTodo={updateTodo}
            update={update}
            isDone={todo.is_done}
            key={todo.id}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
