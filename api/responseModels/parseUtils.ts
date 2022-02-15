export const not = <Guarded>(guard: (v: any) => v is Guarded) => <Input>(v: Input): v is Guarded extends Input ? Exclude<Input, Guarded> : never =>
  !guard(v);

type ParseError = Readonly<{ type: 'error', error: string }>;
export type ParseResult<T> = Readonly<{ type: 'success', result: T }> | ParseError;

export const isParseError = (res: ParseResult<unknown>): res is ParseError =>
  res.type === 'error';
