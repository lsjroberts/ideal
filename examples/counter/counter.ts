import { el, text, column, button, spacing, withState } from '../../src/ui';

export default withState(
  { count: 123 },
  {
    increment: state => (state.count += 1),
    decrement: state => (state.count -= 1),
  },
  (state, cmd) =>
    column(
      [spacing(10)],
      [
        button([], { onPress: cmd.increment, label: text`+` }),
        button([], { onPress: cmd.decrement, label: text`-` }),
        el([], text`Count: ${state.count}`),
      ],
    ),
);
