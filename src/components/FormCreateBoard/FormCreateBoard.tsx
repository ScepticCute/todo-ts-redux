import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { createBoard } from '../../redux/slices/boardSlices';
import styles from './FormCreateBoard.module.scss';

export const FormCreateBoard = ({ setOpen }: any) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState('');

  const onClickSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    title: string,
  ): void => {
    e.preventDefault();
    dispatch(createBoard(title));
    setInputValue('');
    setOpen(false);
  };

  return (
    <div className={styles.blackout_wrapper}>
      <div className={styles.wrapper}>
        <button
          onClick={() => {
            setOpen();
          }}>
          Закрыть окно
        </button>
        <form className={styles.wrapper}>
          <input
            type="text"
            placeholder="Введите название доски..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type="submit"
            value="Создать доску задач"
            onClick={(e) => onClickSubmit(e, inputValue)}
          />
        </form>
      </div>
    </div>
  );
};
