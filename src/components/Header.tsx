import { Box, Button, useMediaQuery, useTheme, IconButton, Grow } from '@mui/material';
import useAuth from '../hooks/useAuth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    auth.logOut();
    localStorage.removeItem('page');
  };

  return (
    <Box component="header" sx={{ display: 'flex', width: '100%', backgroundColor: '#512689', minHeight: '265px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: isSm ? '16px' : '80px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          maxWidth: '1440px',
        }}
      >
        {children}
        {isMd ? (
          <Grow in={isMd} style={{ transformOrigin: '0 0 0' }} {...(isMd ? { timeout: 800 } : {})}>
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
