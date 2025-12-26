interface TodoItem {
  id: string;
  title: string;
  weight: string;
}
interface State {
  id: number;
  spinTime: number;
  wheelColors: string[];
  todos: TodoItem[];
}
export const appState = (() => {
  const state: State = {
    id: 0,
    spinTime: 5000,
    wheelColors: [],
    todos: [{ id: "#1", title: "", weight: "" }],
  };

  return {
    setState: <K extends keyof State>(key: K, value: State[K]): void => {
      state[key] = value;
    },

    setAllState: (newState: Partial<State>): void => {
      Object.entries(newState).forEach(([key, value]) => {
        if (key in state) {
          (state as any)[key] = value;
        }
      });
    },

    getState: <K extends keyof State>(key: K): State[K] => state[key],

    getAllState: (): State => ({ ...state }),

    addTodo: (todo: TodoItem): void => {
      state.todos.push(todo);
    },

    removeTodo: (id: string): void => {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    updateTodo: (id: string, newData: Partial<TodoItem>): void => {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        Object.assign(todo, newData);
      }
    },
  };
})();
