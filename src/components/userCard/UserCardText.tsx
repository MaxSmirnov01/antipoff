import { Box, IconButton, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const UserCardText = ({ email }: { email: string }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: isMd ? 'column-reverse' : 'row',
        maxWidth: '1064px',
        m: isLg ? '49px 0 0 0' : '49px auto 0 auto',
        gap: isMd ? '34px' : '131px',
        px: isSm ? '20px' : isLg ? '80px' : '0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '630px',
          gap: '30px',
        }}
      >
        <Typography sx={{ lineHeight: '21.79px' }}>
          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие
          аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше
          понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать
          продажи, используя самые современные аналитические инструменты.
        </Typography>
        <Typography sx={{ lineHeight: '21.79px' }}>
          В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не
          менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты
          помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания
          проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
        </Typography>
        <Typography sx={{ lineHeight: '21.79px' }}>
          Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую
          деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей
          инновационный подход к красоте, а также инвестором других бизнес-проектов.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Link href="#" underline="none" color="inherit" target="_blank" rel="noopener">
          <IconButton color="violet" sx={{ p: 0 }}>
            <LocalPhoneOutlinedIcon />
          </IconButton>
          <Typography component="span"> +7 (954) 333-44-55</Typography>
        </Link>
        <Link href="#" underline="none" color="inherit" target="_blank" rel="noopener">
          <IconButton color="violet" sx={{ p: 0 }}>
            <MailOutlineOutlinedIcon />
          </IconButton>
          <Typography component="span"> {email}</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default UserCardText;
