type StyledElementProps<T, E> = Omit<React.HTMLAttributes<E>, keyof T> & T;

type Styled<T = Record<string, unknown>, E = Element> = React.ComponentType<
  StyledElementProps<T, E>
>;
