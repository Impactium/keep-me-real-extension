import React from 'react';
import { User } from '@/contexts/UserContext';
import { AuthScreen } from '@/components/AuthScreen';
import { MainMenu } from '@/components/MainMenu';

const App: React.FC = () => {
  const { user } = User.use();
  return user ? <MainMenu /> : <AuthScreen />;
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