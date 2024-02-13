import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import paths from '../../router/paths.ts';
import useAuth from '../../hooks/useAuth.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignUpMutation } from '../../api/api.ts';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../helpers/helpers';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [regFailed, setRegFailed] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const [signUp] = useSignUpMutation();

  const schema = Yup.object().shape({
    username: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    email: Yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async ({ email, password }) => {
      formik.setSubmitting(true);

      try {
        const { token } = await signUp({ email, password }).unwrap();

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
      <Container sx={{ width: '500px' }}>
        <Paper
          elevation={6}
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
          <Typography variant="h5">Регистрация</Typography>
          <TextField
            fullWidth
            size="small"
            id="username"
            label="Имя"
            variant="filled"
            type="username"
            placeholder="Max"
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('username')}
            value={formik.values.username}
            error={!!formik.errors.username}
            helperText={formik.errors.username}
            autoFocus
            autoComplete="username"
            required
            disabled={formik.isSubmitting}
          />
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
            error={!!formik.errors.password}
            helperText={formik.errors.password}
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
          <TextField
            fullWidth
            size="small"
            id="confirmPassword"
            label="Подтвердите пароль"
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            placeholder="Подтвердите пароль"
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('confirmPassword')}
            value={formik.values.confirmPassword}
            error={!!formik.errors.confirmPassword || regFailed}
            helperText={regFailed === false ? formik.errors.confirmPassword : errorMessage}
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
          <Button
            type="submit"
            aria-label="Зарегистрироваться"
            variant="contained"
            color="violet"
            sx={{ color: '#FFFFFF' }}
          >
            Зарегистрироваться
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
