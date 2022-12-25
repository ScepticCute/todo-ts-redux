import React from 'react';
import { useAppSelector } from '../../hooks';
import styles from './Boards.module.scss';

export const Boards = () => {
  const boards = useAppSelector((state) => state.boards);

  return (
    <div className={styles.wrapper}>
      {boards.map((board, i) => (
        <div className={styles.board} key={i} draggable>
          <h1>{board.title}</h1>
          <ul>
            {board.items.map((todo, i) => (
              <li key={i} className={styles.todo_item}>
                <h1>{todo.title}</h1>
                <input type={'checkbox'} />
                <p> {todo.content} </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
