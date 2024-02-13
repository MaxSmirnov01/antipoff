import { useState } from 'react';
import { Paper, ImageListItem, Box, ImageListItemBar, Typography, IconButton, Tooltip } from '@mui/material';
import type { User } from '../types/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ user }: { user: User }) => {
  const favorite = localStorage.getItem(`favoriteUser${user.id}`);
  const [isFavorite, setIsFavorite] = useState(!!favorite);

  const addFavorite = (id: number) => {
    if (!isFavorite) {
      localStorage.setItem(`favoriteUser${id}`, JSON.stringify(id));
    } else {
      localStorage.removeItem(`favoriteUser${id}`);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Paper elevation={1} sx={{ borderRadius: '10px', width: '305px', height: '263px', p: '36px 20px 20px 20px' }}>
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
            <IconButton color="violet" aria-label="add to favorites" onClick={() => addFavorite(user.id)}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </ImageListItem>
    </Paper>
  );
};

export default Card;
