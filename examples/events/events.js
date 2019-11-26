export default withState(
  { count: 0, countInside: 0, x: 0, y: 0 },
  {
    increment: state => (state.count += 1),
    incrementInside: state => (state.countInside += 1),
    move: (state, evt) => {
      state.x = evt.clientX;
      state.y = evt.clientY;
    },
  },
  (state, cmd) =>
    withEventListener(
      'click',
      cmd.increment,
      withEventListener(
        'mousemove',
        cmd.update,
        columns(
          [centerX(), centerY(), spacing(10)],
          withEventListener('click', cmd.incrementInside, [
            el([], text`Clicked ${state.count} times`),
            el([], text`Clicked inside ${state.count} times`),
            el([], text`Mouse: ${state.x}, ${state.y}`),
          ]),
        ),
      ),
    ),
);
