import { el, text, column, row, button, spacing, useState } from '../../src/ui';

export default useState(
  {
    todos: [
      {
        label: 'Finish building ideal ui',
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
            el([], text`${todo.label}`),
            button([], { label: text`✓`, onPress: cmd.complete(index) }),
          ],
        ),
      ),
    ),
);
