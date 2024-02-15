import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Tooltip, Avatar, Card, CardActionArea, CardContent, CardActions } from '@mui/material';
import type { User } from '../../types/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import paths from '../../router/paths';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const CardCustom = ({ user }: { user: User }) => {
  const favorite = localStorage.getItem(`favoriteUser${user.id}`);
  const [isFavorite, setIsFavorite] = useState(!!favorite);

  const navigate = useNavigate();

  const data = useSelector((store: RootState) => store.userAvatar);
  const currentUser = data.find(({ id }) => user.id === id);

  const handleClick = () => {
    navigate(`${paths.usersPath()}/${user.id}`);
  };

  const addFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    if (!isFavorite) {
      localStorage.setItem(`favoriteUser${id}`, JSON.stringify(id));
    } else {
      localStorage.removeItem(`favoriteUser${id}`);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '10px',
        maxWidth: '305px',
        maxHeight: '263px',
        width: '100%',
      }}
      onClick={handleClick}
    >
      <CardActionArea component="div">
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', p: '36px 20px 20px 20px' }}
        >
          <Avatar
            src={currentUser && currentUser.userAvatar !== null ? currentUser.userAvatar : user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ width: '124px', height: '124px' }}
          />

          <Typography sx={{ fontSize: '20px' }}>
            {user.first_name} {user.last_name}
          </Typography>
          <CardActions sx={{ alignSelf: 'end', p: 0 }}>
            <Tooltip title="Лайк" arrow disableFocusListener disableTouchListener disableInteractive>
              <IconButton
                color="violet"
                aria-label="add to favorites"
                onClick={(event) => addFavorite(event, user.id)}
                sx={{ p: 0 }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardCustom;
