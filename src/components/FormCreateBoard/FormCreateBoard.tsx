import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { createBoard } from '../../redux/slices/boardSlices';
import styles from './FormCreateBoard.module.scss';
import {HiXCircle} from 'react-icons/hi2'

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
    <div className={styles.wrapper}>
      <button
        className={styles.close_button}
        onClick={() => {
          setOpen();
        }}>
        <HiXCircle />
      </button>
      <form className={styles.form}>
        <input
        className={styles.input_text}
          type="text"
          placeholder="Введите название доски..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
        className={styles.input_submit}
        type="submit"
          value="Создать доску задач"
          onClick={(e) => onClickSubmit(e, inputValue)}
        />
      </form>
    </div>
  );
};
