import { useToast } from '@chakra-ui/react';
import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react'; 
import { api } from '../services/api';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

type User = {
  email: string;
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'fa.to');

  Router.push('/');
  
  authChannel.postMessage('signOut');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  const toast = useToast();

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data){
        case 'signOut':
          Router.push('/');
          break;
        case 'signIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const { 'fa.to': token  } = parseCookies();

    // if (token) {
    //   api.get('/dashboard')
    //     .then(response => {
    //       const { email, roles } = response.data;

    //       setUser({ email, roles });
    //     })
    //     .catch(() => {
    //       signOut();
    //     })
    // }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, roles } = response.data;

      setCookie(undefined, 'fa.to', token, {
        maxAge: 60 * 60 * 24 * 7, // 30 days
        path: '/',
      })

      setUser({
        email,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

      authChannel.postMessage('signIn');
    } catch (error) {
      toast({
        title: 'Erro na autenticação',
        description: 'Houve um erro ao fazer login, verifique suas credenciais',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut,isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}