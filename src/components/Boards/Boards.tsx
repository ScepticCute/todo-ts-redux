import { useAppDispatch, useAppSelector } from '../../hooks';
import { createTodo, deleteBoard, renameBoard } from '../../redux/slices/boardSlices';
import { Todo } from '../Todo/Todo';
import styles from './Boards.module.scss';

import { HiTrash, HiPencilSquare, HiPencil } from 'react-icons/hi2';
import { TodoItem } from '../../redux/models';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const onClickNewTodo = (boardId: string, title: string, content: string) => {
    dispatch(createTodo([boardId, title, content]));
  };

  const sortTodos = (a: TodoItem, b: TodoItem): number => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    return 1;
  };

  return (
    <div className={styles.wrapper}>
      {boards.map((board, i) => (
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
              .slice() // Используется для фикса typeerror
              .sort(sortTodos)
              .map((todo, i) => (
                <Todo todo={todo} board={board} key={i} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
