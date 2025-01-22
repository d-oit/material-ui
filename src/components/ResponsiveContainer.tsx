import { Container, useMediaQuery, Theme } from '@mui/material';

export const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return <Container maxWidth={isMobile ? 'sm' : 'lg'}>{children}</Container>;
};
