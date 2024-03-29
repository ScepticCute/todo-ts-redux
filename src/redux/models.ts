export type TodoItem = {
  id: string;
  title: string;
  order: number;
  content: string;
  isChecked: boolean;
};

export type Board = {
  title: string;
  id: string;
  order: number;
  items: TodoItem[];
  settings?: [colorTheme: string];
};

export type State = {
  boards: Board[];
  settings?: any;
};
