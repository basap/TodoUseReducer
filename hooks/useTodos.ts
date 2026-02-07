import { useReducer } from "react";
import { Todo } from "../types/Todo";

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; index: number }

const todosReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
      case "ADD_TODO":
        return [
            ...state,
            {
                id: Date.now().toString(),
                text: action.text,
                done: false
            },
        ];

      case "TOGGLE_TODO":
        return state.map((todo, index) =>
          index === action.index
            ? { ...todo, done: !todo.done }
            : todo
        );

      default:
        throw new Error();
    }
};

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todosReducer, []);

    const addTodo = (text: string) => {
      if (!text.trim()) return;
      dispatch({ type: "ADD_TODO", text });
    };

    const toggleTodo = (index: number) => {
      dispatch({ type: "TOGGLE_TODO", index });
    };

    return {
      todos,
      addTodo,
      toggleTodo
    };
};