import TodoItem from "../todoItem/TodoItem";

const DoneTodoList = ({ todoArr, removeTodo, updateTodo, update }) => {
  return (
    <div className={"mt-4"}>
      {todoArr.reverse().map((todo) => {
        if (todo.is_done) {
          return (
            <TodoItem
              text={todo.text}
              key={todo.id}
              removeTodo={removeTodo}
              id={todo.id}
              updateTodo={updateTodo}
              isDone={true}
              update={update}
            />
          );
        }
      })}
    </div>
  );
};

export default DoneTodoList;
