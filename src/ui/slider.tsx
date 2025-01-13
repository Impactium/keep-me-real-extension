
import React from 'react'
import { Root, Track, Thumb, Range } from '@radix-ui/react-slider'
import s from '@/styles/slider.module.css';
import { cn } from '@impactium/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(s.root, className)}
    {...props}
  >
    <Track className={s.track}>
      <Range className={s.range} />
    </Track>
    <Thumb className={s.thumb} />
  </Root>
))
Slider.displayName = Root.displayName

export { Slider }
