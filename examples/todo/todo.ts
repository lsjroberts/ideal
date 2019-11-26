import {
  Font,
  el,
  text,
  column,
  row,
  button,
  spacing,
  useState,
} from '../../src/ui';

export default useState(
  {
    todos: [
      {
        label: 'Finish building ideal ui',
        complete: false,
      },
      {
        label: 'Go to the gym',
        complete: false,
      },
    ],
  },
  {
    complete: (state, index) => {
      state.todos[index].complete = true;
    },
  },
  (state, cmd) =>
    column(
      [spacing(10)],
      state.todos.map((todo, index) =>
        row(
          [],
          [
            el(
              todo.complete ? [Font.strikethrough()] : [],
              text`${todo.label}`,
            ),
            button([], { label: text`✓`, onPress: cmd.complete(index) }),
          ],
        ),
      ),
    ),
);
