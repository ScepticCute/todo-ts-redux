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
import styles from './Boards.module.scss';

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
          <button onClick={() => dispatch(deleteBoard(board.id))}>Удалить доску</button>
          <button onClick={() => dispatch(renameBoard([board.id, 'Текст из формы']))}>
            Изменить название
          </button>
          <button onClick={() => onClickNewTodo(board.id, 'Название', 'Содержание')}>
            Создать todo
          </button>
          <ul>
            {board.items.map((todo, i) => (
              <li key={i} className={styles.todo_item} draggable>
                <h1>{todo.title}</h1>
                <button onClick={() => dispatch(renameTodo([todo.id, '123']))}>
                  Изменить название
                </button>
                <input type={'checkbox'} onChange={() => dispatch(todoChecked(todo.id))} />
                <p
                  className={
                    todo.isChecked
                      ? styles.todo_content + ' ' + styles.checked
                      : styles.todo_content
                  }>
                  {todo.content}
                </p>
                <button onClick={() => dispatch(updateContentInTodo([todo.id, 'Текст из формы']))}>
                  Изменить контент
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
