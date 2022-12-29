import { State, TodoItem } from '../models';
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
      state.boards.forEach((board) => {
        if (board.order >= order) {
          order = board.order + 1;
        }
      });

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
          {
            title: 'И меня тоже!',
            id: uuidv4(),
            content: 'Нажать на кнопку слева!',
            isChecked: false,
            order: 1,
          },
        ],
      });
    },
    renameBoard: (state, action: PayloadAction<[boardId: string, newTitle: string]>) => {
      state.boards.forEach((board) => {
        board.id !== action.payload[0] || (board.title = action.payload[1]);
      });
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const boardIdx = state.boards.findIndex((board) => board.id === action.payload);
      state.boards.splice(boardIdx, 1);
    },
    createTodo: (
      state,
      action: PayloadAction<[boardId: string, title: string, content: string]>,
    ) => {
      let order = 0;
      state.boards.forEach((board) => {
        if (board.id === action.payload[0]) {
          board.items.forEach((todo) => {
            if (todo.order >= order) order = todo.order + 1;
          });
        }
      });
      const findBoardIdx = (): number => {
        return state.boards.findIndex((board) => board.id === action.payload[0]);
      };

      state.boards[findBoardIdx()].items.push({
        title: 'Завершить это дело!',
        id: uuidv4(),
        content: 'Нажать на кнопку слева!',
        isChecked: false,
        order: order,
      });
    },
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
          todo.id !== action.payload || (todo.isChecked = !todo.isChecked);
        }),
      );
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      let boardIdx = 0;
      let todoIdx = 0;
      state.boards.forEach((board, i) =>
        board.items.forEach((todo, j) => {
          if (todo.id === action.payload) {
            boardIdx = i;
            todoIdx = j;
          }
        }),
      );
      state.boards[boardIdx].items.splice(todoIdx, 1);
    },
    setCurrentTodo: (state, action: PayloadAction<TodoItem>) => {
      // Костыль из-за неправильной архитектуры приложения.
      // Нужно было прокинуть с борды пропсом в туду сетСтейтКаррентТуду
      // и уже от этого двигаться.
      // Я очень устал с этим работать. Слишком много неправильных решений было выбрано.
      // Желательно перестроить всю логику с нуля с чистой головой.
    },

    changeOrders: (state, action: PayloadAction<[currentTodo: TodoItem, eventTodo: TodoItem]>) => {
      // Здесь должна быть логика сортировки по ордерам тудушек.
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
  deleteTodo,
  changeOrders,
  setCurrentTodo,
} = boardsSlice.actions;
export default boardsSlice.reducer;
