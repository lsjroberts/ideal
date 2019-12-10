# Ideal - UI Framework

_Ideal_ is an experiment in creating a user interface framework that is pure, functional, compiles away and does not use a virtual dom. It aims to produce the minimal amount of code to perform the most efficient behaviour.

Using [immer](https://immerjs.github.io/immer) to handle immutable state, when a value in state changes _Ideal_ can directly target and update only the DOM nodes directly affected by that value. The logic that determines how to update nodes is baked into the app at compile time and the framework itself disappears.

Static components or a fully stateless app will compile into plain HTML & CSS, and default state can be provided for server-side rendering.

### Examples

- [Counter](examples/counter)
- [Events](examples/events)
- [Observables](examples/observables)
- [Components](examples/components)
- [Data Grid](examples/grid) with streaming data, filters, sorting, selection and actions

```js
// A complete counter app which outputs html, css and js
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
```

### Specs

```
node --version
> v13.2.0

node src/cli.js spec/string/index.js
```
