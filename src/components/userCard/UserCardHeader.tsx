import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Grow, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { User } from '../../types/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../store/userSlice';
import { AppDispatch, RootState } from '../../store/store';

const UserCardHeader = ({ user }: { user: User }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const data = useSelector((store: RootState) => store.userAvatar);
  const currentUser = data.find(({ id }) => user.id === id);

  const { avatar, first_name, last_name } = user;

  const handleClick = () => {
    navigate(-1);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files !== null) {
      const file = event.currentTarget.files[0];
      const fileUrl = file ? URL.createObjectURL(file) : null;

      if (fileUrl) {
        dispatch(setAvatar({ id: user.id, userAvatar: fileUrl }));
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMd ? 'column-reverse' : 'row',
        gap: isMd ? '16px' : '32px',
        alignItems: 'center',
        m: isMd ? '0 auto' : 0,
        textAlign: isMd ? 'center' : 'none',
        py: isMd ? '64px' : 0,
      }}
    >
      {isMd ? (
        <Grow in={isMd} style={{ transformOrigin: '0 0 0' }} {...(isMd ? { timeout: 800 } : {})}>
          <IconButton
            onClick={handleClick}
            sx={{
              color: '#F8F8F8',
              position: 'absolute',
              top: '20px',
              left: '20px',
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grow>
      ) : (
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            color: '#F8F8F8',
            borderRadius: '8px',
            borderColor: '#F8F8F8',
            alignSelf: 'start',
            mt: '-7px',
          }}
        >
          Назад
        </Button>
      )}
      <Avatar
        alt={`${first_name} ${last_name}`}
        src={currentUser && currentUser.userAvatar !== null ? currentUser.userAvatar : avatar}
        sx={{ width: '187px', height: '187px' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', color: '#F8F8F8', gap: '16px' }}>
        <Typography variant="h1" sx={{ fontSize: '64px' }}>
          {first_name} {last_name}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '32px' }}>
          Партнер
        </Typography>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ color: '#F8F8F8', borderRadius: '8px', borderColor: '#F8F8F8' }}
        >
          Загрузить фото
          <TextField
            type="file"
            onChange={handleFileChange}
            sx={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: 1,
              overflow: 'hidden',
              position: 'absolute',
              bottom: 0,
              left: 0,
              whiteSpace: 'nowrap',
              width: 1,
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default UserCardHeader;
