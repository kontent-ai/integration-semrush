import { useEffect, useState } from 'react';

import { useConfig } from '../components/ElementConfig';

export const useKeywordsFromElement = (): ReadonlyArray<string> | null => {
  const [keywords, setKeywords] = useState<ReadonlyArray<string> | null>(null);
  const config = useConfig();

  const updateKeywords = (value: unknown) => {
    if (typeof value !== 'string') {
      return;
    }

    const processed = [...new Set(value.split(';').map(k => k.trim()))];
    setKeywords(processed);
  }

  useEffect(() => {
    CustomElement.getElementValue(config.keywordsElementCodename, updateKeywords);
  }, [config.keywordsElementCodename]);

  useEffect(() => {
    const updateValue = () => CustomElement.getElementValue(config.keywordsElementCodename, updateKeywords);
    CustomElement.observeElementChanges([config.keywordsElementCodename], updateValue);
  }, [config.keywordsElementCodename]);

  return keywords;
};
