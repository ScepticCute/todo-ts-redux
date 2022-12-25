import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TodoItem = {
  title: string;
  id: string;
  order: number;
  content: string;
  isCompleted: boolean;
};

export type Boards = {
  title: string;
  id: string;
  order: number;
  items: TodoItem[] | [];
};

const initialState: Boards[] = [
  {
    title: 'Ваша первая доска дел!',
    id: uuidv4(),
    order: 0,
    items: [
      {
        title: 'Завершить это дело!',
        id: uuidv4(),
        content: 'Нажать на кнопку справа!',
        isCompleted: false,
        order: 0,
      },
    ],
  },
];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<string>) => {
      let order = 0;
      state.push({
        title: action.payload || `Доска ${order}`,
        id: uuidv4(),
        order: 0,
        items: [],
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { createBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
