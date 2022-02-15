import { FC } from 'react';
import { Box } from '@mui/material';

type Props = Readonly<{
  height: number;
  width: number;
  position: 'center' | 'right' | 'left';
}>;

export const SemrushLogo: FC<Props> = props => (
  <Box
    sx={{
      minHeight: `${props.height}px`,
      height: `${props.height}px`,
      width: `${props.width}px`,
      backgroundImage: 'url(semrush-logo.png)',
      backgroundPosition: props.position,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    }}
  />
);

SemrushLogo.displayName = 'SemrushLogo';
