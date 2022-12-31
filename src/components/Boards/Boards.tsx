import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeOrders, createTodo, deleteBoard, renameBoard } from '../../redux/slices/boardSlices';
import { Todo } from '../Todo/Todo';
import styles from './Boards.module.scss';

import { HiTrash, HiPencilSquare, HiPencil } from 'react-icons/hi2';
import { Board, TodoItem } from '../../redux/models';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const [currentTodo, setCurrentTodo] = useState<TodoItem>();

  const onClickNewTodo = (boardId: string, title: string, content: string) => {
    dispatch(createTodo([boardId, title, content]));
  };

  const sortFunc = (a: TodoItem | Board, b: TodoItem | Board) => {
    return a.order - b.order;
  };

  return (
    <div className={styles.wrapper}>
      {boards
        .slice()
        // .sort(sortFunc) на случай, если решу делать драг-доски
        .map((board, i) => (
          <div className={styles.board} key={i}>
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
              {board.items
                .slice()
                .sort(sortFunc)
                .map((todo, i) => (
                  <Todo
                    todo={todo}
                    board={board}
                    key={i}
                    currentTodo={currentTodo}
                    setCurrentTodo={setCurrentTodo}
                  />
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
};
