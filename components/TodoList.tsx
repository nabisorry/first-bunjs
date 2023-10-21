import React from "react";
import { TodosResponse } from "../types";

type TodoListProps = {
  list: TodosResponse;
};

const TodoList = ({ list }: TodoListProps) => {
  return (
    <ul>
      {list.map(({ id, title }) => (
        <li key={id}>
          <a href={`todos/${id}`}>{title}</a>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
