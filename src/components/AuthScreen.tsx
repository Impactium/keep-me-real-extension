import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import { User } from '@/contexts/UserContext';
import { Button, Stack } from '@impactium/components';
import { Input } from '@/ui/input';

export const AuthScreen: React.FC = () => {
  const { login, loginAsGuest } = User.use();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        username,
        password
      }).then(() => {
        setLoading(false);
      })
    }, 500);
  };

  const validator = (value: string): [boolean, string] => {
    const trimmed = value.trim()

    return [trimmed.length > 3, trimmed];
  }

  const usernameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const [isValid, username] = validator(value) // Regex rule here

    setIsUsernameValid(isValid) 

    setUsername(username);
  }

  const passwordInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const [isValid, password] = validator(value); // Regex rule here

    setIsPasswordValid(isValid) 

    setPassword(password);
  }

  const isLoginDisabled = useMemo(() => username.length === 0 || password.length === 0 || !isPasswordValid || !isUsernameValid, [password, username]);

  return (
    <Stack dir='column'>
      <Stack ai='center' style={{  height: '30dvh' }}>
        <h1 style={{ fontSize: 32 }}>KeepMeReal</h1>
      </Stack>
      <Stack dir='column'>
        <Input img='User' valid={isUsernameValid} value={username} onChange={usernameInputHandler} placeholder='Username' />
        <Stack>
          <Input img='KeyRound' type={password} valid={isPasswordValid} value={password} onChange={passwordInputHandler} placeholder='Password' />
          <Button loading={loading} variant='glass' disabled={isLoginDisabled} onClick={handleLogin} img='LogIn'>Log In</Button>
        </Stack>
        <Button variant='ghost' onClick={loginAsGuest}>Continue as guest</Button>
      </Stack>
  </Stack>
);
};