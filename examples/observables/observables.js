const { interval } = rxjs;

const tick = interval(1000);

export default withObservable(tick, value => el([], text`Tick: ${value}`));
