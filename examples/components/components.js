export default column(
  [spacing(10), width(600), padding(30)],
  [header(), counter(0), counter(100)],
);

const header = () =>
  row([], [el([], text`Header`), el([alignRight], text`Menu`)]);

const counter = initial =>
  withState(
    { count: initial },
    { increment: state => (state += 1) },
    (state, cmd) =>
      button([], {
        onPress: cmd.increment,
        label: text`Count: ${state.count}`,
      }),
  );
