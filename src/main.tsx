import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import AuthProvider from './components/AuthProvider.tsx';
import WrapperTheme from './components/WrapperTheme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <WrapperTheme>
          <App />
        </WrapperTheme>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
);
