import React from 'react';
import { useAppDispatch } from '../../hooks';
import { TodoItem } from '../../redux/models';
import {
  deleteTodo,
  renameTodo,
  todoChecked,
  updateContentInTodo,
} from '../../redux/slices/boardSlices';
import styles from './Todo.module.scss';

import { HiTrash, HiPencilSquare, HiPencil } from 'react-icons/hi2';

interface IProps {
  todo: TodoItem;
}

export const Todo: React.FC<IProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.todo_item} draggable onDrop={() => 1}>
      <h1>{todo.title}</h1>
      <button onClick={() => dispatch(renameTodo([todo.id, '123']))}>
        <HiPencil />
      </button>
      <button onClick={() => dispatch(updateContentInTodo([todo.id, 'Текст из формы']))}>
        <HiPencilSquare />
      </button>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>
        <HiTrash />
      </button>
      <input type={'checkbox'} onChange={() => dispatch(todoChecked(todo.id))} />
      <p
        className={
          todo.isChecked ? styles.todo_content + ' ' + styles.checked : styles.todo_content
        }>
        {todo.content}
      </p>
    </li>
  );
};
