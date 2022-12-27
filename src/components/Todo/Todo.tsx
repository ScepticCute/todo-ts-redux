import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Board, TodoItem } from '../../redux/models';
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
  board: Board;
}

interface IOnDragEvents {
  (e: React.DragEvent<HTMLLIElement>, todo?: TodoItem, board?: Board): void;
}

export const Todo: React.FC<IProps> = ({ todo, board }) => {
  const boards: Board[] = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  const [currentTodo, setCurrentTodo] = useState<TodoItem>();
  const [currentBoard, setCurrentBoard] = useState<Board>();

  const onDragStartHandler: IOnDragEvents = (e, todo, board) => {
    setCurrentTodo(todo);
    setCurrentBoard(board);
    console.log(todo, ' -- Старт');
  };
  const onDragEndHandler: IOnDragEvents = (e) => {};
  const onDragLeaveHandler: IOnDragEvents = (e) => {
    // @ts-ignore, event target не видит style свойства :(
    e.target.style.background = 'white';
  };
  const onDragOverHandler: IOnDragEvents = (e) => {
    e.preventDefault();
    // @ts-ignore, event target не видит style свойства :(
    e.target.style.background = 'var(--blue) ';
    console.log('over');
  };
  const onDropHandler: IOnDragEvents = (e, todo) => {
    e.preventDefault();
    // @ts-ignore, event target не видит style свойства :(
    e.target.style.background = 'white';

    console.log(todo, ' -- Дроп');
  };

  return (
    <li
      className={styles.todo_item}
      draggable
      onDragStart={(e) => onDragStartHandler(e, todo, board)}
      onDragEnd={(e) => onDragEndHandler(e)}
      onDragLeave={(e) => onDragLeaveHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => onDropHandler(e, todo, board)}>
      <h1>{todo.title}</h1>
      <button onClick={() => dispatch(renameTodo([todo.id, 'Новое название']))}>
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
        {todo.order}
      </p>
    </li>
  );
};
