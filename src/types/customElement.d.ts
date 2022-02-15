type ElementInfo = Readonly<{
  config: Readonly<Record<string, unknown>> | null;
  disabled: boolean;
  value: string;
}>

type MultipleChoiceElementValue = Readonly<{
  id: string;
  name: string;
  codename: string;
}>;

declare const CustomElement: {
  setHeight: (height: number) => void;
  init: (callback: (element: ElementInfo) => void) => void;
  onDisabledChanged: (callback: (isDisabled: boolean) => void) => void;
  setValue: (newValue: string | null) => void;
  getElementValue: (elementCodename: string, callback: (value: string | ReadonlyArray<MultipleChoiceElementValue>) => void) => void;
  observeElementChanges: (elementCodenames: ReadonlyArray<string>, callback: (changedCodenames: ReadonlyArray<string>) => void) => void;
};
