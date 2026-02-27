import {
  createTheme,
  colorsTuple,
  type MantineColorsTuple,
  type DefaultMantineColor,
  TextInput,
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
  components: {
    // 1. Force font on all Text components globally
    Text: {
      styles: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
    // 2. Force font on TextInput and its placeholder
    TextInput: TextInput.extend({
      styles: {
        input: {
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          // Use CSS nesting to target the placeholder
          '&::placeholder': {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            letterSpacing: '0.2px',
            color: '#737373',
            opacity: 1, // Required because browsers fade placeholders
          },
        },
      },
    }),
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
