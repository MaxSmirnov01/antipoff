import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, ImageListItem, Box, ImageListItemBar, Typography, IconButton, Tooltip } from '@mui/material';
import type { User } from '../types/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import paths from '../router/paths';

const Card = ({ user }: { user: User }) => {
  const favorite = localStorage.getItem(`favoriteUser${user.id}`);
  const [isFavorite, setIsFavorite] = useState(!!favorite);
  const navigate = useNavigate();

  const addFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    if (!isFavorite) {
      localStorage.setItem(`favoriteUser${id}`, JSON.stringify(id));
    } else {
      localStorage.removeItem(`favoriteUser${id}`);
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`${paths.usersPath()}/${user.id}`);
  };

  return (
    <Paper
      elevation={1}
      sx={{ borderRadius: '10px', width: '305px', height: '263px', p: '36px 20px 20px 20px' }}
      onClick={handleClick}
    >
      <ImageListItem sx={{ alignItems: 'center' }}>
        <Box>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            height="124px"
            width="124px"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </Box>
        <ImageListItemBar
          title={
            <Typography sx={{ fontSize: '20px' }}>
              {user.first_name} {user.last_name}
            </Typography>
          }
          position="below"
        />
        <Box sx={{ alignSelf: 'end' }}>
          <Tooltip title="Лайк" arrow disableFocusListener disableTouchListener disableInteractive>
            <IconButton color="violet" aria-label="add to favorites" onClick={(event) => addFavorite(event, user.id)}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </ImageListItem>
    </Paper>
  );
};

export default Card;
