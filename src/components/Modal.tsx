import {
  Box,
  CircularProgress,
  IconButton,
  Modal as MuiModal,
  Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { FC, ReactNode } from 'react';

type Props = Readonly<{
  leadingElement: ReactNode;
  onClose: () => void;
  children: ReactNode;
  isLoading: boolean;
}>;

export const Modal: FC<Props> = props => (
  <MuiModal open>
    <Box sx={style}>
      <Stack sx={{ height: '100%' }}>
        <Header
          leadingElement={props.leadingElement}
          onClose={props.onClose}
        />
        <Box
          p={1}
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          {props.isLoading
            ? (
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            )
            : props.children}
        </Box>
      </Stack>
    </Box>
  </MuiModal>
);

type HeaderProps = Readonly<{
  onClose: () => void;
  leadingElement: ReactNode;
}>;

const Header: FC<HeaderProps> = props => (
  <Stack
    direction="row-reverse"
    justifyContent="space-between"
  >
    <IconButton
      onClick={props.onClose}
      aria-label="close"
      size="large"
      // width="10px"
      // height="10px"
      component="button"
    >
      <Close />
    </IconButton>

    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {props.leadingElement}
    </Stack>
  </Stack>
);

const style = {
  position: 'absolute',
  top: '16px',
  bottom: '16px',
  left: '16px',
  right: '16px',
  boxShadow: 24,
  borderRadius: '16px',
  backgroundColor: 'white',
  p: 2,
};
