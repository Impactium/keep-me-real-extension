import React, { ChangeEvent } from 'react';
import { User } from '@/contexts/UserContext';
import s from '@/styles/UserModal.module.css';
import { Button, Stack } from '@impactium/components';
import { Input } from '@/ui/input';
import { Modal } from './Modal';

export namespace UserModal {
  export interface Props extends Omit<Modal.Props, 'title'> {
  }
}

export function UserModal({ open, setOpen, ...props }: UserModal.Props) {
  const { user, setUser } = User.use();

  const handleUserChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setUser(u => ({
      ...u,
      username: value
    }));
  }
  
  return (
    <Modal open={open} setOpen={setOpen} title='Edit profile' dir='column' {...props}>
      <h2>Edit User</h2>
      <Stack>
        <Input value={user?.username} onChange={handleUserChangeInput} placeholder='New username' />
        <Stack ai='flex-end'>
          <Button img='Check' variant='glass'>Save</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};