import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createTodo,
  deleteBoard,
  renameBoard,
  renameTodo,
  todoChecked,
  updateContentInTodo,
} from '../../redux/slices/boardSlices';
import { Todo } from '../Todo/Todo';
import styles from './Boards.module.scss';

import { HiTrash, HiPencilSquare, HiPencil } from 'react-icons/hi2';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const onClickNewTodo = (boardId: string, title: string, content: string) => {
    dispatch(createTodo([boardId, title, content]));
  };

  // const onDragStartHandler = (e) => {};
  // const onDragExitHandler = (e) => {};
  // const onDragOverHandler = (e) => {};
  // const onDragEndHandler = (e) => {};
  // const onDropHandler = (e) => {};

  return (
    <div className={styles.wrapper}>
      {boards.map((board, i) => (
        <div className={styles.board} key={i} draggable>
          <h1>{board.title}</h1>
          <button onClick={() => dispatch(renameBoard([board.id, 'Текст из формы']))}>
            <HiPencil />
          </button>
          <button onClick={() => onClickNewTodo(board.id, 'Название', 'Содержание')}>
            <HiPencilSquare />
          </button>
          <button onClick={() => dispatch(deleteBoard(board.id))}>
            <HiTrash />
          </button>
          <ul className={styles.list}>
            {board.items.map((todo, i) => (
              <Todo todo={todo} key={i} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
