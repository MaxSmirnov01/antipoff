import { Box, Typography } from '@mui/material';

const CardHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#F8F8F8',
        maxWidth: '846px',
        height: '137px',
        m: '0 auto',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '64px' }}>
        Наша команда
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '20px' }}>
        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить
        выход из любых, даже самых сложных ситуаций.
      </Typography>
    </Box>
  );
};

export default CardHeader;
