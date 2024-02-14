import React, { useState } from 'react';
import { useGetUsersQuery } from '../api/api';
import { Box, CircularProgress, ImageList, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import type { User } from '../types/api';
import Card from './Card';

const CardBox = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { users, totalPages, isLoading, isFetching, isError } = useGetUsersQuery(pageNumber, {
    selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
      users: data?.data,
      totalPages: data?.total_pages,
      isLoading: isLoading,
      isFetching: isFetching,
      isError: isError,
    }),
  });

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  return (
    <>
      {(isLoading || isFetching) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}
      <Box
        component="section"
        sx={{
          px: isSm ? '16px' : '80px',
          pt: '48px',
          pb: '69px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '56px',
        }}
      >
        {isError && <Box>Ошибка при получении данных...</Box>}
        {users && (
          <ImageList cols={isSm ? 1 : isMd ? 2 : isLg ? 3 : 4} gap={20} sx={{ m: 0, overflow: 'visible' }}>
            {users.map((user: User) => (
              <Card key={user.id} user={user} />
            ))}
          </ImageList>
        )}
        <Stack sx={{ alignItems: 'center' }}>
          <Pagination count={totalPages} page={pageNumber} shape="rounded" onChange={handlePagination} />
        </Stack>
      </Box>
    </>
  );
};

export default CardBox;
