import { State } from '../redux/models';

export const findBoardId = (state: State, todoId: string, returnTodoIdx?: boolean): number[] => {
  let boardIdx = 0;
  let todoIdx = 0;
  state.boards.forEach((board, i) =>
    board.items.forEach((todo, j) => {
      if (todo.id === todoId) {
        boardIdx = i;
        todoIdx = j;
      }
    }),
  );
  if (returnTodoIdx) {
    return [boardIdx, todoIdx];
  } else return [boardIdx];
};
