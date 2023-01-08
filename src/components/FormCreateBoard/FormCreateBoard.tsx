import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { createBoard } from '../../redux/slices/boardSlices';
import styles from './FormCreateBoard.module.scss';
import {HiXCircle} from 'react-icons/hi2'

const boardColors = ['Стандарт', 'Красный', 'Синий', 'Желтый'];

export const FormCreateBoard = ({ setOpen }: any) => {
  const dispatch = useAppDispatch();

  const [inputValueText, setInputValueText] = useState('');
  const [selectValue, setSelectValue] = useState(boardColors[0]);

  const onClickSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    title: string,
  ): void => {
    e.preventDefault();
    dispatch(createBoard([title, selectValue]));
    setInputValueText('');
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
          value={inputValueText}
          onChange={(e) => setInputValueText(e.target.value)}
        />

        <input
          className={styles.input_submit}
          type="submit"
          value="Создать доску"
          onClick={(e) => onClickSubmit(e, inputValueText)}
        />
      </form>
    </div>
  );
};
