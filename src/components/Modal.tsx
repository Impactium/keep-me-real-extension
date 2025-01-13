import { Button, Stack } from "@impactium/components";
import s from '@/styles/modal.module.css';
import { cn } from "@impactium/utils";
import React from "react";
import { Icon } from "@impactium/icons";

export namespace Modal {
  export interface Props extends Stack.Props {
    title: string;
    icon: Icon.Name
    open: boolean;
    setOpen: (open: boolean) => void;
  }
}

export function Modal({ icon, title, open, setOpen, className, children, ...props }: Modal.Props) {
  return (
    <Stack dir='column' className={cn(s.modal, open && s.open, className)} pos='absolute' {...props}>
      <Stack jc='space-between' className={s.header}>
        <Stack>
          <Icon name={icon} />
          <h5 className={s.name}>{title}</h5>
        </Stack>
        <Button img='X' variant='secondary' onClick={() => setOpen(false)} />
      </Stack>
      {children}
    </Stack>
  )
}