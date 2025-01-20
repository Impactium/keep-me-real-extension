import React from 'react';
import { User } from '@/contexts/UserContext';
import { AuthScreen } from '@/components/AuthScreen';
import { MainMenu } from '@/components/MainMenu';

const App: React.FC = () => {
  const { user, isUserLoggedIsAsGuest } = User.use();
  
  if (user || isUserLoggedIsAsGuest) {
    return <MainMenu />
  }

  return <AuthScreen />;
};

export default function RootApp() {
  return (
    <User.Provider>
      <main>
        <App />
      </main>
    </User.Provider>
  );
}