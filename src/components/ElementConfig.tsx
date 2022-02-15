import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';

export type ElementConfig = Readonly<{
  keywordsElementCodename: string;
}>;

type Props = Readonly<{
  children: ReactNode;
}>;

export const ElementConfigProvider: FC<Props> = props => {
  const [config, setConfig] = useState<null | ElementConfig>(null);

  useEffect(() => {
    CustomElement.init(e => {
      if (!isElementConfig(e.config)) {
        throw new Error('Provided invalid config. Please check the documentation.');
      }

      setConfig(e.config);
    });
  }, []);

  if (!config) {
    return null;
  }

  return (
    <ElementConfigContext.Provider value={config}>
      {props.children}
    </ElementConfigContext.Provider>
  );
};

ElementConfigProvider.displayName = 'ElementConfigProvider';

export const useConfig = () => useContext(ElementConfigContext);

const ElementConfigContext = React.createContext<ElementConfig>({ keywordsElementCodename: '' });

const isElementConfig = (v: unknown): v is ElementConfig =>
  typeof v === 'object' &&
  v !== null &&
  v.hasOwnProperty('keywordsElementCodename') &&
  typeof (v as any).keywordsElementCodename === 'string';
