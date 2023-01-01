import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Board, TodoItem } from '../../redux/models';
import {
  changeOrders,
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
  currentTodo: TodoItem | undefined;
  setCurrentTodo: React.Dispatch<React.SetStateAction<TodoItem | undefined>>;
}

interface IOnDragEvents {
  (e: React.DragEvent<HTMLLIElement>): void;
}

export const Todo: React.FC<IProps> = ({ todo, board, currentTodo, setCurrentTodo }) => {
  const dispatch = useAppDispatch();

  const onDragStartHandler: IOnDragEvents = (e) => {
    setCurrentTodo(todo);

    console.log('start');
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
  };
  const onDropHandler: IOnDragEvents = (e) => {
    e.preventDefault();
    // @ts-ignore, event target не видит style свойства :(
    e.target.style.background = 'white';
    if (currentTodo) {
      dispatch(changeOrders([currentTodo, todo]));
    } else if (!currentTodo) {
      console.error('!!!currentTodo === undefined!!!');
    }

    console.log('drop => ', todo);
    setCurrentTodo(undefined);
  };

  const onChangeCheckboxHandler = () => {
    dispatch(todoChecked(todo.id));
  };

  return (
    <li
      className={styles.todo_item}
      draggable
      onDragStart={(e) => onDragStartHandler(e)}
      onDragEnd={(e) => onDragEndHandler(e)}
      onDragLeave={(e) => onDragLeaveHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => onDropHandler(e)}>
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
      <input
        type={'checkbox'}
        checked={todo.isChecked}
        onChange={() => onChangeCheckboxHandler()}
      />
      <p
        className={
          todo.isChecked ? styles.todo_content + ' ' + styles.checked : styles.todo_content
        }>
        {todo.content}
      </p>
    </li>
  );
};
