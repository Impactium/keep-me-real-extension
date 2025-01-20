import { createContext, HTMLAttributes, useContext, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button, Input } from '@impactium/components';
import { cn } from '@impactium/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import s from './styles/Color.module.css';
import { Icon } from '@impactium/icons';
import React from 'react';

export namespace Color {
  export enum BASIC {
    aliceblue = '#f0f8ff',
    antiquewhite = '#faebd7',
    aqua = '#00ffff',
    aquamarine = '#7fffd4',
    azure = '#f0ffff',
    darkviolet = '#9400d3',
    deeppink = '#ff1493',
    deepskyblue = '#00bfff',
    dimgray = '#696969',
    dodgerblue = '#1e90ff',
    firebrick = '#b22222',
    floralwhite = '#fffaf0',
    forestgreen = '#228b22',
    fuchsia = '#ff00ff',
    gainsboro = '#dcdcdc',
    ghostwhite = '#f8f8ff',
    gold = '#ffd700',
    goldenrod = '#daa520',
    gray = '#808080',
    green = '#008000',
    greenyellow = '#adff2f',
    honeydew = '#f0fff0',
    hotpink = '#ff69b4',
    indianred = '#cd5c5c',
    indigo = '#4b0082',
    ivory = '#fffff0',
    khaki = '#f0e68c',
    lavender = '#e6e6fa',
    lavenderblush = '#fff0f5',
    lawngreen = '#7cfc00',
    lemonchiffon = '#fffacd',
    lightblue = '#add8e6',
    lightcoral = '#f08080',
    lightcyan = '#e0ffff',
    lightgoldenrodyellow = '#fafad2',
    lightgrey = '#d3d3d3',
    lightgreen = '#90ee90',
    lightpink = '#ffb6c1',
    oldlace = '#fdf5e6',
    olive = '#808000',
    olivedrab = '#6b8e23',
    orange = '#ffa500',
    orangered = '#ff4500',
    orchid = '#da70d6',
    palegoldenrod = '#eee8aa',
    palegreen = '#98fb98',
    paleturquoise = '#afeeee',
    palevioletred = '#d87093',
    papayawhip = '#ffefd5',
    peachpuff = '#ffdab9',
    saddlebrown = '#8b4513',
    salmon = '#fa8072',
    sandybrown = '#f4a460',
    seagreen = '#2e8b57',
    seashell = '#fff5ee',
    sienna = '#a0522d',
    silver = '#c0c0c0',
    skyblue = '#87ceeb',
    slateblue = '#6a5acd',
    slategray = '#708090',
    snow = '#fffafa',
    springgreen = '#00ff7f',
    steelblue = '#4682b4',
    tan = '#d2b48c',
    teal = '#008080',
    thistle = '#d8bfd8',
    tomato = '#ff6347',
    turquoise = '#40e0d0',
    violet = '#ee82ee',
    wheat = '#f5deb3',
    white = '#ffffff',
    whitesmoke = '#f5f5f5',
    yellow = '#ffff00',
    yellowgreen = '#9acd32'
  };
}

interface ColorProps extends HTMLAttributes<HTMLDivElement> {
  images?: string[],
  gradients?: Record<string, string[]>,
  solids?: string[],
  color?: string,
  setColor?: React.Dispatch<React.SetStateAction<string>>,
}

interface ColorPickerContext {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorContext = createContext<ColorPickerContext | undefined>(undefined) || (() => { throw new Error('ColorPickerTrigger and ColorPickerPopover must be inside <ColorPicker> element.') })();

export const useColor = (): ColorPickerContext => useContext(ColorContext)!;

type ColorPickerProps = Button.Props | (Button.Props & ColorPickerContext) & {
  default?: string;
};

export function ColorPicker(props: ColorPickerProps) {
  const [ _color, _setColor ] = useState<string>('#ffa647');
  const context: ColorPickerContext = {
    // @ts-ignore
    color: 'color' in props ? props.color : _color,
    setColor: 'setColor' in props ? props.setColor : _setColor
  };

  return (
    <ColorContext.Provider value={context}>
      <Popover>
        {props.children}
      </Popover>
    </ColorContext.Provider>
  );
};

interface ColorPickerTriggerProps extends HTMLAttributes<HTMLButtonElement> {

}

export function ColorPickerTrigger({ className, ...props }: ColorPickerTriggerProps) {
  const { color } = useColor();
  return (
    <PopoverTrigger asChild>
      <Button
        variant='outline'
        className={cn(s.button, !color && s.muted, className)}
        {...props}>
          {color ? (
            <div
              className={s.preview}
              style={{ background: color }}
            />
          ) : (
            <Icon name='Paintbrush' className={s.icon} />
          )}
          {color ?? 'Pick a color'}
      </Button>
    </PopoverTrigger>
  );
}

export type Tab = 'solid' | 'gradient'

export function ColorPickerPopover({ color: _color, setColor: _setColor, gradients = {}, solids = Object.values(Color.BASIC)}: ColorProps) {
  const { color: λcolor, setColor: λsetColor } = useColor() || {};

  const color = _color ?? λcolor;
  const setColor = _setColor ?? λsetColor;

  const [tab, setTab] = useState<Tab>(Object.keys(gradients).length ? 'gradient' : 'solid');

  return (
    <PopoverContent className={s.popover}>
      <Tabs onValueChange={v => setTab(v as Tab)} defaultValue={tab} value={tab} className={s.tabs}>
        <TabsList className={s.list}>
          <TabsTrigger className={s.trigger} value='solid'>
            Solid
          </TabsTrigger>
          <TabsTrigger className={s.trigger} value='gradient'>Gradient</TabsTrigger>
        </TabsList>
        <TabsContent value='solid' className={s.content}>
          {solids.map((solid) => (
            <div
              key={solid}
              style={{ background: solid }}
              className={s.color}
              onClick={() => setColor(solid)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </PopoverContent>
  );
}
