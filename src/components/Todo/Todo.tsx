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

  const [inputText, setInputText] = React.useState('');
  const [targetForEdit, setTargetForEdit] = React.useState<
    [todoId?: string, targetForEdit?: 'content' | 'title']
  >([]);

  const onDragStartHandler: IOnDragEvents = (e) => {
    setTargetForEdit([]);
    setCurrentTodo(todo);
    console.log(e.currentTarget);
  };
  const onDragEndHandler: IOnDragEvents = (e) => {};
  const onDragLeaveHandler: IOnDragEvents = (e) => {
    // @ts-ignore, event target не видит style свойства :(
    e.currentTarget.style.background = 'white';
  };
  const onDragOverHandler: IOnDragEvents = (e) => {
    e.preventDefault();
    // @ts-ignore, event target не видит style свойства :(
    e.currentTarget.style.background = 'var(--blue) ';
  };
  const onDropHandler: IOnDragEvents = (e) => {
    e.preventDefault();
    setTargetForEdit([]);
    // @ts-ignore, event target не видит style свойства :(
    e.currentTarget.style.background = 'white';
    console.log(e.currentTarget);
    if (currentTodo) {
      dispatch(changeOrders([currentTodo, todo]));
    }
    setCurrentTodo(undefined);
  };

  const onChangeCheckboxHandler = () => {
    dispatch(todoChecked(todo.id));
  };

  const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const onClickSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (targetForEdit[1] === 'content' && targetForEdit[0] !== undefined) {
      dispatch(updateContentInTodo([targetForEdit[0], inputText]));
    }
    if (targetForEdit[1] === 'title' && targetForEdit[0] !== undefined) {
      dispatch(renameTodo([targetForEdit[0], inputText]));
    }
    setTargetForEdit([]);
    setInputText('');
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
      <button onClick={() => setTargetForEdit([todo.id, 'title'])}>
        <HiPencil />
      </button>
      <button onClick={() => setTargetForEdit([todo.id, 'content'])}>
        <HiPencilSquare />
      </button>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>
        <HiTrash />
      </button>
      <input
        className={styles.input_checkbox}
        type={'checkbox'}
        checked={todo.isChecked}
        onChange={() => onChangeCheckboxHandler()}
      />

      {targetForEdit[1] ? (
        <form>
          <input
            className={styles.input_text}
            type={'text'}
            value={inputText}
            onChange={(e) => onChangeTextHandler(e)}
            required={true}
            placeholder={
              targetForEdit[1] === 'content' ? 'Измените задачу...' : 'Переименуйте задачу...'
            }
          />
          <input
            className={styles.input_submit}
            type={'submit'}
            onClick={(e) => onClickSubmit(e)}
          />
        </form>
      ) : (
        ''
      )}
      <p
        className={
          todo.isChecked ? styles.todo_content + ' ' + styles.checked : styles.todo_content
        }>
        {todo.content}
      </p>
    </li>
  );
};
