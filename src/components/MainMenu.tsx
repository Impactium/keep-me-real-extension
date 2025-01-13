import React, { useState } from 'react';
import { User } from '@/contexts/UserContext';
import { UserModal } from '@/components/UserModal';
import { SettingsModal } from '@/components/SettingsModal';
import s from '@/styles/MainMenu.module.css';
import { Button, Stack } from '@impactium/components';

export const MainMenu: React.FC = () => {
  const { user } = User.use();
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  const handleHighlightImages = () => {
    chrome.runtime.sendMessage({ action: 'highlightImages' }, (response) => {
      console.log(response.status);
    });
  };

  return (
    <Stack dir='column' className={s.root} pos='relative'>
      <h1>Welcome, {user?.username || 'Guest'}</h1>
      <Button img='User' onClick={() => setIsUserModalOpen(true)}>Edit profile</Button>
      <Button img='Settings'onClick={() => setIsSettingsModalOpen(true)}>Settings</Button>
      <Button onClick={handleHighlightImages}>Refresh Highlights</Button>
      {/* MODALS */}
      <UserModal open={isUserModalOpen} setOpen={setIsUserModalOpen} icon='User' />
      <SettingsModal open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen} icon='Settings' />
    </Stack>
  );
};