import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Container, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth.ts';
import paths from '../../router/paths.ts';
import { useLogInMutation } from '../../api/api.ts';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../helpers/helpers';

const schema = Yup.object().shape({
  email: Yup.string().email('Введите корректный email').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [regFailed, setRegFailed] = useState(false);

  const [logIn] = useLogInMutation();

  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      formik.setSubmitting(true);

      try {
        const { token } = await logIn({ email, password }).unwrap();

        localStorage.setItem('token', JSON.stringify(token));
        auth.logIn();

        navigate(paths.mainPath());
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          // оффициальный костыль из доки
          const err = 'error' in error ? error.error : JSON.stringify(error.data);
          const errMessage = err.slice(10, -2);
          setErrorMessage(errMessage);
          setRegFailed(true);
        } else if (isErrorWithMessage(error)) {
          console.log(error);
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '16px',
            borderRadius: '16px',
            gap: '16px',
          }}
        >
          <Typography variant="h5">Войти</Typography>
          <TextField
            fullWidth
            size="small"
            id="email"
            label="Email"
            variant="filled"
            type="email"
            placeholder="example@mail.ru"
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('email')}
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
            autoComplete="email"
            autoFocus
            required
            disabled={formik.isSubmitting}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            label="Пароль"
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('password')}
            value={formik.values.password}
            error={!!formik.errors.password || regFailed}
            helperText={regFailed === false ? formik.errors.password : errorMessage}
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={formik.isSubmitting}
          />
          <Button type="submit" aria-label="Войти" variant="contained" color="violet" sx={{ color: '#FFFFFF' }}>
            Войти
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <span>Нет аккаунта? </span>
            <Link to={paths.signupPath()}>Зарегистрироваться</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
