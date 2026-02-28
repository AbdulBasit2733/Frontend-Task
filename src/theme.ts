import {
  createTheme,
  colorsTuple,
  type MantineColorsTuple,
  type DefaultMantineColor,
} from '@mantine/core';

type ExtendedColors =
  | 'dark'
  | 'gray'
  | 'green'
  | 'red'
  | 'lightPink'
  | 'peach'
  | 'white'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedColors, MantineColorsTuple>;
  }
}

export const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif', 
  headings: {
    fontFamily: 'Montserrat, sans-serif',
  },
  breakpoints: {
    '2xl': '100em',
    '3xl': '120em',   
    '4xl': '160em',   
    '5xl': '240em',
  },
  colors: {
    dark:      colorsTuple('#252B42'), // navbar, headings, footer
    gray:      colorsTuple('#737373'), // body text, muted labels
    green:     colorsTuple('#96BA7B'), // primary CTA, icons, accents
    red:       colorsTuple('#A01A10'), // red underline accent, error
    lightPink: colorsTuple('#FDF3F1'), // hero bg, newsletter bg, section bg
    peach:     colorsTuple('#FEBC94'), // decorative blobs, highlights
    white:     colorsTuple('#FFFFFF'), // cards, navbar bg
  },
  primaryColor: 'green',
});
