import { useEffect, useState } from 'react';

type Params<Resource> = Readonly<{
  loadResource: () => Promise<Resource | null>;
}>;

type Result<Resource> =
  Readonly<{
    isLoading: true;
  }> |
  Readonly<{
    isLoading: false;
    value: Resource | null;
  }>;

export const useAsyncResource = <Resource>({ loadResource }: Params<Resource>): Result<Resource> => {
  const [resource, setResource] = useState<Resource | null | 'still loading...'>('still loading...');

  useEffect(() => {
    loadResource()
      .then(setResource);
  }, [loadResource]);

  if (resource === 'still loading...') {
    return {
      isLoading: true,
    };
  }

  return {
    isLoading: false,
    value: resource,
  };
};
