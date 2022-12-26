import { State } from '../models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: State = {
  boards: [
    {
      title: 'Ваша первая доска дел!',
      id: uuidv4(),
      order: 0,
      items: [
        {
          title: 'Завершить это дело!',
          id: uuidv4(),
          content: 'Нажать на кнопку слева!',
          isChecked: false,
          order: 0,
        },
      ],
    },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<string>) => {
      let order = 0;
      state.boards.push({
        title: action.payload || `Доска ${order}`,
        id: uuidv4(),
        order: order,
        items: [
          {
            title: 'Переименуй меня!',
            id: uuidv4(),
            content: 'Нажать на кнопку слева!',
            isChecked: false,
            order: 0,
          },
        ],
      });
    },
    createTodo: (
      state,
      action: PayloadAction<[boardId: string, title: string, content: string]>,
    ) => {
      const findBoardIdx = (): number => {
        return state.boards.findIndex((board) => board.id === action.payload[0]);
      };

      state.boards[findBoardIdx()].items.push({
        title: 'Завершить это дело!',
        id: uuidv4(),
        content: 'Нажать на кнопку слева!',
        isChecked: false,
        order: 0,
      });
    },
    renameBoard: (state, action: PayloadAction<[boardId: string, newTitle: string]>) => {
      state.boards.forEach((board) => {
        board.id !== action.payload[0] || (board.title = action.payload[1]);
      });
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const boardIdx = state.boards.findIndex((board) => board.id === action.payload);
      state.boards.slice(boardIdx, 1);
      console.log(state.boards[boardIdx].id === action.payload);
      console.log(state.boards[boardIdx].id + '   ' + action.payload);
    },
    // !!!!!!!! Элемент из массива
    // !ПОЧИНИ! не удаляется.
    // !!!!!!!! filter не помог.
    renameTodo: (state, action: PayloadAction<[todoId: string, newTitle: string]>) => {
      state.boards.forEach((board) =>
        board.items.forEach((todo) => {
          todo.id !== action.payload[0] || (todo.title = action.payload[1]);
        }),
      );
    },
    updateContentInTodo: (state, action: PayloadAction<[todoId: string, newContent: string]>) => {
      state.boards.forEach((board) =>
        board.items.forEach((todo) => {
          todo.id !== action.payload[0] || (todo.content = action.payload[1]);
        }),
      );
    },
    todoChecked: (state, action: PayloadAction<string>) => {
      state.boards.forEach((board) =>
        board.items.forEach((todo) => {
          todo.id === action.payload[0] || (todo.isChecked = !todo.isChecked);
        }),
      );
    },
  },
});

export const {
  createBoard,
  deleteBoard,
  renameBoard,
  createTodo,
  renameTodo,
  updateContentInTodo,
  todoChecked,
} = boardsSlice.actions;
export default boardsSlice.reducer;
