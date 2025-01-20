import React, { ChangeEvent, useState } from 'react';
import s from '@/styles/SettingsModal.module.css';
import { Input, Stack } from '@impactium/components';
import { Modal } from './Modal';
import { ColorPicker } from '@/ui/color';

export namespace SettingsModal {
  export interface Props extends Omit<Modal.Props, 'title'> {
  }
}

export const SettingsModal = ({ open, setOpen, ...props }: SettingsModal.Props) => {
  const [greenShade, setGreenShade] = useState(50);
  const [redShade, setRedShade] = useState(50);

  const greenSliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const parserValue = parseInt(value);

    const limitedValue = Math.min(Math.max(0, parserValue), 100);

    setGreenShade(limitedValue);
  }

  const redSliderChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const parserValue = parseInt(value);

    const limitedValue = Math.min(Math.max(0, parserValue), 100);

    setRedShade(limitedValue);
  }

  return (
    <Modal dir='column' pos='absolute' title='Settings' open={open} setOpen={setOpen} {...props}>
      <Stack>
        <p></p>
        <Input variant='default' />
      </Stack>
      <ColorPicker />
      <ColorPicker />
    </Modal>
  );
};
