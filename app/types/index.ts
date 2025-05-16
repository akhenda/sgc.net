export type Primitives = number | string | boolean | bigint | symbol | null | undefined;

// biome-ignore lint/suspicious/noExplicitAny: intentional
export type AnyValue = any;
export type EmptyObject = Record<never, never>;
export type Props = Record<string, AnyValue>;

export type PropsWithClassName<T extends Props = EmptyObject> = T & {
  className?: string;
};
