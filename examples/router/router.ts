export default useRouter((state, cmd) =>
  column(
    [],
    [
      text`You are on: ${state.url}`,
      button([], { label: text`Go to /hello`, onPress: cmd.pushUrl('/hello') }),
    ],
  ),
);
