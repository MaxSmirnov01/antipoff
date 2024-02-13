import { Box, Typography, Button, useMediaQuery, useTheme, IconButton, Grow } from '@mui/material';
import useAuth from '../hooks/useAuth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const auth = useAuth();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    auth.logOut();
  };

  return (
    <Box component="header">
      <Box
        sx={{
          height: '265px',
          backgroundColor: '#512689',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: isSm ? '16px' : '80px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            flexDirection: 'column',
            textAlign: 'center',
            color: '#F8F8F8',
            maxWidth: '846px',
            height: '137px',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '64px' }}>
            Наша команда
          </Typography>
          <Typography variant="h2" sx={{ fontSize: '20px' }}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие
            находить выход из любых, даже самых сложных ситуаций.
          </Typography>
        </Box>
        {isSm ? (
          <Grow in={isSm} style={{ transformOrigin: '0 0 0' }} {...(isSm ? { timeout: 800 } : {})}>
            <IconButton
              onClick={handleClick}
              sx={{
                color: '#F8F8F8',
                position: 'absolute',
                top: '20px',
                right: '20px',
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Grow>
        ) : (
          <Button
            onClick={handleClick}
            variant="outlined"
            sx={{
              color: '#F8F8F8',
              position: 'absolute',
              top: '32px',
              right: '80px',
              borderRadius: '8px',
              borderColor: '#F8F8F8',
            }}
          >
            Выход
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
