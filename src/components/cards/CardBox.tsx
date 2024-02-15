import React, { useState } from 'react';
import { useGetUsersQuery } from '../../api/api';
import { Box, CircularProgress, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import type { User } from '../../types/api';
import Card from './Card';

const CardBox = () => {
  const page = localStorage.getItem('page');
  const currentPage = page ? +page : 1;
  const [pageNumber, setPageNumber] = useState(currentPage);

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
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    localStorage.setItem('page', JSON.stringify(value));
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
          px: isMd ? '20px' : '80px',
          pt: '48px',
          pb: '69px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '56px',
          m: '0 auto',
          maxWidth: '1440px',
        }}
      >
        {isError && <Box>Ошибка при получении данных...</Box>}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {users && users.map((user: User) => <Card key={user.id} user={user} />)}
        </Box>
        <Stack sx={{ alignItems: 'center' }}>
          <Pagination count={totalPages} page={pageNumber} shape="rounded" onChange={handlePagination} />
        </Stack>
      </Box>
    </>
  );
};

export default CardBox;
