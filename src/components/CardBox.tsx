import { useGetUsersQuery } from '../api/api';
import { Box, ImageList, useMediaQuery, useTheme } from '@mui/material';
import type { User } from '../types/api';
import Card from './Card';

const CardBox = () => {
  const { data } = useGetUsersQuery();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      component="section"
      sx={{ px: isSm ? '16px' : '80px', pt: '48px', pb: '69px', display: 'flex', justifyContent: 'center' }}
    >
      {data && (
        <ImageList cols={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4} gap={20} sx={{ m: 0, overflow: 'visible' }}>
          {data.data.map((user: User) => (
            <Card key={user.id} user={user} />
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default CardBox;
