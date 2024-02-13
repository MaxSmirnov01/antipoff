import { useContext } from 'react';
import { AuthContext } from '../contexts/index.ts';

const useAuth = () => useContext(AuthContext);

export default useAuth;
